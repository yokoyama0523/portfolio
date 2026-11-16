import { site } from "~/config";
import { buildMeta } from "~/shared/meta";

type Page = { title: string; description: string; path: string; graph: Record<string, unknown>[] };

export const ids = { website: `${site.url}/#website`, person: `${site.url}/#person` };

export const pageMeta = (page: Page) => buildMeta({ ...page, image: site.ogImage });

export const breadcrumb = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${site.url}${path}`,
  })),
});
