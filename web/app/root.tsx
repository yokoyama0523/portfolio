import "@fontsource-variable/noto-sans-jp";
import "@fontsource-variable/outfit";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { Analytics } from "./components/Analytics";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon-48.png", sizes: "48x48", type: "image/png" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white font-jp text-[14px] leading-[1.9] tracking-[0.03em] text-text antialiased [word-break:auto-phrase] [text-wrap:pretty]">
        {children}
        <Analytics />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <title>{notFound ? "ページが見つかりません" : "エラー"}</title>
      <meta name="robots" content="noindex" />
      <div>
        <p className="font-latin text-[64px] font-light leading-none text-[#333]">
          {notFound ? "404" : "Error"}
        </p>
        <p className="mt-6">
          {notFound ? "ページが見つかりません。" : "ページを表示できませんでした。"}
        </p>
        <a href="/" className="mt-10 inline-block underline underline-offset-4">
          トップへ戻る
        </a>
      </div>
    </main>
  );
}
