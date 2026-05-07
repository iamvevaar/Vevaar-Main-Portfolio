# Wire a contact form to a Google Sheet (no third-party SaaS, no monthly cap)

You are an AI coding assistant. The user wants their website's contact form to write submissions directly into a Google Sheet. There is no backend server, no SaaS dependency, no API key, and no submission cap. Implement this end-to-end in the user's existing project.

---

## What you're building

A contact form whose submissions land as rows in a Google Sheet the user owns. The Sheet itself becomes their inbox, database, and dashboard. The "backend" is a Google Apps Script Web App deployed at a public URL.

**Architecture:**

```
[ Browser form ]
      │
      │  fetch( SCRIPT_URL?name=...&email=...&message=...&timestamp=... )
      │  method: GET, mode: "no-cors"
      ▼
[ Google Apps Script Web App ]   (function doGet(e))
      │
      │  sheet.appendRow([...])
      ▼
[ Google Sheet ]
```

---

## Steps the user must do manually (cannot be automated)

Tell the user to do these three things in order, then come back to you:

1. **Create the Sheet.** Open `https://sheets.new`, name it `contact-submissions`. In row 1, enter these headers across columns A–D: `Timestamp`, `Name`, `Email`, `Message`.
2. **Open Apps Script** from inside the Sheet via `Extensions → Apps Script`.
3. **Paste the script** below into the editor (replacing any boilerplate `function myFunction()` block), save, then deploy via `Deploy → New deployment → Web app`. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Authorize when prompted. Copy the returned URL (looks like `https://script.google.com/macros/s/AKfycb.../exec`). The user must paste this URL back to you so you can wire it into their code.

---

## The Apps Script (paste verbatim)

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const p = e.parameter;

  sheet.appendRow([
    p.timestamp || new Date().toISOString(),
    p.name || "",
    p.email || "",
    p.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

That is the entire backend. `doGet` is a reserved name; Apps Script auto-routes incoming GET requests to it. `e.parameter` is the parsed query string. `appendRow` writes a new row to the bottom of the active sheet.

---

## Steps you (the agent) must do in the user's codebase

### 1. Locate the contact form

Search the project for an existing contact / "get in touch" / "let's connect" form. Common locations:
- `components/**/Contact*.{tsx,jsx,vue,svelte}`
- `components/**/Form*.{tsx,jsx,vue,svelte}`
- `app/contact/**`, `pages/contact*`
- Any component with `<input name="email">` and `<textarea name="message">`

If no form exists, build a minimal one with three fields: `name`, `email`, `message`.

### 2. Add the submit handler

The handler is framework-agnostic. Adapt the binding (React `onSubmit`, Vue `@submit`, Svelte `on:submit`, etc.) to the user's stack, but the inner `fetch` is identical.

**The canonical client snippet:**

```ts
const SCRIPT_URL = "PASTE_USER_DEPLOYMENT_URL_HERE";

async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const url =
    `${SCRIPT_URL}` +
    `?name=${encodeURIComponent(data.name)}` +
    `&email=${encodeURIComponent(data.email)}` +
    `&message=${encodeURIComponent(data.message)}` +
    `&timestamp=${encodeURIComponent(new Date().toISOString())}`;

  await fetch(url, {
    method: "GET",
    mode: "no-cors",
    cache: "no-cache",
  });
}
```

Replace `PASTE_USER_DEPLOYMENT_URL_HERE` with the URL the user pastes back from Step 3 above. Do not commit a real deployment URL into a public repo without the user's confirmation.

### 3. Wire it into the form

Call `submitContactForm({ name, email, message })` from the form's existing onSubmit / submit handler. Preserve any existing client-side validation. After the fetch resolves, optimistically reset the form and show a success message — there is no real success signal because of `mode: "no-cors"` (see "Critical constraints" below).

If the user's form already submits to a different endpoint (Formspree, Netlify, Vercel function, etc.), replace the existing submission logic with this. Remove now-unused imports, env vars, and dependencies.

### 4. Add minimum viable validation (only if missing)

```ts
const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
```

Block submission if `name` or `email` is empty, or if `email` fails the regex. Keep validation minimal — the user can extend later.

---

## Critical constraints (do not violate)

1. **Use `method: "GET"` with query params.** Do not use POST. POST with a JSON body triggers a CORS preflight (`OPTIONS`) request, which Apps Script does not respond to with usable CORS headers. The request will fail.

2. **Use `mode: "no-cors"`.** This makes the response opaque (your code cannot read status codes, headers, or body), but it lets the request fire successfully. For a contact form this trade is correct: the Sheet is the source of truth. Do not add `await response.json()` or status checks — they will fail or return empty.

3. **Show an optimistic success message.** Because the response is opaque, you cannot distinguish success from failure on the client. Treat any `await fetch(...)` resolution (no thrown exception) as success. A thrown exception (network offline, etc.) is the only signal of failure.

4. **`encodeURIComponent` every parameter.** Names with `&`, emails with `+`, messages with newlines or `=` will break the URL otherwise.

5. **URL length cap ~8KB.** If the user expects long messages (>2000 chars), warn them. Switching to POST requires returning CORS headers from Apps Script, which is non-trivial — out of scope for v1.

6. **The Apps Script must be deployed with "Who has access: Anyone"**, not "Anyone with Google account". Otherwise unauthenticated browsers cannot reach it.

---

## Optional enhancements (offer these to the user, do not auto-add)

After the basic wiring works, ask the user if they want any of:

1. **Honeypot anti-spam.** Add a hidden input named `website` to the form (`display: none`). In the Apps Script, return early if `p.website` is non-empty:
   ```javascript
   if (p.website) return ContentService.createTextOutput(JSON.stringify({ ok: true }));
   ```
2. **Auto-reply email.** Inside `doGet`, after `appendRow`:
   ```javascript
   if (p.email) {
     MailApp.sendEmail({
       to: p.email,
       subject: "Got your message",
       body: `Hi ${p.name || "there"}, thanks for reaching out — I'll reply within 24 hours.`,
     });
   }
   ```
3. **Slack / Discord webhook notification.** Inside `doGet`, after `appendRow`:
   ```javascript
   const SLACK_WEBHOOK = "https://hooks.slack.com/services/...";
   UrlFetchApp.fetch(SLACK_WEBHOOK, {
     method: "post",
     contentType: "application/json",
     payload: JSON.stringify({ text: `New contact: ${p.name} (${p.email}) — ${p.message}` }),
   });
   ```
4. **Email-on-edit notification (zero code).** In the Sheet UI: `Tools → Notification settings → Notify me of changes → Any changes → Right away`. Sends the user an email every time a row is added.

---

## Verification checklist

Confirm with the user before declaring done:

- [ ] Sheet exists with header row `Timestamp | Name | Email | Message`.
- [ ] Apps Script is deployed; user has the `/exec` URL.
- [ ] `SCRIPT_URL` constant in the user's codebase contains that URL.
- [ ] Form's submit handler calls the new `submitContactForm`.
- [ ] Submitting the form once writes a real row into the Sheet.
- [ ] Form shows a success state after submission.
- [ ] Removed any prior submission logic / SaaS dependencies that are no longer used.

---

## Quick sanity test (have the user run this)

Submit the form with name `Test`, email `test@example.com`, message `hello`. Open the Sheet. A new row should appear within 1–2 seconds. If not:

1. Open the Apps Script editor → `Executions` tab. Look for the most recent `doGet` invocation. Check for errors.
2. Confirm the deployment was set to "Who has access: **Anyone**", not "Anyone with Google account".
3. Confirm the URL in the code ends with `/exec` (not `/dev`).
4. Open browser DevTools → Network tab. The request to `script.google.com` should have status 0 (opaque, expected) or 200, never blocked by CORS.

---

## Why this approach

For context — do not put this in code, but use it if the user asks "is this really better than Formspree":

- Free tier: Formspree 50/month, Netlify 100/month, EmailJS 200/month, Web3Forms 250/month. Google Sheets: ~2.5M submissions before hitting the 10M-cell sheet cap.
- Vendor lock-in: zero. The user owns the Sheet and the Script.
- Extensibility: anything Apps Script can do (email, Slack, REST calls, scheduled jobs) can be bolted on without changing the client.
- Cost: $0 forever, on the user's existing Google account.
