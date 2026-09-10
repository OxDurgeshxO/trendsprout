import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { setSession, createDemoSession } from "~/lib/auth";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setSession({
      user: {
        id: "usr_" + Date.now().toString(36),
        email: email.trim(),
        name: name.trim(),
      },
    });
    navigate({ to: "/dashboard", replace: true });
  };

  const handleDemoSignup = () => {
    createDemoSession("New Creator", "creator@trendsprout.ai");
    navigate({ to: "/dashboard", replace: true });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <nav className="flex items-center justify-between px-6 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-lg font-bold text-white shadow-md shadow-emerald-500/20">
            S
          </span>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            TrendSprout
          </span>
        </Link>
      </nav>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Start creating
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            $9/month — cancel anytime. No credit card required.
          </p>

          <button
            type="button"
            onClick={handleDemoSignup}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-[0.98]"
          >
            <span>🚀</span> Instant Demo Workspace
          </button>
          <p className="mt-2 text-center text-xs text-emerald-700 font-medium">
            Interactive Showcase Mode • Direct studio access
          </p>

          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="absolute bg-white px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Or sign up with email
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="At least 8 characters"
                minLength={8}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-[0.98]"
            >
              Create account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Log in
            </Link>
          </p>
          <p className="mt-4 text-center text-xs text-gray-400">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
