# YOTI frontend MVP

A responsive browser-based demonstration of the Youth Orientation Tracking Initiative: a supportive student welfare space for schools and universities in Cameroon.

**Frontend only. Use fictional information.** No report is transmitted, no real appointment is booked, and no counsellor is notified. All interactions use React state in memory and reset when the page reloads. Reports are never written to localStorage or sessionStorage. The role selector is a demo switch, not authentication or authorization.

## Run locally

Requires Node.js 22 LTS or a compatible supported version, and npm.

```bash
npm install
npm run dev
```

In the current workspace Node was downloaded temporarily for verification. If `npm` is not on your path, first run:

```bash
export PATH="/tmp/node-v22.16.0-linux-x64/bin:$PATH"
```

For a lasting setup, install Node.js 22 LTS with your preferred version manager.

Open the Vite URL printed in your terminal (normally http://localhost:5173).

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production build is static output in `dist/`. Hash routing means it can be served by a simple static server without custom URL rewrite rules. Containerisation, hosting, infrastructure and CI/CD are intentionally outside this project.

## What is implemented

- Student overview with supportive actions, mood check-in, report summary, next appointment and resource recommendations.
- Two-step incident reporting: category selection, identified/anonymous mode, optional date/location, fictional supporting details, validation, confirmation and reference number.
- Report listing, category/reference search, status filtering and a details dialog with progress.
- Counsellor overview, case priority, status updates, follow-up queue and appointment confirmation.
- Administrator/NGO overview with aggregated category counts, open/resolved totals, pending sessions, period filter and aggregate CSV export. This view omits student identities and individual report contents.
- Appointment date/time/format selection, occupied-slot prevention, pending requests, filtering and cancellation confirmation.
- Resource library with search, category filters, four readable articles and general support guidance.
- English/French UI switching, including navigation, forms, controls, status messages and resource articles. Fictional case narratives remain sample text as entered.
- Responsive desktop sidebar and mobile drawer, semantic forms, visible focus styles, modal keyboard handling, reduced-motion support, empty states, toast feedback and rendering-error fallback.

## Stack

React 19, TypeScript, Vite, React Router, Lucide icons, plain CSS, ESLint and Playwright. No runtime API integrations, hosted fonts or remote image dependencies. The illustration and resource artwork are rendered locally using SVG/CSS.

## Project structure

```text
public/                 Favicon
src/
  components/           App shell, shared cards/dialogs/status UI, error boundary
  contexts/             In-memory demo state and English/French text helper
  data/                 Typed fictional reports, appointments and resources
  pages/                Overview, reports, reporting flow, appointments,
                        resources, analytics and missing-page view
  styles/               Design tokens, component styles and responsive rules
  main.tsx              App entry point and routes
tests/                  Browser interaction and viewport regression tests
```

## Browser verification

```bash
npm run test:e2e
```

The Playwright configuration detects the installed Chrome at `/opt/google/chrome/chrome` in this workspace. On another machine it uses Playwright Chromium; install that browser with `npx playwright install chromium`. The test runner starts Vite automatically, or reuses a running local Vite server.

Coverage includes reporting and refresh reset, appointment booking/cancellation and unavailable slots, case management, counselling confirmation, French interface switching, admin filters and CSV download, resource search/articles, missing routes, and horizontal-overflow/navigation checks at 360, 390, 768 and 1440 pixels.

## Demonstration boundaries and next integrations

- No backend, database, real authentication, encryption implementation, permissions, secure storage, notification delivery, emergency monitoring, file upload or offline synchronisation.
- Switching roles is a UI preview. It does not isolate data or establish a security boundary.
- Prototype records live only in memory. Do not use this build to collect actual student reports or personal information.
- Counsellor profiles, cases and appointments are fictional. Initial examples are dated October/November 2026; selectable appointment slots are relative to the device date and displayed in Cameroon time (UTC+1).
- Resource text is general wellbeing information, not medical advice or a substitute for professional care. Professional and local safeguarding review is needed before a real pilot.
- Production work remains for authenticated role-based services, validated report submission and case workflows, appropriate data protection and retention, appointment availability and delivery, notification systems, professionally reviewed resources, and offline/synchronisation design.

## Verification results

The production build, TypeScript check and ESLint check pass. All 10 Playwright browser tests pass, including the four viewport checks. Desktop and phone overview screenshots were also inspected. Browser tests use Chrome; physical devices and other browser engines have not been tested.
=======
# yoti-frontend
>>>>>>> origin/main
