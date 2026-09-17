# Secured RAG Platform — clickable prototype

A two-page, front-end-only Next.js prototype built for a stakeholder demo.
Everything is mocked in the browser: there is **no backend, no authentication,
no OAuth, no vector database and no persistence**.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. `/` redirects to `/login`.

## The demo path

1. **`/login`** — enter any username and any password (both must be non-empty),
   then click **Log in**. There is no credential check; any input signs you in.
   The "Forgot password?" link is decorative.
2. **`/dashboard`** — click **Connect** on **Confluence** or **GitHub**.
   The button shows a brief "Connecting…" state, then flips to a mint
   **Connected** badge with a mock relative timestamp.
3. Once a source connects, the **vector database** panel appears and shows
   "Syncing to vector database…" for a few seconds before listing the mock
   ingested items (`12 pages indexed from Confluence · just now`).
4. **Log out** in the top bar returns to `/login`.

Connect both sources to see two syncs overlap and both results listed.

**Refreshing the page resets everything to disconnected.** That is intended —
all state lives in React only, with nothing written to `localStorage` or a
server.

## What is simulated

| Behaviour | Reality |
| --- | --- |
| Login | Checks only that both fields are non-empty, then routes to `/dashboard` |
| Connect | `setTimeout` (~1.4s) — no OAuth, no network request |
| Ingestion | `setTimeout` (~2.8s) plus a cosmetic progress bar |
| Ingested counts | Hard-coded in `src/lib/connectors.ts` |
| Notion / SharePoint / Google Drive | Non-interactive "Coming soon" cards |

## Structure

```
src/
  app/
    layout.tsx            Root layout, fonts and metadata
    page.tsx              Redirects / → /login
    login/page.tsx        Page 1
    dashboard/page.tsx    Page 2 — owns all mock state (useReducer)
    globals.css           Tailwind layers and base typography
  components/
    login-form.tsx        Login fields, validation and routing
    connector-card.tsx    Live connector card + "Coming soon" card
    ingestion-panel.tsx   Simulated sync progress and ingested list
    top-bar.tsx           Product name, placeholder user, log out
    brand-mark.tsx        Placeholder logo and wordmark
    source-icon.tsx       Inline source logos (no image assets)
    ui/                   Small shadcn-style primitives
  lib/
    connectors.ts         Connector definitions and mock ingest counts
    time.ts               Relative timestamp formatting
```

All connector state is held in a single `useReducer` in
[`src/app/dashboard/page.tsx`](src/app/dashboard/page.tsx); the card and panel
components are presentational.

## Design tokens

Defined in [`tailwind.config.ts`](tailwind.config.ts):

| Token | Value |
| --- | --- |
| `navy` | `#0F1B33` |
| `teal` | `#0E7C7B` |
| `mint` | `#02C39A` |
| `offwhite` | `#F7F9FB` |

Headings use a Georgia/Cambria serif stack; body copy uses the system sans
stack. Layouts are responsive from 375px upward.

## Not implemented, by design

- Real authentication or session management
- Real OAuth or API calls to Confluence or GitHub
- A real vector database or ingestion pipeline
- Any persistence layer

## Note on `npm audit`

Two low-impact advisories remain in transitive dependencies (`sharp`, and a
`postcss` copy nested inside `next`). Neither is reachable from this prototype —
it uses no image optimization — and both are resolved only by a major Next.js
upgrade. Left as-is for a demo build.
