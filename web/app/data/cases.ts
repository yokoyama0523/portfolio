export type Case = {
  id: string;
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
  design: { fonts: string; palette: string[] };
  media: { thumb: string; desktop: string; mobile: string };
};

const modules = import.meta.glob<Case>("../../../cases/*/case.json", { eager: true, import: "default" });

export const cases: Case[] = Object.values(modules).sort((a, b) => a.order - b.order);

export const caseUrl = (c: Case) => `/portfolio/${c.id}/`;
export const caseAsset = (c: Case, key: keyof Case["media"]) => `${caseUrl(c)}${c.media[key].replace(/\.png$/, ".jpg")}`;
export const caseSmall = (c: Case, key: "desktop" | "thumb") => caseAsset(c, key).replace(/\.jpg$/, key === "desktop" ? "-720.jpg" : "-480.jpg");

export const stats = {
  industries: cases.length,
  forms: cases.filter((c) => c.has_flow).length,
};
