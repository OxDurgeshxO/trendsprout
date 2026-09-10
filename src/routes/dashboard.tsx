import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  generateContent,
  type ContentSet,
  type GenerateRequest,
} from "~/lib/generate";
import { getSession, clearSession, createDemoSession } from "~/lib/auth";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const SAVED_RESULTS_KEY = "trendsprout_saved_results";
const SAVED_NICHE_KEY = "trendsprout_saved_niche";

function Dashboard() {
  const navigate = useNavigate();
  const [session, setLocalSession] = useState(() => getSession());

  // ─── Auth check & Local Storage Hydration ───
  useEffect(() => {
    let current = getSession();
    if (!current) {
      // Auto-initialize demo session if none found for easy demo evaluation
      current = createDemoSession("Creator Studio", "creator@trendsprout.ai");
    }
    setLocalSession(current);

    // Restore previous generation history if available
    try {
      const savedNiche = localStorage.getItem(SAVED_NICHE_KEY);
      if (savedNiche) setNiche(savedNiche);

      const savedResults = localStorage.getItem(SAVED_RESULTS_KEY);
      if (savedResults) {
        const parsed = JSON.parse(savedResults) as ContentSet[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResults(parsed);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // ─── Form state ───
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("educational");

  // ─── Async state ───
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ContentSet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [providerTag, setProviderTag] = useState<string | null>(null);

  // ─── Generate handler ───
  const handleGenerate = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!niche.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const payload: GenerateRequest = {
          niche: niche.trim(),
          audience: audience.trim() || undefined,
          tone: tone || undefined,
          count: 2,
        };

        const response = await generateContent({ data: payload });

        if (!response.success) {
          throw new Error(response.error ?? "Generation failed");
        }

        setResults(response.data);
        setProviderTag(response.provider ?? "showcase-engine");

        // Persist to local storage so page refresh retains work
        try {
          localStorage.setItem(SAVED_NICHE_KEY, niche.trim());
          localStorage.setItem(
            SAVED_RESULTS_KEY,
            JSON.stringify(response.data),
          );
        } catch {
          // Ignore write failures
        }
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [niche, audience, tone],
  );

  // ─── Clear / Reset History ───
  const handleClearHistory = () => {
    setResults(null);
    setProviderTag(null);
    try {
      localStorage.removeItem(SAVED_RESULTS_KEY);
    } catch {
      // Ignore
    }
  };

  // ─── Bulk Export All Sets as Markdown ───
  const handleExportAllMarkdown = () => {
    if (!results || results.length === 0) return;
    const md = results
      .map((s) => formatSetMarkdown(s, niche || "TikTok"))
      .join("\n\n---\n\n");
    downloadFile(
      md,
      `trendsprout-${(niche || "content").toLowerCase().replace(/\s+/g, "-")}-scripts.md`,
    );
  };

  // ─── Session info ───
  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "CS";

  // ─── Logout ───
  const handleLogout = () => {
    clearSession();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="min-h-dvh bg-slate-50/60 text-slate-800">
      {/* Dashboard header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white shadow-md shadow-emerald-500/20">
                S
              </span>
              <span className="text-base font-bold tracking-tight text-gray-900">
                TrendSprout
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-3 py-0.5 text-[11px] font-medium text-emerald-800 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Portfolio Showcase • React 19 + TanStack Start
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium text-gray-500 md:inline">
              {session?.user?.email ?? "creator@trendsprout.ai"}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
            >
              Log out
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-xs font-bold text-white shadow-sm ring-2 ring-emerald-500/20">
              {initials}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        {/* Page heading */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              AI Content Studio
            </div>
            <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Generate viral TikTok content
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Enter your niche to generate coordinated sets: retention hooks,
              act breakdowns, captions & tiered hashtags.
            </p>
          </div>

          {results && results.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportAllMarkdown}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 shadow-sm transition-all hover:bg-emerald-100/80 active:scale-95"
              >
                <span>📥</span> Export All (.md)
              </button>
              <button
                onClick={handleClearHistory}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-800"
                title="Clear saved results from browser storage"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Input card */}
        <div className="mb-8 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="niche"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Your niche <span className="text-red-400">*</span>
                </label>
                <input
                  id="niche"
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Sustainable Fashion, Fitness, Tech"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="audience"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Target audience
                </label>
                <input
                  id="audience"
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Gen Z creators, working professionals"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="tone"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Tone
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  disabled={loading}
                >
                  <option value="educational">Educational</option>
                  <option value="funny">Funny</option>
                  <option value="edgy">Edgy</option>
                  <option value="professional">Professional</option>
                  <option value="motivational">Motivational</option>
                  <option value="relatable">Relatable</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-1 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-400 mr-1">
                  Presets:
                </span>
                {["Fashion", "Fitness", "Gaming", "Travel", "Food", "Tech"].map(
                  (n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setNiche(n);
                        setError(null);
                      }}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                        niche.toLowerCase() === n.toLowerCase()
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                          : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}
              </div>
              <button
                type="submit"
                disabled={loading || !niche.trim()}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3 font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 sm:w-auto"
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
                  <>
                    <span>✨</span> Generate Content
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-lg">⚠️</span>
              <div>
                <p className="font-semibold">Generation error</p>
                <p className="mt-1 text-xs text-red-600">{error}</p>
                <button
                  onClick={() => handleGenerate()}
                  className="mt-2 text-xs font-semibold text-red-700 underline hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!results && !loading && !error && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 p-12 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/70 text-3xl shadow-inner">
              🌱
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Your generated content sets will appear here
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
              Select one of the presets or type any custom niche to generate
              coordinated scripts, hooks, captions, and hashtag matrices.
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 h-5 w-48 rounded bg-gray-200" />
                <div className="mb-3 h-3 w-full rounded bg-gray-100" />
                <div className="mb-3 h-3 w-5/6 rounded bg-gray-100" />
                <div className="h-3 w-4/6 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Results: coordinated content sets */}
        {results && !loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Generated {results.length} Sets for &ldquo;{niche}&rdquo;
              </span>
              {providerTag && (
                <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                  Engine:{" "}
                  {providerTag === "live"
                    ? "✨ Live Model"
                    : "⚡ Showcase Engine"}
                </span>
              )}
            </div>

            {results.map((set) => (
              <ContentSetCard
                key={set.content_set_id}
                set={set}
                niche={niche}
              />
            ))}

            <div className="rounded-xl border border-gray-200 bg-white px-6 py-4 text-center shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                Data persists in local storage across browser refreshes.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportAllMarkdown}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Download Markdown (.md)
                </button>
                <button
                  onClick={() => handleGenerate()}
                  className="rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-600"
                >
                  Regenerate ideas
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Content Set Card ───

function ContentSetCard({ set, niche }: { set: ContentSet; niche: string }) {
  const [expanded, setExpanded] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const c = set.video_concept;

  const copyText = (text: string, setCopiedFn: (val: boolean) => void) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedFn(true);
      setTimeout(() => setCopiedFn(false), 2000);
    } catch (e) {
      console.warn("Failed to copy text:", e);
    }
  };

  const handleDownloadSingle = () => {
    const md = formatSetMarkdown(set, niche);
    downloadFile(
      md,
      `set-${set.content_set_id}-${c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`,
    );
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-slate-50 to-emerald-50/30 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white shadow-sm">
              #{set.content_set_id}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              {c.structure_type.replace(/_/g, " ")}
            </span>
            <button
              onClick={handleDownloadSingle}
              className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 shadow-sm"
              title="Download script as Markdown file"
            >
              {downloaded ? "✓ Saved" : "📥 Save .md"}
            </button>
          </div>
        </div>
      </div>

      {/* Body: 3-column grid */}
      <div className="grid divide-y divide-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">
        {/* Caption */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">✍️</span>
                <span className="text-sm font-bold text-gray-900">Caption</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
              {set.caption.caption}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-200/50">
                {set.caption.hook_style}
              </span>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 border border-amber-200/50">
                {set.caption.engagement_tactic}
              </span>
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700 border border-purple-200/50">
                {set.caption.tone}
              </span>
            </div>
          </div>
          <button
            onClick={() => copyText(set.caption.caption, setCopiedCaption)}
            className={`mt-4 w-full rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 ${
              copiedCaption
                ? "border-emerald-400 bg-emerald-500 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700"
            }`}
          >
            {copiedCaption ? (
              <>
                <span>✓</span> Copied Caption!
              </>
            ) : (
              <>
                <span>📋</span> Copy Caption
              </>
            )}
          </button>
        </div>

        {/* Video Concept */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">🎬</span>
              <span className="text-sm font-bold text-gray-900">
                Video Concept
              </span>
            </div>

            {/* Hook */}
            <div className="mb-3 rounded-xl bg-rose-50/80 p-3.5 border border-rose-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                Hook Strategy
              </p>
              <p className="mt-1 text-xs font-medium text-gray-800">
                {c.hook.description}
              </p>
              <p className="mt-1.5 text-xs text-rose-600 font-semibold">
                Overlay: &ldquo;{c.hook.text_overlay}&rdquo;
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                Audio start: &ldquo;{c.hook.first_3_words_audio}&rdquo;
              </p>
            </div>

            {/* Acts */}
            <div className="space-y-1.5">
              {c.acts.slice(0, expanded ? c.acts.length : 2).map((act, i) => (
                <div key={i} className="flex gap-2 text-xs items-start">
                  <span className="w-14 flex-shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 text-center font-bold text-gray-600 text-[10px]">
                    {act.time}
                  </span>
                  <span className="text-gray-600 leading-snug">
                    {act.content}
                  </span>
                </div>
              ))}
              {c.acts.length > 2 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 mt-1"
                >
                  {expanded ? "Show less" : `+${c.acts.length - 2} more scenes`}
                </button>
              )}
            </div>

            {/* Audio + Format */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div>
                <span className="font-semibold text-gray-700">Audio:</span>{" "}
                {c.audio_suggestion.length > 35
                  ? c.audio_suggestion.slice(0, 35) + "…"
                  : c.audio_suggestion}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Length:</span>{" "}
                {c.format_tips.ideal_length}
              </div>
            </div>

            {/* Engagement scores */}
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {(
                [
                  ["Watch", c.predicted_engagement_scores.watch_time_retention],
                  ["Share", c.predicted_engagement_scores.shareability],
                  ["Comment", c.predicted_engagement_scores.comment_bait],
                  ["Save", c.predicted_engagement_scores.save_likelihood],
                ] as const
              ).map(([label, score]) => (
                <div
                  key={label}
                  className="rounded-lg bg-emerald-50/60 border border-emerald-100 p-1.5 text-center"
                >
                  <p className="text-[10px] font-medium text-emerald-700">
                    {label}
                  </p>
                  <p className="text-xs font-extrabold text-emerald-900">
                    {score}
                    <span className="text-[9px] text-emerald-600">/10</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hashtags */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">#️⃣</span>
                <span className="text-sm font-bold text-gray-900">
                  Hashtags
                </span>
              </div>
              <span className="rounded-full bg-emerald-100/70 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                {set.hashtags.reach_quality}
              </span>
            </div>

            <div className="space-y-3">
              {(
                [
                  [
                    "High volume",
                    set.hashtags.tier_breakdown.high_volume,
                    "bg-blue-50 text-blue-700 border-blue-200/70",
                  ],
                  [
                    "Mid tier",
                    set.hashtags.tier_breakdown.mid_tier,
                    "bg-emerald-50 text-emerald-700 border-emerald-200/70",
                  ],
                  [
                    "Niche",
                    set.hashtags.tier_breakdown.niche,
                    "bg-amber-50 text-amber-700 border-amber-200/70",
                  ],
                ] as const
              ).map(([label, tags, styles]) => (
                <div key={label}>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${styles}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-semibold text-gray-500 hover:text-gray-700">
                Why this hashtag mix?
              </summary>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500 bg-slate-50 p-2.5 rounded-lg">
                {set.hashtags.rationale}
              </p>
            </details>
          </div>

          <button
            onClick={() =>
              copyText(set.hashtags.hashtags.join(" "), setCopiedHashtags)
            }
            className={`mt-4 w-full rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 ${
              copiedHashtags
                ? "border-emerald-400 bg-emerald-500 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700"
            }`}
          >
            {copiedHashtags ? (
              <>
                <span>✓</span> Copied Hashtags!
              </>
            ) : (
              <>
                <span>🏷️</span> Copy All Hashtags
              </>
            )}
          </button>
        </div>
      </div>

      {/* Coherence note */}
      <div className="border-t border-gray-100 bg-slate-50/70 px-6 py-2.5">
        <p className="text-center text-xs text-gray-500">
          <span className="font-bold text-gray-700">Coherence Note:</span>{" "}
          {set.coherence_note}
        </p>
      </div>
    </div>
  );
}

// ─── Markdown File Formatter & Downloader ───

function formatSetMarkdown(set: ContentSet, niche: string): string {
  const c = set.video_concept;
  return `# TrendSprout Content Set #${set.content_set_id} — ${c.title}
**Niche**: ${niche} | **Format**: ${c.structure_type.replace(/_/g, " ")}

## 1. Video Concept & Hook Strategy
- **Hook Visual/Audio**: ${c.hook.description}
- **On-Screen Text Overlay**: "${c.hook.text_overlay}"
- **First 3 Words Audio**: "${c.hook.first_3_words_audio}"
- **Recommended Audio**: ${c.audio_suggestion}
- **Ideal Length**: ${c.format_tips.ideal_length} | **Pacing**: ${c.format_tips.pacing}

### ⏱️ Video Acts Breakdown
${c.acts.map((a) => `- \`${a.time}\`: ${a.content}`).join("\n")}

### 📊 Predicted Engagement Scores
- Watch Time Retention: ${c.predicted_engagement_scores.watch_time_retention}/10
- Shareability: ${c.predicted_engagement_scores.shareability}/10
- Comment Bait: ${c.predicted_engagement_scores.comment_bait}/10
- Save Likelihood: ${c.predicted_engagement_scores.save_likelihood}/10

---

## 2. Optimized Caption
\`\`\`
${set.caption.caption}
\`\`\`
- **Hook Style**: ${set.caption.hook_style}
- **Engagement Tactic**: ${set.caption.engagement_tactic}
- **Tone**: ${set.caption.tone}

---

## 3. Tiered Hashtag Mix (${set.hashtags.reach_quality} Reach)
${set.hashtags.hashtags.join(" ")}

- **High Volume (Discovery)**: ${set.hashtags.tier_breakdown.high_volume.join(" ")}
- **Mid Tier (Targeted)**: ${set.hashtags.tier_breakdown.mid_tier.join(" ")}
- **Niche Specific (Community)**: ${set.hashtags.tier_breakdown.niche.join(" ")}

*Strategy Rationale*: ${set.hashtags.rationale}

*Coherence Note*: ${set.coherence_note}
`;
}

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
