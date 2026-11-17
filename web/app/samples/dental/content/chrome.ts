import { clinic, reserveLabel } from "./clinic";

export type NavItem = { id?: string; to?: string; label: string };

export const nav: NavItem[] = [
  { id: "first", label: "初めての方へ" },
  { to: clinic.paths.treatment, label: "診療案内" },
  { id: "doctor", label: "院長・スタッフ" },
  { id: "room", label: "院内のようす" },
  { id: "access", label: "アクセス" },
  { to: clinic.paths.news, label: "お知らせ" },
];

export const header = {
  homeLabel: "まどべ歯科のトップへ",
  menuOpen: "メニューを開く",
  menuClose: "メニューを閉じる",
  menu: "メニュー",
  reserve: reserveLabel,
  telLabel: "お電話でのご予約",
};

export const demoSwitch = {
  label: "見本の画面の切り替え",
  tag: "デモ",
  patient: "患者さん向け",
  staff: "医院向け",
};

export const reserveTab = { label: reserveLabel, hours: "24", note: "時間" };

export const mobileBar = {
  label: "予約と連絡先",
  tel: "電話",
  reserve: reserveLabel,
  access: "アクセス",
};

export const footer = {
  hoursTitle: "診療時間",
  menuTitle: "ページ",
  telLabel: "電話",
  note: "このページはポートフォリオ用の架空の医院です。写真は写真ACの素材で、本文の人物とは関係ありません。",
};

export const crumbs = { label: "現在の位置", home: "トップ" };
