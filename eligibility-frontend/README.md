# Immigration Pathway Simulator (Next.js)

Frontend for the pathway simulator: a 12-question form that calls the
Laravel API, then a results screen with a comparison chart, per-pathway
reasoning, an "improve my score" checklist, and lead capture.

## Setup

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at your Laravel API
npm run dev
```

Requires the Laravel backend (see `../backend/README.md`) running and
reachable at `NEXT_PUBLIC_API_URL`, with CORS allowing this app's origin.

## Structure

```
app/
├── page.tsx              # landing page / hero
├── simulator/page.tsx    # multi-step form + results orchestration
└── globals.css

components/simulator/
├── ProgressStamp.tsx     # step progress bar
├── QuestionStep.tsx      # renders number/text/select/boolean questions
├── ResultsScreen.tsx     # score stamp + chart + pathway list
├── PathwayCard.tsx       # per-pathway score, reasons, improvements
├── ScoreImprovement.tsx  # "potential improvements" checklist
└── LeadCaptureForm.tsx   # name/email/phone -> POST /eligibility/leads

lib/
├── api.ts                # fetch wrapper for the Laravel API
└── types.ts               # shared types matching the API response shape
```

The question set is **not hardcoded** here — `simulator/page.tsx` fetches
it from `GET /eligibility/questions` on the backend, so changing a
question's copy, options, or order is a backend config change, not a
frontend deploy.

## Design notes

The visual language leans into the subject: a Canadian immigration
eligibility check reads like an official document, so the design borrows
from passports, visa stamps, and boarding-pass stubs rather than a
generic SaaS look.

- **Palette**: pale mist background (`#EEF2F1`), deep marine ink for text
  (`#0E2A3D`), and a single accent — a visa-stamp brick red (`#B33F2E`) —
  used sparingly for CTAs and the score badge.
- **Type**: Fraunces (display, documenty serif) for headlines, IBM Plex
  Sans for body copy, IBM Plex Mono for scores and labels — mono numerals
  read like a stamped serial number.
- **Signature element**: the score is shown as a rotated circular stamp,
  and expanded pathway cards use a dashed "tear-edge" border, echoing a
  boarding-pass stub.

## Known gaps to close before production

- No accessibility audit pass beyond visible focus states and semantic
  form controls — run an audit before shipping.
- No analytics/conversion tracking wired up (Phase 8 in the backend plan).
- Error states are minimal; consider retry/backoff on the results fetch.
