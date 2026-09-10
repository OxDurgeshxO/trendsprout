# 🌱 TrendSprout AI — TikTok Creator Studio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-trendsprout.vercel.app-10b981?style=for-the-badge&logo=vercel)](https://trendsprout.vercel.app)
[![React 19](https://img.shields.io/badge/React%2019-v19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack%20Start-SSR%20Engine-ff4154?style=for-the-badge)](https://tanstack.com/start)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

**TrendSprout AI** is an AI-powered content strategy studio engineered for TikTok creators, brands, and digital storytellers. It eliminates creator burnout by generating coordinated, high-retention content bundles consisting of:

1. **Video Concepts & 3-Act Pacing Arcs** with explicit hook strategies, text overlays, and audio cues.
2. **High-Retention Captions** with targeted hook styles and psychological engagement tactics (save, comment, share triggers).
3. **Tiered Hashtag Matrices** scientifically clustered into broad discovery, targeted mid-tier, and niche community tags.

Live Production Deployment: **[https://trendsprout.vercel.app](https://trendsprout.vercel.app)**

---

## ✨ Key Capabilities & Algorithmic Strategy

- **Coordinated 3-Part Content Sets**: Unlike generic AI copywriters that produce detached captions, TrendSprout aligns the video hook, pacing breakdown, caption, and hashtag clusters into a unified narrative.
- **3-Act Video Breakdown & Hook Strategies**: Formats content into proven TikTok archetypes (Transformations, Exposes, Comparisons, Tutorials, and Listicles) with strict 0-3s hook requirements.
- **Predictive Engagement Scoring**: Evaluates each concept across 4 key TikTok algorithm levers:
  - 👁️ _Watch Time Retention_
  - 🔄 _Shareability_
  - 💬 _Comment Bait_
  - 📌 _Save Likelihood_
- **3-Tier Hashtag Clustering**: Avoids spammy tags (`#fyp`) in favor of balanced clusters (1–2 high-volume discovery tags + 1–2 mid-tier targeted tags + 1–2 high-conversion niche tags).
- **Local Persistence & Export**: Saves generation history in `localStorage` across browser refreshes and provides one-click script export to formatted Markdown (`.md`) files.
- **Zero-Config Showcase Engine + Live AI**: Runs instantly out-of-the-box with rich presets (Fashion, Fitness, Gaming, Travel, Food, Tech) and dynamic niche synthesis, with automatic live model generation whenever `GEMINI_API_KEY` or `OPENAI_API_KEY` is provided.

---

## 🛠️ Architecture & Tech Stack

| Layer                  | Technology                             | Details                                                     |
| :--------------------- | :------------------------------------- | :---------------------------------------------------------- |
| **Frontend Framework** | **React 19** (`^19.2.4`)               | Modern React hooks, transitions, and concurrent rendering   |
| **Full-Stack / SSR**   | **TanStack Start** (`^1.158.3`)        | SSR Server Functions (`createServerFn`) protecting API keys |
| **Client Routing**     | **TanStack Router** (`^1.158.1`)       | Type-safe, file-based routing and navigation                |
| **Styling & Design**   | **Tailwind CSS v4** (`^4.1.18`)        | Native CSS variables, glassmorphism, responsive grids       |
| **Build Tooling**      | **Vite 7** (`^7.3.1`) & **TypeScript** | Lightning-fast HMR and strict type validation               |
| **Deployment**         | **Vercel** / Node / Bun                | Edge SSR & static asset streaming                           |

```
trendsprout/
├── src/
│   ├── lib/
│   │   ├── auth.ts          # Session management & instant demo workspace helpers
│   │   ├── database.ts      # Planned Supabase relational schema & typing
│   │   ├── generate.ts      # Unified server function & multi-provider generation engine
│   │   └── prompts.ts       # Algorithmic TikTok hook & hashtag prompt engineering
│   ├── routes/
│   │   ├── __root.tsx       # Root document shell, SEO metadata & favicon links
│   │   ├── index.tsx        # High-conversion SaaS landing page (hero, features, pricing)
│   │   ├── dashboard.tsx    # AI Studio workspace with copy tools, persistence & export
│   │   ├── login.tsx        # Authentication page with 1-click demo workspace
│   │   └── signup.tsx       # Creator onboarding flow
│   ├── styles/
│   │   └── app.css          # Tailwind CSS v4 entrypoint
│   ├── routeTree.gen.ts     # Auto-generated type-safe router tree
│   └── router.tsx           # Router instantiation
├── public/                  # Favicons, webmanifest, and static assets
├── vite.config.ts           # Vite, React, Tailwind v4, & TanStack Start config
└── package.json             # Scripts & dependencies
```

---

## 🚀 Quickstart & Local Development

### Prerequisites

- Node.js (v18+) or Bun

### 1. Clone the repository

```bash
git clone https://github.com/OxDurgeshxO/trendsprout.git
cd trendsprout
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Optional: Enable Live AI Generation

Create a `.env` file in the project root:

```env
# Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key

# Or OpenAI API Key
OPENAI_API_KEY=your_openai_api_key
```

_(If no API key is set, TrendSprout seamlessly utilizes its deterministic Showcase Engine with complete preset coverage)._

### 5. Typecheck and Production Build

```bash
npm run typecheck
npm run build
```

---

## 📄 License

MIT License. Created by [Durgesh](https://github.com/OxDurgeshxO).
