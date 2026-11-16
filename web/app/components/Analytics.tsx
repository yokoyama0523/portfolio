import { useEffect } from "react";
import ReactGA from "react-ga4";
import { site } from "~/site";

function start() {
  window.setTimeout(() => ReactGA.initialize(site.analytics.id), site.analytics.delayMs);
}

export function Analytics() {
  useEffect(() => {
    if (!import.meta.env.PROD || ReactGA.isInitialized) return;
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);
  return null;
}
