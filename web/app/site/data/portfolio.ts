import { site } from "~/config";
import { crumbHome } from "./copy";

export const portfolioCopy = {
  title: { en: "Works", jp: "制作事例" },
  crumbs: [crumbHome, ["制作事例", site.paths.works]] as [string, string][],
  filterLabel: "カテゴリで絞り込む",
  filterTitle: "カテゴリ",
  all: "すべて",
  shotAlt: (name: string, industry: string) => `${name}（${industry}）のトップページ`,
  caseName: (name: string, industry: string) => `${name}（${industry}）`,
};
