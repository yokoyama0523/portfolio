export const plans = [
  {
    name: "浅煎りの便",
    homeNote: "01〜03 から2種",
    checkoutNote: "01〜03 から2種、毎月",
    price: 2560,
  },
  {
    name: "深煎りの便",
    homeNote: "04〜06 から2種",
    checkoutNote: "04〜06 から2種、毎月",
    price: 2360,
  },
  {
    name: "おまかせの便",
    homeNote: "その週のおすすめ2種",
    checkoutNote: "その週のおすすめ2種、毎月",
    price: 2460,
  },
];

export const perMonth = (price: number) => `¥${price.toLocaleString("ja-JP")} / 月`;
