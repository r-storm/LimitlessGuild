# LimitlessGuild

[] Static guild war stats dashboard for a gaming guild. Deployed to GitHub Pages.

## Agent Usage

Use the maximum number of parallel subagents on every task. Spawn agents concurrently whenever work can be parallelized (research, file reads, searches, independent edits). Prefer launching multiple agents in a single message over sequential execution.

## Tech Stack

- React 19 (JSX, no TypeScript), Vite 7, Tailwind CSS v4
- Tailwind uses `@tailwindcss/vite` plugin and `@import "tailwindcss"` syntax (no tailwind.config.js)
- Headless UI for accessible components, Heroicons for icons

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

## Project Structure

```
src/
  App.jsx              — Root component, manages page navigation via state (no router)
  main.jsx             — Entry point
  index.css            — Global styles, Tailwind import
  components/          — Shared UI components (StatCard, RankingCard, SortableTable, etc.)
  components/pages/    — Page-level components (DashboardPage, MatchesPage, TeamPage)
  components/layout/   — Navbar, PageHeader
  components/matches/  — Match-specific components (CalendarGrid, MatchDetail)
  data/                — Static data and access functions
    playerStats.js     — Player stat data
    gameDefinitions.js — Game metadata
    dataUtils.js       — Data access/query functions
  hooks/               — Custom hooks (useTheme)
  utils/               — Utilities
    classNames.js      — Conditional class joining helper
    formatters.js      — Number formatting
```

## Code Conventions

- ES modules (import/export), functional components with hooks
- Dark mode: manual class toggle on `<html>` element, use `dark:` Tailwind variant (not media query)
- Use `classNames()` from `src/utils/classNames.js` for conditional CSS classes
- Player data is static JSON in `src/data/playerStats.js`; use `dataUtils.js` for queries
- Format numbers with helpers from `src/utils/formatters.js`

## Lint Rules

- `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`)

## Deployment

Static site for GitHub Pages. The Vite `base` option in `vite.config.js` may need to be set for subdirectory deployment (e.g., `base: '/LimitlessGuild/'`).
