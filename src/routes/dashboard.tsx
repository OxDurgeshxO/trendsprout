import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const [activeTab, setActiveTab] = useState<"captions" | "concepts" | "hashtags">("captions");

  function handleGenerate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!niche.trim()) return;
    setLoading(true);
    setResult(null);

    // Simulate AI generation delay
    setTimeout(() => {
      setResult(mockResult);
      setLoading(false);
    }, 1800);
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Dashboard header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-xs font-bold text-white">
              S
            </span>
            <span className="text-sm font-bold tracking-tight text-gray-900">
              TrendSprout
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Free trial
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-xs font-bold text-white shadow-sm">
              Y
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
        {/* Page heading */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Generate content
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your niche and get instant AI content tailored for TikTok.
          </p>
        </div>

        {/* Input card */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleGenerate} className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="niche" className="mb-1.5 block text-sm font-medium text-gray-700">
                What's your niche?
              </label>
              <input
                id="niche"
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. sustainable fashion, vegan cooking, indie game dev..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                disabled={loading}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || !niche.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 sm:w-auto"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          </form>

          {/* Quick niche buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Beauty",
              "Fitness",
              "Gaming",
              "Travel",
              "Food",
              "Tech",
            ].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setNiche(n);
                  setResult(null);
                }}
                className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Results / empty state */}
        {!result && !loading && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
              🌱
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Your content will appear here
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              Enter your niche above and hit generate. TrendSprout will craft
              captions, video concepts, and hashtags made for your audience.
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
            <div className="mb-3 h-3 w-full rounded bg-gray-100" />
            <div className="mb-3 h-3 w-5/6 rounded bg-gray-100" />
            <div className="h-3 w-4/6 rounded bg-gray-100" />
          </div>
        )}

        {/* Result display */}
        {result && !loading && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {([
                { key: "captions", label: "Captions", icon: "✍️" },
                { key: "concepts", label: "Video Concepts", icon: "🎬" },
                { key: "hashtags", label: "Hashtags", icon: "#️⃣" },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all sm:flex-none sm:px-6 ${
                    activeTab === tab.key
                      ? "border-b-2 border-emerald-500 text-emerald-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="hidden sm:inline">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6 sm:p-8">
              {activeTab === "captions" && (
                <div className="space-y-4">
                  {result.captions.map((c, i) => (
                    <div
                      key={i}
                      className="group relative rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-emerald-100 hover:bg-emerald-50/30"
                    >
                      <p className="text-sm leading-relaxed text-gray-800">
                        {c}
                      </p>
                      <button
                        onClick={() => navigator.clipboard.writeText(c)}
                        className="absolute right-3 top-3 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-500 opacity-0 shadow-sm transition-all hover:text-emerald-600 group-hover:opacity-100"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "concepts" && (
                <div className="space-y-5">
                  {result.concepts.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-emerald-100 hover:bg-emerald-50/30"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          Concept {i + 1}
                        </span>
                        {c.trending && (
                          <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
                            🔥 Trending
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {c.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {c.description}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        <span className="font-medium">Hook:</span> {c.hook}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "hashtags" && (
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {result.hashtags.all.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                      <p className="text-xs font-medium text-blue-600">Viral</p>
                      <p className="mt-1 text-lg font-bold text-blue-700">
                        {result.hashtags.breakdown.viral}
                      </p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3 text-center">
                      <p className="text-xs font-medium text-emerald-600">
                        Niche
                      </p>
                      <p className="mt-1 text-lg font-bold text-emerald-700">
                        {result.hashtags.breakdown.niche}
                      </p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3 text-center">
                      <p className="text-xs font-medium text-amber-600">
                        Trending
                      </p>
                      <p className="mt-1 text-lg font-bold text-amber-700">
                        {result.hashtags.breakdown.trending}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4">
              <p className="text-center text-xs text-gray-400">
                Not quite right?{" "}
                <button
                  onClick={handleGenerate}
                  className="font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Regenerate
                </button>{" "}
                for fresh results.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock data for the mockup
const mockResult = {
  captions: [
    "Your skincare routine is lying to you. 🚫 Here's why less is actually more (and the 3 products I ditched for good) 👇 #sustainablebeauty",
    "I tried 10 'clean' beauty brands so you don't have to. 🌿 The winner isn't what you'd expect. Full breakdown in the caption 🧵",
    "POV: You just realized your moisturizer has 40 ingredients you can't pronounce. 😳 Here's how I switched to 5-ingredient skincare 🌱",
    "The $5 drugstore find that outperformed my $80 serum. 💰 Not sponsored, just honest. Save this for your next restock 🛒",
  ],
  concepts: [
    {
      trending: true,
      title: "The 'Before & After' Sustainability Challenge",
      description:
        "Show your wardrobe 6 months ago vs now after switching to sustainable fashion. Each item tells a mini-story of why you made the swap.",
      hook: "My closet used to be a fast-fashion nightmare. Here's what changed.",
    },
    {
      trending: false,
      title: 'Day in the Life: "Sustainable" Edition',
      description:
        "Aesthetic day-in-the-life reel showing small eco-friendly choices — from morning routine to shopping tips. Caption lists affordable sustainable swaps.",
      hook: "Being sustainable doesn't have to be expensive (or hard).",
    },
    {
      trending: false,
      title: "Reacting to My Old Outfits",
      description:
        "Fun, relatable reaction video looking back at past fashion choices. End with tips on how to build a timeless, sustainable wardrobe now.",
      hook: "Me in 2022 vs me in 2024. The glow-up is sustainable.",
    },
  ],
  hashtags: {
    all: [
      "sustainablefashion",
      "ecofriendly",
      "slowfashion",
      "sustainability",
      "fashiontips",
      "wardrobeessentials",
      "sustainableliving",
      "thrifted",
      "ethicalfashion",
      "fashionhacks",
      "sustainablebrands",
      "capsulewardrobe",
      "secondhand",
      "ecoconscious",
      "minimaliststyle",
      "outfitinspiration",
      "fashionreform",
      "greenfashion",
      "savetheplanet",
      "slowliving",
    ],
    breakdown: {
      viral: 4,
      niche: 11,
      trending: 5,
    },
  },
};