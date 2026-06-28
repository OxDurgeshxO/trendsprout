import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-dvh bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-lg font-bold text-white">
              S
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              TrendSprout
            </span>
          </div>
          <nav className="hidden items-center gap-8 sm:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Pricing
            </a>
          </nav>
          <Link
            to="/signup"
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-md active:scale-95"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white" />
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            For TikTok creators &amp; brands
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Never stare at a blank{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              caption box
            </span>{" "}
            again.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            TrendSprout generates high-engagement captions, video concepts, and
            optimized hashtag sets tailored to your specific niche — so you can
            post consistently and grow faster.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/signup"
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-xl active:scale-95 sm:w-auto"
            >
              Try it free
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 sm:w-auto"
            >
              See how it works
            </a>
          </div>
          {/* Social proof */}
          <div className="mt-16 flex flex-col items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-emerald-600 text-xs font-bold text-white shadow-sm"
                >
                  {["JD", "MK", "AL", "TR"][i - 1]}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">500+</span> creators
              already using TrendSprout
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Features
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to{" "}
              <span className="text-emerald-600">post with confidence</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-600">
              Stop guessing what works. TrendSprout uses AI trained on
              high-performing TikTok content to give you an edge.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition-colors group-hover:bg-emerald-100">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              How it works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three taps to your next viral post
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-bold text-white shadow-lg">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+3rem)] top-8 hidden h-0.5 w-[calc(100%-6rem)] bg-emerald-200 md:block" />
                )}
                <h3 className="text-xl font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, flat-rate pricing
            </h2>
          </div>
          <div className="mx-auto max-w-sm">
            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white p-8 shadow-xl">
              <div className="absolute right-0 top-0 rounded-bl-xl bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white">
                Best value
              </div>
              <div className="mb-2 text-sm font-semibold text-emerald-600">
                TrendSprout Pro
              </div>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-gray-900">
                  $9
                </span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                {[
                  "Unlimited AI generations",
                  "Niche-optimized captions",
                  "Video concept ideas",
                  "Hashtag sets (up to 30 tags)",
                  "Trending topic suggestions",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg active:scale-95"
              >
                Start your 7-day free trial
              </Link>
              <p className="mt-3 text-center text-xs text-gray-400">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to grow on TikTok?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-emerald-100">
            Join 500+ creators who never run out of content ideas. Start your
            free trial today.
          </p>
          <div className="mt-10">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl active:scale-95"
            >
              Get started free
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-xs font-bold text-white">
              S
            </span>
            <span className="text-sm font-semibold text-gray-900">
              TrendSprout
            </span>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} TrendSprout. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "✍️",
    title: "Smart Captions",
    description:
      "Generate scroll-stopping captions written for your niche and audience. Hook viewers in the first 2 seconds.",
  },
  {
    icon: "🎬",
    title: "Video Concepts",
    description:
      "Get fresh video ideas, hooks, and structures matched to trending formats in your niche — never run out of content.",
  },
  {
    icon: "#️⃣",
    title: "Hashtag Sets",
    description:
      "Receive optimized hashtag clusters that balance reach and relevance. Mix of viral, niche, and trending tags.",
  },
  {
    icon: "🎯",
    title: "Niche Targeting",
    description:
      "Tell us your niche once. Every generation is tailored to your specific audience — beauty, fitness, tech, travel, and more.",
  },
  {
    icon: "⚡",
    title: "Post Faster",
    description:
      "Go from idea to publish in minutes instead of hours. Built for creators who want to post daily without burnout.",
  },
  {
    icon: "📈",
    title: "Trend Aligned",
    description:
      "Our AI is trained on high-performing TikTok content patterns. Get suggestions that match what's working right now.",
  },
];

const steps = [
  {
    title: "Enter your niche",
    description:
      "Tell us what you create about — beauty, fitness, gaming, travel, or anything else. Be as specific as you like.",
  },
  {
    title: "AI generates your content",
    description:
      "Get a complete content set: a catchy caption, a video concept with hook, and a curated list of hashtags.",
  },
  {
    title: "Post and grow",
    description:
      "Use the content as-is or remix it. Post consistently and watch your engagement grow. Regenerate anytime.",
  },
];