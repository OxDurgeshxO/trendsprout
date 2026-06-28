# TrendSprout — Architecture Document

## Stack Decision

**Stack: TanStack Start (React + Vite + Tailwind v4)**

Not Next.js, despite preference, for these reasons:

| Factor | TanStack Start | Next.js |
|--------|---------------|---------|
| Memory pressure | Lightweight (Vite) | Heavy (Webpack/Turbopack) |
| React + SSR | ✅ | ✅ |
| File-based routing | ✅ | ✅ |
| Server functions | ✅ (createServerFn) | ✅ (Server Actions) |
| API routes | ✅ (routes/api/*.ts) | ✅ |
| Tailwind v4 | ✅ | ✅ |
| Already deployed | ✅ — live on port 3000 | Would need migration |
| Migration cost | $0 | High — full rewrite |

## Project Structure

```
site/
├── site.json                  # Business name (read at request time)
├── serve.ts                   # Production server (port 3000, Bun)
├── publish.sh                 # Build + restart
├── src/
│   ├── routes/
│   │   ├── __root.tsx         # HTML shell, global layout
│   │   ├── index.tsx          # Landing page (/)
│   │   ├── login.tsx          # Login page (/login)
│   │   ├── signup.tsx         # Signup page (/signup)
│   │   ├── dashboard.tsx      # Dashboard (/dashboard)
│   │   └── api/               # API routes
│   ├── styles/
│   │   └── app.css            # Tailwind entrypoint
│   └── lib/                   # Shared utilities (database, auth, etc.)
├── docs/                      # Documentation
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## Database Schema (Target: Supabase)

### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| email | text | unique, not null |
| name | text | |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | |

### `subscriptions`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → users.id |
| stripe_customer_id | text | |
| stripe_subscription_id | text | |
| status | text | 'active', 'canceled', 'past_due' |
| current_period_start | timestamptz | |
| current_period_end | timestamptz | |
| created_at | timestamptz | |

### `generations`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → users.id |
| niche | text | |
| content_type | text | 'caption', 'concept', 'hashtags', 'all' |
| topic | text | nullable |
| result | jsonb | { captions, concepts, hashtags } |
| created_at | timestamptz | |

## Key Decisions

1. **Supabase for auth + database** — Postgres, auth, row-level security
2. **Server functions** for all DB/AI calls (no client-side secrets)
3. **Stripe** for subscription billing (when implemented)
4. **OpenAI/Anthropic** for AI content generation (when implemented)