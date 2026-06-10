# Set up Skyvern locally and run a first AI browser automation task

You are an AI coding assistant. The user wants to automate browser workflows (form filling, data extraction, portal logins, invoice downloads) without writing CSS selectors or XPath. You will set up Skyvern, an open-source AI browser agent that uses vision LLMs to read the rendered page and decide actions, then run a first task and optionally wire it into existing Playwright code.

---

## What you're building

A local browser-agent loop:

```
[ plain English task ]
        |
        v
[ Skyvern agent ]  see (screenshot + DOM) -> plan (vision LLM) -> act (click/type/scroll) -> validate
        |               ^                                                        |
        |               +--------------- repeat until goal met ------------------+
        v
[ structured output ]  JSON / CSV / downloaded files
```

No selectors anywhere. The agent re-reads the page every step, so UI redesigns do not break the workflow.

## Prerequisites

- Python 3.11+
- An LLM API key (OpenAI, Anthropic, or Gemini) OR a local Ollama install for a fully offline setup
- Docker, only if the user prefers the self-hosted container route (Option B)

## Option A: pip quickstart (fastest)

1. Install and run the wizard:

```bash
pip install "skyvern[all]"
skyvern quickstart
```

2. The wizard asks for the LLM provider and key, then initializes the local services. If the user wants Postgres instead of the default, use `skyvern quickstart --postgres`.

3. Verify with `skyvern status`. Useful commands: `skyvern run all` (UI + server), `skyvern run server`, `skyvern run ui`, `skyvern stop all`. The UI is at http://localhost:8080.

## Option B: Docker Compose (self-hosted stack)

```bash
git clone https://github.com/skyvern-ai/skyvern.git && cd skyvern
cp .env.example .env
# edit .env: set the LLM provider key (or point it at Ollama)
docker compose up -d
```

Open http://localhost:8080 for the UI and visual workflow builder.

## Run the first task

```python
from skyvern import Skyvern

skyvern = Skyvern.local()  # or Skyvern(api_key="...") for cloud

task = await skyvern.run_task(
    prompt="Find the top post on Hacker News right now"
)
print(task.output)
```

For structured output, pass a schema:

```python
task = await skyvern.run_task(
    prompt="Find the top post on Hacker News",
    data_extraction_schema={
        "type": "object",
        "properties": {
            "title": {"type": "string"},
            "url": {"type": "string"},
            "points": {"type": "integer"},
        },
    },
)
```

## Integrate with existing Playwright code

Skyvern extends the Playwright `page` object with AI-capable methods. The recommended migration pattern is selector-first with AI fallback, so existing tests stay fast and the AI only fires when a selector breaks:

```python
browser = await skyvern.launch_cloud_browser()  # or local browser
page = await browser.get_working_page()

# selector first, AI fallback when the selector dies
await page.click("#submit-btn", prompt="Click the green Submit button")

# pure AI actions
await page.fill(prompt="Email field", value="rupali@vevaar.com")
await page.select_option(prompt="Country dropdown", value="US")

# structured extraction from the current page
result = await page.extract("Get every product name and price on this page")

# boolean assertions for E2E tests
is_logged_in = await page.validate("Check if the user is logged in")

# multi-step subtask in one instruction
await page.agent.run_task(
    "Fill the contact form as Rupali, rupali@vevaar.com, "
    "message: saw your work, would love to collaborate"
)
```

## Connect a local Chrome (optional)

To drive the user's real browser instead of a managed one, enable remote debugging in Chrome, then:

```python
skyvern = Skyvern(
    base_url="http://localhost:8000",
    api_key="YOUR_API_KEY",
    browser_address="http://127.0.0.1:9222",
)
```

## Notes and guardrails

- First runs cost LLM tokens per step (vision model reads screenshots). Successful workflows are cached into deterministic replays, so repeat runs are fast and cheap until the page changes materially.
- Credentials belong in Skyvern's credential vault or a password manager integration (Bitwarden, 1Password), never hardcoded. 2FA/TOTP flows are supported natively.
- Skyvern is AGPL-3.0. Internal automation is fine; embedding it in a distributed commercial product needs a license review.
- Respect the target site's terms of service. Capabilities like CAPTCHA solving and proxies are for automating portals the user is authorized to use (their vendors, their accounts, their workflows).
- Cloud alternative: app.skyvern.com has a free tier (5,000 credits/month, no card) if the user prefers zero local setup.

## Done when

- `skyvern status` reports services running (or `docker compose ps` shows the stack healthy)
- The Hacker News task returns a real title and URL
- The user can describe a task against one of their own portals in plain English and watch the run in the UI at http://localhost:8080, with the step-by-step action trail visible
