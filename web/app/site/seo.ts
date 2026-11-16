import { site } from "~/config";
import { absoluteUrl, buildMeta } from "~/shared/meta";

type Page = { title: string; description: string; path: string; graph: Record<string, unknown>[] };

export const ids = {
  website: absoluteUrl(`${site.paths.home}#website`),
  person: absoluteUrl(`${site.paths.home}#person`),
};

export const pageMeta = (page: Page) => buildMeta({ ...page, image: site.ogImage });

export const breadcrumb = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});
