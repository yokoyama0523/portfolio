import { site } from "~/config";
import { sampleById } from "~/samples/catalog";
import { buildMeta } from "~/shared/meta";
import { sampleCopy } from "./copy";

type SamplePage = { title: string; description?: string; slug?: string; noindex?: boolean };

export const sampleMeta = (id: string, { title, description, slug = "", noindex }: SamplePage) => {
  const sample = sampleById(id);
  const parts = title.split("｜");
  const lead =
    description ?? sampleCopy.pageDescription(parts[parts.length - 1], sample.kind, parts[0]);
  return buildMeta({
    title: `${site.brand}｜${title}｜${sampleCopy.titleSuffix}`,
    description: `${lead.replace(/。$/, "")}。${sampleCopy.disclaimer(site.name, sample.kind)}`,
    path: `${sample.path}${slug}`,
    image: sample.og,
    noindex,
  });
};
