import { site } from "~/config";
import type { ImageAsset } from "./shared/images";

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

export type ResponsiveImage = ImageAsset & { srcSet: string };

export type Sample = SampleMeta & {
  path: string;
  og: string;
  media: { thumb: ResponsiveImage; desktop: ResponsiveImage; mobile: ResponsiveImage };
};

const metas = import.meta.glob<SampleMeta>("./*/case.json", { eager: true, import: "default" });

const thumbSrc = import.meta.glob<ImageAsset>("./*/media/thumb.jpg", {
  eager: true,
  import: "default",
  query: "?w=960&format=jpg&quality=72&progressive&as=metadata",
});
const thumbSet = import.meta.glob<string>("./*/media/thumb.jpg", {
  eager: true,
  import: "default",
  query: "?w=480;960&format=jpg&quality=72&progressive&as=srcset",
});
const desktopSrc = import.meta.glob<ImageAsset>("./*/media/desktop.png", {
  eager: true,
  import: "default",
  query: "?w=1200&format=jpg&quality=72&progressive&as=metadata",
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
const mobileSrc = import.meta.glob<ImageAsset>("./*/media/mobile.png", {
  eager: true,
  import: "default",
  query: "?w=420&format=jpg&quality=72&progressive&as=metadata",
});

const byId = <T>(files: Record<string, T>) =>
  Object.fromEntries(Object.entries(files).map(([file, value]) => [file.split("/")[1], value]));

const asset = ({ src, width, height }: ImageAsset): ImageAsset => ({ src, width, height });

const thumbs = { src: byId(thumbSrc), set: byId(thumbSet) };
const desktops = { src: byId(desktopSrc), set: byId(desktopSet) };
const mobiles = byId(mobileSrc);
const ogs = byId(ogSrc);

export const samplePath = (id: string) => `${site.paths.works}${id}/`;

export const samples: Sample[] = Object.values(metas)
  .sort((a, b) => a.order - b.order)
  .map((meta) => ({
    ...meta,
    path: samplePath(meta.id),
    og: ogs[meta.id],
    media: {
      thumb: { ...asset(thumbs.src[meta.id]), srcSet: thumbs.set[meta.id] },
      desktop: { ...asset(desktops.src[meta.id]), srcSet: desktops.set[meta.id] },
      mobile: {
        ...asset(mobiles[meta.id]),
        srcSet: `${mobiles[meta.id].src} ${mobiles[meta.id].width}w`,
      },
    },
  }));

export const sampleById = (id: string) => {
  const sample = samples.find((s) => s.id === id);
  if (!sample) throw new Error(`Unknown sample: ${id}`);
  return sample;
};
