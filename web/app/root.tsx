import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import { site } from "./site";
import "./app.css";

const FONTS = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Noto+Sans+JP:wght@400;500;700&display=swap";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "preload", as: "style", href: FONTS },
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
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="${FONTS}";document.head.appendChild(l)})()` }} />
        <noscript>
          <link rel="stylesheet" href={FONTS} />
        </noscript>
        {import.meta.env.PROD && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.ga}');addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${site.ga}';document.head.appendChild(s)},1200)});`,
            }}
          />
        )}
      </head>
      <body className="bg-white font-jp text-[14px] leading-[1.9] tracking-[0.03em] text-text antialiased [word-break:auto-phrase] [text-wrap:pretty]">
        {children}
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
        <p className="font-latin text-[64px] font-light leading-none text-[#333]">{notFound ? "404" : "Error"}</p>
        <p className="mt-6">{notFound ? "ページが見つかりません。" : "ページを表示できませんでした。"}</p>
        <a href="/" className="mt-10 inline-block underline underline-offset-4">
          トップへ戻る
        </a>
      </div>
    </main>
  );
}
