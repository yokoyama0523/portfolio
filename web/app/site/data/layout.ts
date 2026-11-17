import { site } from "~/config";
import { specialty } from "./copy";

const { paths } = site;

export const layoutCopy = {
  homeLabel: `${site.brand} トップ`,
  mainNavLabel: "メインメニュー",
  contact: "Contact",
  breadcrumbLabel: "パンくずリスト",
  footer: {
    works: { title: "Works", href: paths.works },
    groups: [
      {
        title: "Service",
        href: paths.service,
        links: [
          { label: "サービス", href: paths.service },
          { label: "制作の流れ", href: paths.process },
        ],
      },
      {
        title: "About",
        href: paths.about,
        links: [{ label: "運営者情報", href: paths.about }],
      },
    ],
    contact: { title: "Contact", links: [{ label: "クラウドワークス", href: site.crowdworks }] },
    notes: [
      "掲載事例の企業・店舗・人物はすべて架空のものです。写真はフリー素材（ぱくたそ・Unsplash・Pexels・Pixabay）を使用しており、人物はモデルです。",
      "当サイトでは、アクセス解析のために Google アナリティクスを使用しています。",
    ],
    tagline: specialty,
    copyright: `© 2026 ${site.name}`,
  },
  notFound: {
    title: "ページが見つかりません",
    code: "404",
    text: "ページが見つかりません。",
    back: "トップへ戻る",
  },
  error: {
    title: "エラー",
    text: "ページを表示できませんでした。",
    back: "トップへ戻る",
  },
};
