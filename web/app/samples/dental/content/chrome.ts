import { clinic } from "./clinic";

export const footers = {
  home: {
    showLatin: false,
    menu: [
      { href: "#feat", label: "当院の特長" },
      { to: clinic.paths.treatment, label: "診療案内" },
      { href: "#first", label: "初めての方へ" },
      { href: "#doc", label: "院長・スタッフ" },
      { href: "#room", label: "院内" },
      { href: "#access", label: "アクセス" },
      { to: clinic.paths.reserve, label: "WEB予約" },
    ],
    note: "このページはポートフォリオ用の架空の医院です。人物の写真はフリー素材（ぱくたそ・Pexels）のモデルで、本文の人物とは関係ありません。",
  },
  sub: {
    showLatin: true,
    menu: [
      { to: clinic.paths.section("feat"), label: "当院の特長" },
      { to: clinic.paths.treatment, label: "診療案内" },
      { to: clinic.paths.section("first"), label: "初めての方へ" },
      { to: clinic.paths.section("doc"), label: "院長・スタッフ紹介" },
      { to: clinic.paths.section("room"), label: "院内紹介" },
      { to: clinic.paths.section("access"), label: "アクセス" },
      { to: clinic.paths.reserve, label: "WEB予約" },
    ],
    note: "このページはポートフォリオ用の架空の医院です。",
  },
  hoursTitle: "診療時間",
  menuTitle: "メニュー",
  telPrefix: "TEL ",
};

export const subHeader = {
  navLabel: "メニュー",
  nav: [
    { to: clinic.paths.section("feat"), label: "当院の特長" },
    { to: clinic.paths.section("hours"), label: "診療時間" },
    { to: clinic.paths.treatment, label: "診療案内" },
    { to: clinic.paths.section("first"), label: "初めての方へ" },
    { to: clinic.paths.section("doc"), label: "院長・スタッフ" },
    { to: clinic.paths.section("room"), label: "院内紹介" },
    { to: clinic.paths.section("access"), label: "アクセス" },
  ],
  telLabel: "お電話でのご予約",
};

export const mobileBar = {
  label: "予約",
  tel: "電話",
  reserve: "WEB予約",
  access: "アクセス",
};

export const crumbs = { label: "パンくずリスト", home: "ホーム", separator: "　／　" };

export type NavItem = { href?: string; to?: string; label: string };
