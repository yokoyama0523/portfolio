import { categories, shop } from "./catalog";
import { paths } from "./paths";

export const shell = {
  nav: [
    { to: paths.list("new=1"), label: "新着" },
    ...categories.map((category) => ({
      to: paths.list(`cat=${category.id}`),
      label: category.name,
    })),
    { to: paths.list("sale=1"), label: "セール" },
    { to: paths.looks, label: "ルック" },
    { to: paths.guide(), label: "ガイド" },
  ],
  menuLabel: "メニュー",
  closeLabel: "閉じる",
  categoryLabel: "カテゴリー",
  search: { placeholder: "商品を探す", label: "商品を探す", submit: "検索" },
  tools: { account: "マイページ", wish: "お気に入り", cart: "カート" },
  drawerExtra: [
    { to: paths.account(), label: "マイページ" },
    { to: paths.cart, label: "カート" },
  ],
  footer: {
    address: "東京都渋谷区神宮前 5-6-7　／　平日 10:00〜18:00　03-1234-5678",
    shopping: "ショッピング",
    sale: "セール",
    guide: {
      title: "ご利用ガイド",
      links: [
        { hash: "ship", label: "送料・配送" },
        { hash: "return", label: "返品・交換" },
        { hash: "pay", label: "お支払い方法" },
        { hash: "size", label: "サイズガイド" },
        { hash: "faq", label: "よくある質問" },
      ],
    },
    account: {
      title: "アカウント",
      links: [
        { to: paths.account(), label: "ログイン／会員登録" },
        { to: paths.account("orders"), label: "注文履歴" },
        { to: paths.account("wish"), label: "お気に入り" },
        { to: paths.admin, label: "管理画面（デモ）" },
      ],
    },
    copy: `© ${shop.name}　｜　このサイトはポートフォリオ用の架空の店です。注文・決済は実際には行われません。`,
    photos: "写真はフリー素材（ぱくたそ・Unsplash・Pexels）で、人物はモデルです。",
  },
  crumbs: { label: "現在地", home: "ホーム", separator: "／" },
  card: {
    sale: "SALE",
    isNew: "NEW",
    soldOut: "SOLD OUT",
    few: "残りわずか",
    fewAt: 8,
    wish: "お気に入り",
    taxIncluded: "税込",
    swatchLimit: 6,
  },
  toast: { wishOn: "お気に入りに追加しました", wishOff: "お気に入りから外しました" },
};
