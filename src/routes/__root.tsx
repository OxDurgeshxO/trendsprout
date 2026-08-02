import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TrendSprout — AI-Powered TikTok Content Creation" },
      {
        name: "description",
        content:
          "Generate high-engagement TikTok captions, video concepts, and optimized hashtag sets tailored to your niche. Never face creative block again.",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#6366f1" },
      { name: "application-name", content: "TrendSprout" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TrendSprout" },
      {
        property: "og:title",
        content: "TrendSprout — AI-Powered TikTok Content Creation",
      },
      {
        property: "og:description",
        content:
          "Generate high-engagement TikTok captions, video concepts, and optimized hashtag sets tailored to your niche.",
      },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "TrendSprout — AI-Powered TikTok Content Creation",
      },
      {
        name: "twitter:description",
        content:
          "Generate high-engagement TikTok captions, video concepts, and optimized hashtag sets tailored to your niche.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Page not found</p>
        <a
          href="/"
          className="mt-4 inline-block text-indigo-600 hover:underline"
        >
          Go home
        </a>
      </div>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}