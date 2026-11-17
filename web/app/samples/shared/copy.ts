export const sampleCopy = {
  maker: (brand: string, name: string) => `${brand}（${name}）`,
  pageDescription: (brand: string, kind: string, page: string) =>
    page === brand
      ? `${brand}（架空の${kind}）。`
      : `${brand}（架空の${kind}）の「${page}」のページ。`,
  disclaimer: (maker: string, kind: string) =>
    `${maker}が制作した${kind}のWebサイトのサンプルで、名前や所在地は架空です。`,
  credit: {
    notice: (maker: string) =>
      `このサイトは、${maker}が制作したWebサイトのサンプルです。会社・店舗・人物は架空です。`,
    back: "制作事例の一覧へ",
    analytics: "アクセス解析に Google アナリティクスを使っています。",
  },
};
