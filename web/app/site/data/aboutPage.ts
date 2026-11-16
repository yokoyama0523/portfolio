import { site } from "~/config";
import { crumbHome } from "./copy";

const address = {
  postalCode: "531-0071",
  region: "大阪府",
  locality: "大阪市北区",
  street: "中津1-15-26",
};

const addressText = `${address.region}${address.locality}${address.street}`;

const photo = (name: string, alt: string) => ({
  src: `/about/${name}-1600.jpg`,
  srcSet: `/about/${name}-800.jpg 800w, /about/${name}-1600.jpg 1600w`,
  alt,
});

export const aboutPageCopy = {
  title: { en: "About", jp: "運営者情報" },
  crumbs: [crumbHome, ["運営者情報", site.paths.about]] as [string, string][],
  description: (brand: string, name: string, lead: string) =>
    `${brand}（${name}）の運営者情報。${lead}`,
  tocLabel: "このページの目次",
  sections: [
    { id: "message", en: "Message" },
    { id: "business", en: "Business" },
    { id: "profile", en: "Profile" },
    { id: "access", en: "Access" },
  ],
  businessPhotos: {
    corporate: photo("web-cc1f2d4d", "モニターとキーボードを置いた仕事机"),
    ec: photo("ec-52b52a76", "ショッピングバッグを持った手"),
  } as Record<string, ReturnType<typeof photo>>,
  profileTitle: "運営者情報",
  profile: {
    name: "Name",
    owner: "Owner",
    business: "Business",
    businessSeparator: "／",
    works: "Works",
    worksLink: (count: number) => `制作事例 ${count}サイト`,
    contact: "Contact",
    contactLink: "クラウドワークス",
  },
  access: {
    title: "所在地",
    photo: photo("office-3dcf4223", "木の受付カウンターと植物のあるオフィス"),
    address,
    addressText,
    postal: `〒${address.postalCode}`,
    map: {
      label: "Google マップで見る",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`,
    },
  },
};
