export const sampleCopy = {
  titleSuffix: "Web制作サンプル",
  pageDescription: (brand: string, kind: string, page: string) =>
    page === brand
      ? `${brand}（架空の${kind}）。`
      : `${brand}（架空の${kind}）の「${page}」のページ。`,
  disclaimer: (author: string, kind: string) =>
    `${author} が制作した${kind}のWebサイトのサンプルで、名前や所在地は架空です。`,
  credit: {
    notice: (author: string) =>
      `このサイトは、${author} が制作したWebサイトのサンプルです。会社・店舗・人物は架空です。`,
    back: "制作事例の一覧へ",
    analytics: "アクセス解析に Google アナリティクスを使っています。",
  },
};
