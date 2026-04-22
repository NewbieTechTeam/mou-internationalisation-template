# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

Use **Yarn**, not npm. Node 18.19.1 is required.

```bash
yarn install
```

## Common Commands

```bash
yarn start             # Dev server at http://localhost:4200
yarn hmr               # Dev server with Hot Module Replacement
yarn build             # Development build
yarn build:prod        # Production build (base-href=/ng-matero/)
yarn build:firebase    # Firebase deployment build (base-href=/)
yarn lint              # Run all linters (TS + SCSS)
yarn lint:ts           # ESLint with auto-fix
yarn lint:scss         # Stylelint SCSS with auto-fix
yarn test              # Unit tests (Karma/Jasmine)
yarn test:ci           # CI tests with coverage (Chrome Headless)
yarn analyze           # Bundle analysis
yarn deploy            # Deploy to GitHub Pages
```

## Architecture

**Angular 17 standalone components** — no NgModules. Bootstrap via `bootstrapApplication()` in `src/main.ts`, configured in `src/app/app.config.ts`.

### Directory Layout

- `src/app/core/` — Singleton services: `authentication/` (guards, tokens), `bootstrap/` (startup/settings/menu init), `interceptors/`
- `src/app/routes/` — Lazy-loaded feature areas: `dashboard/` (MOU visualization), `sessions/` (login/register), `forms/`, `tables/`, `profile/`, `permissions/`
- `src/app/shared/` — Reusable components, directives, pipes, interfaces, and services
- `src/app/theme/` — Layout shell: `admin-layout/`, `auth-layout/`, `header/`, `sidebar/`, `sidemenu/`
- `src/environments/` — `environment.ts` (dev) and `environment.prod.ts` (prod)

### Path Aliases (tsconfig)

| Alias | Maps to |
|-------|---------|
| `@core/*` | `app/core/*` |
| `@shared/*` | `app/shared/*` |
| `@theme/*` | `app/theme/*` |
| `@env/*` | `environments/*` |
| `@testing/*` | `testing/*` |

### Bootstrap Flow

`StartupService` runs at app init. It initializes `SettingsService`, `MenuService`, and `TranslateLangService`. `authGuard` protects all admin routes; unauthenticated users are redirected to `sessions/login`.

### Key Libraries

- **UI**: Angular Material 17, ng-matero/extensions 17
- **Forms**: NGX-Formly (dynamic forms)
- **Firebase**: Firestore, Auth, Storage, Analytics, VertexAI (project: `internationalisation-mou`)
- **i18n**: @ngx-translate/core — translation JSON files live in `src/assets/i18n/`
- **Auth/Roles**: NGX-Permissions
- **Charts**: ApexCharts
- **Notifications**: NGX-Toastr
- **Theming**: Angular Material with SCSS, supports dark mode and RTL

### Firebase / Firestore

The active Firestore collection for sample MOU data is configured as `dataCollection: 'cleanedsampledata5'` in the environment files. Firebase credentials are in `src/app/app.config.ts`.

### Code Style

Prettier enforces: 2-space indent, print width 100, single quotes, trailing commas (ES5). Husky + lint-staged auto-formats staged files on commit. ESLint is strict TypeScript; `@typescript-eslint/no-explicit-any` is warned, not errored.

### MOU Domain Features

The dashboard (`src/app/routes/dashboard/`) provides: MOU visualization grouped by continent, expiring-soon notifications, assigned MOU tracking, Excel upload to Firebase, and bar charts. User management supports add/edit/delete/view/download with capital-formatting and whitespace normalization on imported data.
