# Set up a self-hosted SigNoz dashboard for Claude Code (local, free, no key)

You are an AI coding assistant. The user wants to monitor their own Claude Code usage (tokens, cost, model split, tool calls, 5-hour quota) on a private dashboard that runs entirely on their machine. No SigNoz Cloud account. No ingestion key. No data leaving the laptop.

---

## What you're building

A local OpenTelemetry pipeline:

```
[ Claude Code CLI ]
       │
       │  OTLP gRPC, every 5 to 10s
       │  endpoint: http://localhost:4317
       ▼
[ SigNoz stack in Docker ]   (OTel collector + ClickHouse + UI)
       │
       │  http://localhost:8080
       ▼
[ Browser dashboard ]
```

Claude Code already exports OpenTelemetry metrics and logs when `CLAUDE_CODE_ENABLE_TELEMETRY=1`. SigNoz running in Docker accepts those OTLP signals on port 4317 (gRPC) or 4318 (HTTP), stores them in ClickHouse, and renders them in the UI on port 8080. The official SigNoz docs ship a pre-made Claude Code dashboard template you can import in one click.

---

## Steps the user must do manually (cannot be automated)

Tell the user to do these, in order, before you touch anything in their codebase:

1. **Install Docker Desktop** (or equivalent) and allocate **at least 4 GB of memory** to it. SigNoz will not run reliably below that.

2. **Clone and start SigNoz**:
   ```bash
   git clone https://github.com/SigNoz/signoz.git
   cd signoz/deploy/docker
   docker compose up -d
   ```
   First boot pulls a few GB of images and takes 1 to 3 minutes. Confirm with `docker compose ps` that all services are `Up`.

3. **Open `http://localhost:8080`** in a browser. Create the first admin user. No email verification.

4. **Import the Claude Code dashboard template** from `https://signoz.io/docs/dashboards/dashboard-templates/claude-code-dashboard/`. In SigNoz: **Dashboards → New Dashboard → Import JSON**. Paste the JSON the user copied from that page. Save.

When all four are done, the user comes back to you.

---

## Steps you (the agent) must do

### 1. Edit `~/.claude/settings.json`

Open the user's Claude Code settings file. Path is `~/.claude/settings.json` on macOS and Linux, `%USERPROFILE%\.claude\settings.json` on Windows. If the file does not exist, create it. If it exists, merge into the existing `env` object (do not clobber other keys).

The exact block to add:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://localhost:4317",
    "OTEL_METRIC_EXPORT_INTERVAL": "10000",
    "OTEL_LOGS_EXPORT_INTERVAL": "5000"
  }
}
```

### 2. Have the user restart Claude Code

Telemetry env vars are read at process start. The currently running session will not pick them up. Tell the user to fully quit and reopen Claude Code (or, if used via terminal CLI, start a fresh session).

### 3. Verify telemetry is flowing

After a fresh prompt or two:

- In SigNoz, go to **Logs → Live Tail**. Logs named `claude_code.user_prompt`, `claude_code.api_request`, `claude_code.tool_decision`, `claude_code.tool_result` should appear within seconds.
- In **Metrics → Explorer**, search for metric names starting with `claude_code.`. Token counts, session counts, command duration histograms should be present.
- The imported dashboard should start populating panels within one export interval (≤10s for metrics, ≤5s for logs).

If nothing shows up after 30 seconds, jump to "Troubleshooting" below.

---

## Critical constraints (do not violate)

1. **Endpoint is `http://localhost:4317`, with the scheme.** Some OTel SDKs accept a bare host:port; Claude Code wants the full URL.

2. **`OTEL_EXPORTER_OTLP_PROTOCOL` must match the port.** `grpc` ↔ `4317`. `http/protobuf` ↔ `4318`. Mismatch silently drops data.

3. **Do not add `OTEL_EXPORTER_OTLP_HEADERS` with an ingestion key.** That is the SigNoz Cloud setup. With local SigNoz, the collector accepts unauthenticated OTLP traffic on the loopback interface by design. A bogus key will not break things, but it confuses future-you when you read the file back.

4. **Do not bind port 4317 to the public internet.** It accepts unauthenticated OTLP writes. On `localhost` that is fine. Exposing it on `0.0.0.0` lets anyone on your network spam your dashboard with garbage.

5. **`CLAUDE_CODE_ENABLE_TELEMETRY` value is the string `"1"`, not the number `1`.** Both work, but the docs use the string form. Match the docs.

6. **Settings file is JSON.** No comments, no trailing commas. If the user already has other keys in `~/.claude/settings.json`, merge into the existing `env` object; do not overwrite the whole file.

---

## Optional enhancements (offer, do not auto-add)

Once basic telemetry is flowing, ask the user if they want any of:

1. **Quota alert.** In SigNoz: **Alerts → New Alert**. Create one on the quota metric, trigger when usage > 85% over a 5-hour window. Output to email, Slack webhook, or PagerDuty.

2. **Slack/Discord notification.** Same alert mechanism, point the channel at an incoming webhook.

3. **Disk retention policy.** ClickHouse will store everything forever by default. Set a TTL on the metrics/logs tables if disk usage becomes an issue (`docker exec -it signoz-clickhouse clickhouse-client` then `ALTER TABLE ... MODIFY TTL ...`).

4. **HTTPS access from another device on the LAN.** Put a reverse proxy (Caddy, nginx, Traefik) in front of port 8080. Do *not* expose port 4317 the same way; lock that to loopback or LAN-only.

5. **Pipe other tools to the same collector.** Any OpenTelemetry-aware tool (Node, Python, browser SDK, Vercel CLI) can write to `localhost:4317`. The collector multiplexes.

---

## Troubleshooting

**No data appearing after restart:**

1. `docker compose ps`: confirm all SigNoz services are `Up` (not just running, but healthy).
2. `docker compose logs otel-collector | tail -50`: look for "received export" or refusal messages.
3. From the host: `nc -zv localhost 4317` should connect. If not, the port isn't bound; check for a different docker compose project.
4. Confirm the env vars are actually in the running process. Inside a Claude Code session, the values of `CLAUDE_CODE_ENABLE_TELEMETRY` and `OTEL_EXPORTER_OTLP_ENDPOINT` should match what you wrote. If a shell rc file sets them differently, the rc wins.
5. Some users have `OTEL_EXPORTER_OTLP_ENDPOINT` already set from another project (often pointing at a cloud SaaS). Override it explicitly in `settings.json` rather than relying on environment.

**Data arrives but the imported dashboard is empty:**

- Confirm the dashboard template's data source matches the SigNoz default. If you have only one SigNoz instance, this is automatic. If you have multiple, edit each panel's data source.
- Metric names occasionally change between Claude Code releases. Cross-check the dashboard's metric references against what's actually appearing in **Metrics → Explorer** under the `claude_code.*` namespace.

**ClickHouse eats too much disk:**

- Default retention is unbounded. Set a TTL or run `docker compose down -v` periodically (this wipes everything, including your dashboard config, so export it first).

---

## Verification checklist

Confirm with the user before declaring done:

- [ ] SigNoz Docker stack is running (`docker compose ps` shows all services Up).
- [ ] `http://localhost:8080` loads the SigNoz UI and admin login works.
- [ ] `~/.claude/settings.json` has the seven OTel env keys merged into the `env` block.
- [ ] Claude Code has been restarted since the edit.
- [ ] At least one `claude_code.*` log is visible in Live Tail after sending a prompt.
- [ ] The imported Claude Code dashboard shows non-zero numbers in at least the token and session panels.

---

## Why this approach

For context (do not put this in code, but use it if the user asks why local SigNoz instead of cloud):

- **Privacy.** Token-level telemetry from coding sessions can leak repo names, file paths, prompt snippets. Local means none of that leaves the laptop.
- **Cost.** Free forever, capped only by disk.
- **No vendor lock-in on a free tier.** Cloud free tiers have ingestion caps; heavy Claude Code use can blow past them in a week.
- **Side-effect.** You now have a local OpenTelemetry collector. Anything else OTel-aware can write to it for free.

The tradeoff is no team sharing, no mobile access, and the upkeep of a Docker container. For one person watching their own usage, this is the right side of that tradeoff.
