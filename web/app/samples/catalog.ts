import { site } from "~/config";

export type SampleMeta = {
  id: string;
  kind: string;
  order: number;
  name: string;
  industry: string;
  industry_short: string;
  industry_en: string;
  category: string;
  summary: string;
  features: string[];
  tech: string[];
  has_flow: boolean;
  design: { fonts: string; palette: string[]; memo: string };
};

export type ResponsiveImage = { src: string; srcSet: string };

export type Sample = SampleMeta & {
  path: string;
  og: string;
  media: { thumb: ResponsiveImage; desktop: ResponsiveImage; mobile: ResponsiveImage };
};

const metas = import.meta.glob<SampleMeta>("./*/case.json", { eager: true, import: "default" });

const thumbSrc = import.meta.glob<string>("./*/media/thumb.jpg", {
  eager: true,
  import: "default",
  query: "?w=960&format=jpg&quality=72&progressive",
});
const thumbSet = import.meta.glob<string>("./*/media/thumb.jpg", {
  eager: true,
  import: "default",
  query: "?w=480;960&format=jpg&quality=72&progressive&as=srcset",
});
const desktopSrc = import.meta.glob<string>("./*/media/desktop.png", {
  eager: true,
  import: "default",
  query: "?w=1200&format=jpg&quality=72&progressive",
});
const desktopSet = import.meta.glob<string>("./*/media/desktop.png", {
  eager: true,
  import: "default",
  query: "?w=720;1200&format=jpg&quality=72&progressive&as=srcset",
});
const ogSrc = import.meta.glob<string>("./*/media/desktop.png", {
  eager: true,
  import: "default",
  query: "?w=1200&h=630&fit=cover&position=top&format=jpg&quality=82",
});
const mobileSrc = import.meta.glob<string>("./*/media/mobile.png", {
  eager: true,
  import: "default",
  query: "?w=420&format=jpg&quality=72&progressive",
});

const byId = (files: Record<string, string>) =>
  Object.fromEntries(Object.entries(files).map(([file, url]) => [file.split("/")[1], url]));

const thumbs = { src: byId(thumbSrc), set: byId(thumbSet) };
const desktops = { src: byId(desktopSrc), set: byId(desktopSet) };
const mobiles = byId(mobileSrc);
const ogs = byId(ogSrc);

export const samplePath = (id: string) => `${site.worksPath}${id}/`;

export const samples: Sample[] = Object.values(metas)
  .sort((a, b) => a.order - b.order)
  .map((meta) => ({
    ...meta,
    path: samplePath(meta.id),
    og: ogs[meta.id],
    media: {
      thumb: { src: thumbs.src[meta.id], srcSet: thumbs.set[meta.id] },
      desktop: { src: desktops.src[meta.id], srcSet: desktops.set[meta.id] },
      mobile: { src: mobiles[meta.id], srcSet: `${mobiles[meta.id]} 420w` },
    },
  }));

export const sampleById = (id: string) => {
  const sample = samples.find((s) => s.id === id);
  if (!sample) throw new Error(`Unknown sample: ${id}`);
  return sample;
};
