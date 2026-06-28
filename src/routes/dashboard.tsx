import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Dashboard Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-indigo-600">
            TrendSprout
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Free Trial
            </span>
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 sm:w-56">
          <nav className="space-y-1">
            {[
              { label: "Generate", href: "#generate", active: true },
              { label: "History", href: "#history", active: false },
              { label: "Settings", href: "#settings", active: false },
              { label: "Billing", href: "#billing", active: false },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  item.active
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Generate Content
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Describe your niche and what you need — we'll handle the rest.
          </p>

          {/* Input Form */}
          <div className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="niche"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Niche
              </label>
              <input
                id="niche"
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                placeholder="e.g., fitness, cooking, tech reviews, fashion"
              />
            </div>
            <div>
              <label
                htmlFor="content-type"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Content Type
              </label>
              <select
                id="content-type"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option>Caption + Hashtags</option>
                <option>Video Concept</option>
                <option>Caption Only</option>
                <option>Hashtags Only</option>
                <option>All (Caption + Concept + Hashtags)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Topic / Inspiration (optional)
              </label>
              <textarea
                id="topic"
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Any specific topic or angle you want to cover?"
              />
            </div>
            <button
              type="button"
              className="rounded-full bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
              onClick={() => alert("AI generation coming soon — stay tuned!")}
            >
              Generate
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}