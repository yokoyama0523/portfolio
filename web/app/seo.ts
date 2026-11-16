import type { MetaDescriptor } from "react-router";
import { site } from "./site";

type Page = { title: string; description: string; path: string; graph: Record<string, unknown>[] };

export const ids = { website: `${site.url}/#website`, person: `${site.url}/#person` };

export const pageMeta = ({ title, description, path, graph }: Page): MetaDescriptor[] => {
  const url = `${site.url}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.brand },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: `${site.url}/og/top.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "ja_JP" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "author", content: site.name },
    { "script:ld+json": { "@context": "https://schema.org", "@graph": graph } },
  ];
};

export const breadcrumb = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${site.url}${path}`,
  })),
});
