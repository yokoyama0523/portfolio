import { image } from "../assets";

export type Word = { text: string; italic?: boolean };

export const studio = {
  meta: {
    title: "VOID/FORM｜Creative studio, Tokyo",
    description: "WebGLとモーションで、ブランドの「体験」をつくるスタジオ。東京・渋谷。",
  },
  loader: { label: "読み込み中", from: 0, to: 100 },
  logo: { main: "VOID", sub: "/form" },
  place: ["Creative studio", "Shibuya, Tokyo"],
  navLabel: "menu",
  nav: [
    { href: "#works", label: "Works", cursor: "view" },
    { href: "#caps", label: "Capabilities", cursor: "read" },
    { href: "#contact", label: "Contact", cursor: "say hi" },
  ],
  hero: {
    label: "intro",
    title: [
      { text: "Worlds," },
      { text: "built", italic: true },
      { text: "in" },
      { text: "the" },
      { text: "browser." },
    ] as Word[],
    lead: "WebGLとモーションで、ブランドの「体験」をつくるスタジオです。触れて、動いて、はじめて伝わるものを、ブラウザの中に。",
    side: { title: "Est. 2019", lines: ["14 people", "Shibuya, Tokyo"], award: "受賞 23件" },
    mark: { start: "VOID", slash: "/", end: "FORM" },
    scroll: "SCROLL",
  },
  manifesto: [
    { text: "A" },
    { text: "website" },
    { text: "is" },
    { text: "not" },
    { text: "a" },
    { text: "page." },
    { text: "It is a place", italic: true },
    { text: "—" },
    { text: "somewhere" },
    { text: "people" },
    { text: "arrive," },
    { text: "touch" },
    { text: "things," },
    { text: "and" },
    { text: "remember" },
    { text: "how" },
    { text: "it" },
    { text: "felt." },
  ] as Word[],
  numbers: [
    { value: 86, label: "公開したサイトとアプリ" },
    { value: 14, label: "デザイナーとエンジニア" },
    { value: 0, label: "使ったテンプレート" },
  ],
  works: {
    id: "works",
    title: "Selected works",
    years: "2024 – 2026",
    cursor: "view",
    items: [
      {
        name: "KUMO Roastery",
        note: "EC・焙煎所　スクロールで焙煎度が変わる",
        image: image("coffee.jpg"),
      },
      { name: "Yuragi Ryokan", note: "宿泊　到着から出発までを時計で", image: image("ryokan.jpg") },
      { name: "Minato Seiki", note: "コーポレート　図面の寸法線で語る", image: image("corp.jpg") },
      {
        name: "Sugiura Komuten",
        note: "工務店　断面図が描かれていくヒーロー",
        image: image("house.jpg"),
      },
      { name: "Tsuchi to Hi", note: "EC・うつわ　一点ずつ、縦書きで", image: image("ceramic.jpg") },
    ],
    end: { before: "and", italic: "more", after: "→" },
  },
  caps: {
    id: "caps",
    title: [{ text: "What we" }, { text: "actually", italic: true }, { text: "do." }] as Word[],
    items: [
      {
        title: "WebGL & shaders",
        text: "Three.js と GLSL で、写真や動画では出せない質感を。このページの金属の塊も、画像を一枚も使わずに描いています。",
      },
      {
        title: "Motion systems",
        text: "ページのどこで何がどう動くかを、設計書として決めます。読み込み、遷移、スクロール、ホバー。全部に理由があります。",
      },
      {
        title: "Design engineering",
        text: "デザイナーとエンジニアが同じ机で作ります。Figma の絵をコードに「翻訳」する工程をなくしました。",
      },
      {
        title: "Performance",
        text: "重いものを軽く見せるのが仕事です。LCP 1.5秒以内、reduced motion 対応、キーボード操作。賞よりも、ちゃんと動くことを。",
      },
    ],
  },
  contact: {
    id: "contact",
    big: { before: "Say", italic: "hi." },
    email: "hello@voidform.studio",
    address: "東京都渋谷区神宮前 3-12-7　4F",
    note: "打ち合わせはオンラインでも。",
    button: "Start a project",
  },
  footer: {
    copy: "© VOID/FORM　｜　このページはポートフォリオ用の架空のスタジオです。",
    stack: "Three.js · GSAP · Lenis",
  },
};
