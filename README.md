# TrendSprout AI — TikTok Creator Platform

TrendSprout is an AI-powered content generation studio designed for TikTok creators and digital brands. It eliminates creator block by generating fully coordinated content sets consisting of high-retention video concepts & hooks, engaging captions, and tiered hashtag clusters.

Live Application: **[https://trendsprout.vercel.app](https://trendsprout.vercel.app)**

---

## 🛠️ Project Architecture & Tech Stack

* **Frontend Framework**: React 19 (`^19.2.4`)
* **Routing & SSR Engine**: TanStack Router (`^1.158.1`) & TanStack Start (`^1.158.3`)
* **Build Tooling**: Vite 7 (`^7.3.1`) & TypeScript (`^5.9.3`)
* **Styling & UI**: Tailwind CSS v4 (`^4.1.18`) with glassmorphism, responsive grids, and micro-animations
* **Execution Environment**: Node.js / Bun compatible

```
site/
├── src/
│   ├── lib/
│   │   ├── auth.ts         # Local storage session management & demo auth helpers
│   │   └── generate.ts     # TanStack Start server function & content generation library
│   ├── routes/
│   │   ├── __root.tsx      # Root HTML shell & global asset provider
│   │   ├── index.tsx       # Landing page (hero, features, pricing, CTA, social proof)
│   │   ├── dashboard.tsx   # Interactive AI generation workspace with copy-to-clipboard feedback
│   │   ├── login.tsx       # Login page with password and one-click demo login options
│   │   └── signup.tsx      # Signup page with direct onboarding and demo workspace launch
│   ├── styles/
│   │   └── app.css         # Tailwind v4 utility setup
│   ├── routeTree.gen.ts    # Auto-generated TanStack router tree
│   └── router.tsx          # Router instantiation
├── vite.config.ts          # Vite & SSR configuration
└── package.json            # Scripts & project dependencies
```

---

## ⚙️ Key Components & Functions

### 1. `auth.ts`
* `getSession()`: Safely retrieves and parses user session data with `try-catch` guards against restricted browser storage environments.
* `setSession(session)`: Persists user state to `localStorage`.
* `clearSession()`: Clears active session on logout.
* `createDemoSession(name, email)`: Generates an instant demo session for rapid evaluation.

### 2. `generate.ts`
* `generateContent`: TanStack Start `createServerFn` endpoint that validates `GenerateRequest` parameters (niche, audience, tone, count) and returns coordinated `ContentSet` bundles matching specialized content libraries (Fashion, Fitness, Gaming, etc.).

### 3. `dashboard.tsx`
* `Dashboard`: Main studio workspace component. Features auto-session detection, preset tags, loading skeletons, error boundaries, and formatted `ContentSetCard` rendering.
* `ContentSetCard`: Interactive card displaying video hook strategy, act timelines, estimated engagement metrics (watch retention, shareability, comment bait, save likelihood), and defensive copy-to-clipboard functionality for captions and hashtag sets.

---

## 🐛 Resolved Audit Findings & Bug Fixes

1. **Hydration & Session Flash**: Guarded `dashboard.tsx` against hydration mismatch by integrating smooth state fallback initialization and default demo session fallback when unauthenticated users visit directly.
2. **Missing Windows Binary Dependencies**: Resolved optional binary loading issues for `@rollup/rollup-win32-x64-msvc`, `lightningcss-win32-x64-msvc`, and `@tailwindcss/oxide-win32-x64-msvc` to ensure smooth multi-platform compilation on Windows.
3. **Interactive Authentication**: Upgraded static placeholder alerts on `/login` and `/signup` with functional session creation handlers and instant one-click demo workspace buttons.
4. **Copy API Resilience**: Added fallback text selection copy mechanisms (`document.execCommand("copy")`) alongside `navigator.clipboard.writeText` to prevent runtime crashes in unsecure or restricted Web views.

---

## 🚀 Setup & Execution Commands

### Prerequisites
- Node.js (v18+) or Bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm run start
```
