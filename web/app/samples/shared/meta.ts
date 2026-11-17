import { site } from "~/config";
import { sampleById } from "~/samples/catalog";
import { buildMeta } from "~/shared/meta";
import { specialty } from "~/site/data/copy";
import { sampleCopy } from "./copy";

type SamplePage = { title: string; description?: string; slug?: string; noindex?: boolean };

export const sampleMeta = (id: string, { title, description, slug = "", noindex }: SamplePage) => {
  const sample = sampleById(id);
  const given = title.split("｜");
  const parts =
    given.length > 1 && given[given.length - 1] === sample.name ? given.reverse() : given;
  const lead =
    description ?? sampleCopy.pageDescription(parts[0], sample.kind, parts[parts.length - 1]);
  return buildMeta({
    title: [site.brand, specialty, ...parts].join("｜"),
    description: `${lead.replace(/。$/, "")}。${sampleCopy.disclaimer(sampleCopy.maker(site.brand, site.name), sample.kind)}`,
    path: `${sample.path}${slug}`,
    image: sample.og,
    noindex,
  });
};
