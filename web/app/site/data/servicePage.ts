import { site } from "~/config";
import { crumbHome } from "./copy";

export const servicePageCopy = {
  title: { en: "Service", jp: "サービス" },
  crumbs: [crumbHome, ["サービス", site.paths.service]] as [string, string][],
  terms: { items: "対応内容", works: "制作事例" },
};
