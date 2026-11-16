import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { site } from "./config";
import { Analytics } from "./shared/Analytics";
import { layoutCopy } from "./site/data/layout";

const SERVER_ERROR = 500;

export const links: Route.LinksFunction = () => [...site.icons];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
  const status = isRouteErrorResponse(error) ? error.status : SERVER_ERROR;
  return (
    <main>
      <title>{layoutCopy.error.title}</title>
      <meta name="robots" content="noindex" />
      <h1>{status}</h1>
      <p>{layoutCopy.error.text}</p>
      <a href={site.paths.home}>{layoutCopy.error.back}</a>
    </main>
  );
}
