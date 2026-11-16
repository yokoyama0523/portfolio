import { samplePath } from "~/samples/catalog";

const home = samplePath("ec");

export const paths = {
  home,
  looks: `${home}#looks`,
  list: (query = "") => `${home}list/${query ? `?${query}` : ""}`,
  item: (id: string, color?: string) =>
    `${home}item/${id}/${color ? `?c=${encodeURIComponent(color)}` : ""}`,
  cart: `${home}cart/`,
  checkout: `${home}checkout/`,
  account: (hash = "") => `${home}account/${hash ? `#${hash}` : ""}`,
  guide: (hash = "") => `${home}guide/${hash ? `#${hash}` : ""}`,
  admin: `${home}admin/`,
};
