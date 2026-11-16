import type { MetaDescriptor } from "react-router";
import { site } from "~/config";

export const ogImage = { width: 1200, height: 630 };

type Page = {
  title: string;
  description: string;
  path: string;
  image: string;
  noindex?: boolean;
  graph?: Record<string, unknown>[];
};

export const absoluteUrl = (path: string) => `${site.url}${path}`;

export const buildMeta = ({ title, description, path, image, noindex, graph }: Page) => {
  const url = absoluteUrl(path);
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.brand },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: absoluteUrl(image) },
    { property: "og:image:width", content: String(ogImage.width) },
    { property: "og:image:height", content: String(ogImage.height) },
    { property: "og:locale", content: "ja_JP" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "author", content: site.name },
  ];
  if (noindex) tags.push({ name: "robots", content: "noindex,follow" });
  if (graph) tags.push({ "script:ld+json": { "@context": "https://schema.org", "@graph": graph } });
  return tags;
};
