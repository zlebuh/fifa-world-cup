# CLAUDE.md — FIFA World Cup 2026 Visualizations App

This file is the agent's primary reference for working in this repository.
Read it before starting any task. Keep it up to date as conventions evolve.

---

## Project overview

An interactive, responsive, good-looking visualization layer for the
[2026 FIFA World Cup](https://en.wikipedia.org/wiki/2026_FIFA_World_Cup).
Data comes from Wikipedia / a public football API. There is no proprietary backend.

**Live URL:** `https://zlebuh.github.io/fifa-world-cup`
**Repo:** `https://github.com/zlebuh/fifa-world-cup`

---

## Hosting & architecture

- **Hosting:** GitHub Pages (static files only — no server-side runtime).
- **Data strategy:** A scheduled GitHub Action fetches match data from a public
  source (Wikipedia API or a free football data API), normalizes it, and writes
  a versioned `public/data/matches.json` file. The Action re-runs periodically
  so results update as matches are played.
- **No backend is needed.** Timezone conversion uses the browser `Intl` API,
  filtering is client-side state, and the map runs client-side via a JS library.
- **State in the URL:** timezone, active filters, and current view are encoded
  as query params so links are shareable.

### Match data shape

```ts
interface Match {
  id: string
  stage: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'final'
  group?: string           // e.g. 'A'
  homeTeam: string
  awayTeam: string
  homeScore?: number       // null until played
  awayScore?: number
  utcKickoff: string       // ISO 8601
  venue: string
  city: string
  lat: number
  lng: number
}
```

---

## Tech stack

> Stack details are finalized in issue #9. Update this section once closed.

| Concern | Choice | Notes |
|---|---|---|
| Framework | TBD | React + Vite or Astro preferred for static output |
| Language | TypeScript (strict) | No plain JS files |
| Styling | TBD | Tailwind CSS preferred |
| Map | TBD | Leaflet or Mapbox GL JS |
| Unit / component tests | Vitest + Testing Library | |
| E2E tests | Playwright | |
| Visual regression | Playwright screenshots | Baselines stored in repo |
| a11y tests | @axe-core/playwright | Integrated into E2E suite |
| CI | GitHub Actions | |
| Deploy | GitHub Pages via `gh-pages` branch | |

---

## Repository structure

> Finalized after stack decision (issue #10). Placeholder below.

```
/
├── .github/
│   ├── workflows/        # CI, deploy, data-fetch actions
│   └── pull_request_template.md
├── public/
│   └── data/
│       └── matches.json  # generated — do not edit by hand
├── src/
│   ├── components/       # UI components
│   ├── views/            # list | calendar | map
│   ├── services/         # data fetching, timezone utils, filter logic
│   └── types/            # shared TypeScript types
├── tests/
│   ├── unit/             # Vitest unit + component tests
│   └── e2e/              # Playwright E2E + a11y + visual regression
├── CLAUDE.md             # ← this file
└── README.md
```

---

## Development workflow (agentic)

This project is developed autonomously by an AI agent. The human owner
**only approves pull requests** — they do not write code directly.

### Agent responsibilities
- Implement features from GitHub issues
- Write tests for every change (unit + E2E where appropriate)
- Open a PR with a fully filled-out PR template for every piece of work
- Keep CLAUDE.md up to date when conventions change
- Keep `matches.json` generation working; never hand-edit it

### Human responsibilities
- Review and approve / request changes on PRs
- Make architectural decisions flagged by the agent
- Approve major dependency upgrades
- Resolve ambiguous product questions raised in PR comments

### Things the agent must NOT do without human approval
- Change the tech stack or swap out a core library
- Add a new runtime infrastructure dependency (CDN, external API with auth, etc.)
- Force-push or rebase published branches
- Merge its own PRs
- Delete branches other than its own feature branches after merge

---

## Branching & commit conventions

- **Main branch:** `main` — always deployable
- **Feature branches:** `feat/<short-description>` (e.g. `feat/calendar-view`)
- **Fix branches:** `fix/<short-description>`
- **Chore branches:** `chore/<short-description>`
- **Commit messages:** imperative mood, max 72 chars
  (`Add timezone selector`, `Fix filter reset on view switch`)
- **One PR per issue** — keep PRs focused and small

---

## Pull request rules

Every PR opened by the agent must use the PR template at
`.github/pull_request_template.md`. All sections must be filled — especially
**Review focus**, which lists explicit decisions or trade-offs for the human.

CI checks that must pass before merge:
1. Lint + type-check
2. Unit tests (coverage ≥ 80% service layer, ≥ 70% overall)
3. E2E tests (including a11y assertions)
4. Visual regression (no unexpected diffs)
5. Lighthouse CI (Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90)
6. Build succeeds and deploys to preview URL

---

## Testing strategy

| Layer | Tool | Scope |
|---|---|---|
| Service / data logic | Vitest | Timezone utils, filter logic, data normalization |
| Frontend components | Vitest + Testing Library | Render, interactions, edge cases |
| E2E (golden paths) | Playwright | View switching, filtering, timezone change |
| Accessibility | @axe-core/playwright | All major views, zero critical violations |
| Visual regression | Playwright screenshots | Key views at desktop + mobile breakpoints |
| Performance | Lighthouse CI | Runs against preview deployment on every PR |

Run all tests locally:
```
pnpm test:unit     # unit + component
pnpm test:e2e      # E2E + a11y + visual regression
pnpm test          # both
```

---

## CI / CD pipeline

```
PR opened
  └── lint + type-check
  └── unit tests + coverage
  └── build → deploy to preview URL
  └── E2E + a11y + visual regression (against preview URL)
  └── Lighthouse CI (against preview URL)

Merged to main
  └── same checks
  └── deploy to https://zlebuh.github.io/fifa-world-cup

Scheduled (daily)
  └── data-fetch action → updates matches.json → auto-commit if changed
```

---

## Development plan

Issues are sequenced in 8 phases. Do not start a phase until the previous is merged and green.

### Phase 1 — Foundation
| # | Issue |
|---|---|
| #9 | Tech stack selection |
| #10 | Application architecture |

### Phase 2 — Project infrastructure
| # | Issue |
|---|---|
| #12 | PR rules and CI pipeline |
| #13 | Automated deployment (GitHub Pages + preview URLs) |
| #22 | Dependency update automation (Renovate) |

### Phase 3 — Data pipeline
| # | Issue |
|---|---|
| #23 | Match data pipeline — fetch & normalize World Cup schedule |

### Phase 4 — Test infrastructure
| # | Issue |
|---|---|
| #16 | Unit tests: service and data layer |
| #17 | Unit tests: frontend components |
| #11 | E2E test project setup (Playwright) |
| #19 | Accessibility automated testing (axe-core) |
| #18 | Visual regression testing |
| #20 | Code coverage reporting |
| #21 | Performance budget — Lighthouse CI |

### Phase 5 — Core features: Schedule
| # | Issue |
|---|---|
| #4 | Timezone: auto-detect from visitor location |
| #5 | Timezone: manual selector |
| #1 | Schedule: classic list view |
| #6 | Filtering: by team |
| #7 | Filtering: by group |
| #8 | Filtering: by stage |
| #25 | Shareable URLs (filter + timezone + view in query params) |

### Phase 6 — Additional schedule views
| # | Issue |
|---|---|
| #2 | Schedule: calendar view |
| #3 | Schedule: map view |

### Phase 7 — Standings & bracket
| # | Issue |
|---|---|
| #26 | Group standings table |
| #27 | Interactive knockout bracket |

### Phase 8 — Polish
| # | Issue |
|---|---|
| #28 | Dark / light mode |

---

## Decisions log

- **No backend.** GitHub Pages is static-only. All logic is client-side:
  timezone via browser `Intl` API, filtering via client state, map via a JS
  library, data via a scheduled GitHub Action writing `matches.json`.
- **PWA / match reminders** (#24) — closed, deprioritized. Not needed for
  initial release. Can be reopened later.

---

## Keeping this file up to date

Update CLAUDE.md when:
- Tech stack decisions are finalized (issues #9, #10)
- New conventions are established (e.g. a new folder, a new test pattern)
- The deployment setup changes
- The human owner gives standing instructions that apply to future work

Do NOT update CLAUDE.md to log task progress or PR history — git and GitHub
issues are the source of truth for that.
