export type Product = {
  id: string;
  category: string;
  name: string;
  price: number;
  sale?: number;
  sizes: string[];
  isNew?: boolean;
  rank: number;
  material: string;
  madeIn: string;
  description: string;
  care: string;
  variants: { color: string; images: string[] }[];
  measurements: Record<string, (number | string)[]>;
  reviews: { rating: number; text: string; who: string; size: string }[];
};

export type Coupon = { type: "rate" | "ship"; value: number; label: string };

export const shop = {
  name: "ASAGI",
  tagline: "毎日着る、ふつうの服。",
  freeShippingFrom: 11000,
  shipping: 660,
  codFee: 330,
  giftFee: 330,
  coupons: {
    WELCOME10: {
      type: "rate",
      value: 10,
      label: "初回10%OFF",
    },
    SHIP0: {
      type: "ship",
      value: 0,
      label: "送料無料",
    },
  } as Record<string, Coupon>,
};

export const demoAccount = {
  email: "demo@example.com",
  password: "demo1234",
  name: "佐藤 あおい",
  kana: "サトウ アオイ",
};

export const categories = [
  {
    id: "tops",
    name: "トップス",
  },
  {
    id: "bottoms",
    name: "ボトムス",
  },
  {
    id: "outer",
    name: "アウター",
  },
  {
    id: "onepiece",
    name: "ワンピース",
  },
  {
    id: "acc",
    name: "小物",
  },
  {
    id: "shoes",
    name: "シューズ",
  },
];

export const colorSwatches: Record<string, string> = {
  ホワイト: "#f4f4f2",
  ブラック: "#1d1d1d",
  サックス: "#a9c4de",
  ベージュ: "#d8c7a8",
  グレー: "#9a9a98",
  オリーブ: "#8a9a6b",
  ブルー: "#5d7fa8",
  イエロー: "#e8c33a",
  パープル: "#8a5fb0",
  レッド: "#c8322b",
  インディゴ: "#2f3f5e",
  ピンク: "#d9a2a0",
  キャメル: "#c89a5e",
  ブラウン: "#7a5c43",
  チャコール: "#3d3f42",
  ライトグレー: "#c4c6c3",
  アイボリー: "#ece7da",
  ナチュラル: "#e3dccb",
  グリーン: "#4f6f5f",
  アソート: "linear-gradient(90deg,#bbb,#8a5fb0,#e8c33a)",
  ボーダー: "linear-gradient(90deg,#c8322b 0 25%,#e8c33a 0 50%,#5d7fa8 0 75%,#4f6f5f 0)",
  ネイビー: "#223355",
};

const unknownSwatch = "#ccc";

export const swatchOf = (color: string) => colorSwatches[color] ?? unknownSwatch;

export const products: Product[] = [
  {
    id: "tee-crew",
    category: "tops",
    name: "オーガニックコットン クルーネックTシャツ",
    price: 3300,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    rank: 1,
    material: "綿100%（オーガニックコットン）",
    madeIn: "日本製",
    description:
      "8.5オンスの度詰め天竺。洗っても首まわりが伸びにくいよう、リブは二重にしています。一枚で着ても透けない厚み。",
    care: "洗濯機可（ネット使用）／タンブラー乾燥不可",
    variants: [
      {
        color: "ブラック",
        images: ["om-tee-black", "om-tee-black-d", "om-tee-black-e"],
      },
    ],
    measurements: {
      S: [64, 46, 52, 19],
      M: [67, 49, 55, 20],
      L: [70, 52, 58, 21],
      XL: [73, 55, 61, 22],
    },
    reviews: [
      {
        rating: 5,
        text: "生地がしっかりしていて、洗濯を繰り返しても形が崩れません。黒を3枚買い足しました。",
        who: "T.K.",
        size: "M",
      },
      {
        rating: 4,
        text: "少し大きめ。普段Mですが、Sでちょうどよかったです。",
        who: "mina",
        size: "S",
      },
      {
        rating: 5,
        text: "首のリブが伸びないのがいい。",
        who: "よし",
        size: "L",
      },
    ],
  },
  {
    id: "knit-crew",
    category: "tops",
    name: "ラムウール クルーネックニット",
    price: 14300,
    sizes: ["S", "M", "L"],
    rank: 3,
    material: "毛100%（ラムウール）",
    madeIn: "日本製",
    description:
      "ラムウールの7ゲージ。チクチクしにくい糸を選び、首まわりは浅め。インナーにシャツを合わせても襟が出ます。",
    care: "手洗い／平干し",
    variants: [
      {
        color: "ホワイト",
        images: ["om-knit-white", "om-knit-white-d", "om-knit-white-e"],
      },
    ],
    measurements: {
      S: [60, 52, 46, 56],
      M: [63, 55, 48, 57],
      L: [66, 58, 50, 58],
    },
    reviews: [
      {
        rating: 5,
        text: "白でも透けず、チクチクしません。",
        who: "asa",
        size: "M",
      },
      {
        rating: 4,
        text: "袖が少し長め。",
        who: "k",
        size: "S",
      },
    ],
  },
  {
    id: "knit-turtle",
    category: "tops",
    name: "リブ タートルネックニット",
    price: 12100,
    sizes: ["S", "M", "L"],
    isNew: true,
    rank: 6,
    material: "毛50% アクリル50%",
    madeIn: "日本製",
    description:
      "リブ編みの細身のタートルネック。首は折り返して着られる長さ。スカートにもパンツにも合わせやすい丈です。",
    care: "手洗い／平干し",
    variants: [
      {
        color: "ボルドー",
        images: ["om-turtle-bordeaux", "om-turtle-bordeaux-d", "om-turtle-bordeaux-e"],
      },
    ],
    measurements: {
      S: [56, 40, 36, 58],
      M: [58, 42, 37, 59],
      L: [60, 44, 38, 60],
    },
    reviews: [
      {
        rating: 5,
        text: "色がきれい。細身なのでジャケットの下にも。",
        who: "haru",
        size: "S",
      },
    ],
  },
  {
    id: "knit-cable",
    category: "tops",
    name: "ケーブル ボタンニット",
    price: 15400,
    sale: 13200,
    sizes: ["F"],
    rank: 7,
    material: "毛100%",
    madeIn: "日本製",
    description:
      "ざっくりしたケーブル編みのニット。首から肩に金ボタンを付けています。フリーサイズです。",
    care: "手洗い／平干し",
    variants: [
      {
        color: "レッド",
        images: ["om-cable-red", "om-cable-red-d", "om-cable-red-e"],
      },
    ],
    measurements: {
      F: [58, 56, "-", 54],
    },
    reviews: [
      {
        rating: 5,
        text: "ボタンがかわいい。厚みがあって暖かいです。",
        who: "mm",
        size: "F",
      },
    ],
  },
  {
    id: "shirt-sheer",
    category: "tops",
    name: "シアー ロングシャツ",
    price: 9900,
    sizes: ["F"],
    isNew: true,
    rank: 9,
    material: "ポリエステル100%",
    madeIn: "日本製",
    description:
      "透け感のあるロングシャツ。前を開けて羽織りにも、ベルトで留めても。袖はたっぷりめです。",
    care: "洗濯機可（ネット使用）",
    variants: [
      {
        color: "ピンク",
        images: ["om-sheer-pink", "om-sheer-pink-d", "om-sheer-pink-e"],
      },
    ],
    measurements: {
      F: [92, 62, "-", 56],
    },
    reviews: [
      {
        rating: 4,
        text: "春先の羽織りに。",
        who: "yuu",
        size: "F",
      },
    ],
  },
  {
    id: "jeans-st",
    category: "bottoms",
    name: "ストレッチデニム スキニー",
    price: 12100,
    sizes: ["28", "30", "32", "34"],
    rank: 2,
    material: "綿98% ポリウレタン2%",
    madeIn: "日本製（岡山）",
    description:
      "ストレッチの効いたスキニーデニム。ライトブルーの色落ち加工。ニットやロング丈のトップスに合わせやすい細さです。",
    care: "洗濯機可（裏返して）／色移りに注意",
    variants: [
      {
        color: "ライトブルー",
        images: ["om-jeans-blue", "om-jeans-blue-d", "om-jeans-blue-e"],
      },
    ],
    measurements: {
      "28": [70, 35, 26, "-"],
      "30": [71, 37, 27, "-"],
      "32": [72, 39, 28, "-"],
      "34": [73, 41, 29, "-"],
    },
    reviews: [
      {
        rating: 5,
        text: "よく伸びて楽です。",
        who: "saki",
        size: "28",
      },
      {
        rating: 4,
        text: "丈は少し長め。",
        who: "no",
        size: "30",
      },
    ],
  },
  {
    id: "skirt-pleat",
    category: "bottoms",
    name: "プリーツ ミニスカート",
    price: 9900,
    sizes: ["S", "M", "L"],
    isNew: true,
    rank: 10,
    material: "ポリエステル100%",
    madeIn: "日本製",
    description: "ハイウエストのプリーツスカート。腰にベルトとポケットが付いています。",
    care: "洗濯機可（ネット使用）",
    variants: [
      {
        color: "ブラック",
        images: ["om-skirt-black", "om-skirt-black-d", "om-skirt-black-e"],
      },
    ],
    measurements: {
      S: ["-", 32, "-", "-"],
      M: ["-", 34, "-", "-"],
      L: ["-", 36, "-", "-"],
    },
    reviews: [
      {
        rating: 4,
        text: "プリーツが取れにくい。",
        who: "rin",
        size: "S",
      },
    ],
  },
  {
    id: "skirt-tiered",
    category: "bottoms",
    name: "ティアード ロングスカート",
    price: 11000,
    sizes: ["F"],
    rank: 11,
    material: "綿100%",
    madeIn: "日本製",
    description: "段になった切り替えのロングスカート。足首が見える丈で、ウエストはゴムです。",
    care: "洗濯機可（弱）",
    variants: [
      {
        color: "ホワイト",
        images: ["om-tiered-white", "om-tiered-white-d", "om-tiered-white-e"],
      },
    ],
    measurements: {
      F: ["-", "33〜", "-", "-"],
    },
    reviews: [
      {
        rating: 5,
        text: "透けにくい生地です。",
        who: "emi",
        size: "F",
      },
    ],
  },
  {
    id: "wide",
    category: "bottoms",
    name: "コットン イージーパンツ",
    price: 9900,
    sizes: ["S", "M", "L", "XL"],
    rank: 5,
    material: "綿100%",
    madeIn: "日本製",
    description:
      "ウエストがゴムと紐のイージーパンツ。太すぎない太さで、裾に向かって少し細くなります。",
    care: "洗濯機可",
    variants: [
      {
        color: "ブラック",
        images: ["om-wide-black", "om-wide-black-d", "om-wide-black-e"],
      },
    ],
    measurements: {
      S: [70, 36, 31, "-"],
      M: [72, 38, 32, "-"],
      L: [74, 40, 33, "-"],
      XL: [76, 42, 34, "-"],
    },
    reviews: [
      {
        rating: 5,
        text: "仕事にも休みの日にも。",
        who: "taka",
        size: "L",
      },
    ],
  },
  {
    id: "down",
    category: "outer",
    name: "ショート ダウンジャケット",
    price: 29700,
    sizes: ["S", "M", "L"],
    isNew: true,
    rank: 4,
    material: "表地 ナイロン100%／中わた ダウン90% フェザー10%",
    madeIn: "日本製",
    description: "フード付きのショート丈ダウン。身幅は大きめで、ニットの上からでも着られます。",
    care: "ドライクリーニング",
    variants: [
      {
        color: "ブラック",
        images: ["om-down-black", "om-down-black-d", "om-down-black-e"],
      },
    ],
    measurements: {
      S: [62, 66, 56, 58],
      M: [64, 68, 58, 59],
      L: [66, 70, 60, 60],
    },
    reviews: [
      {
        rating: 5,
        text: "軽くて暖かい。",
        who: "nao",
        size: "M",
      },
    ],
  },
  {
    id: "fur",
    category: "outer",
    name: "エコファー ジャケット",
    price: 19800,
    sizes: ["F"],
    rank: 8,
    material: "ポリエステル100%",
    madeIn: "日本製",
    description: "毛足の長いエコファーのショートジャケット。前はフックで留めます。",
    care: "ドライクリーニング",
    variants: [
      {
        color: "ピンク",
        images: ["om-fur-pink", "om-fur-pink-d", "om-fur-pink-e"],
      },
    ],
    measurements: {
      F: [50, 52, "-", 56],
    },
    reviews: [
      {
        rating: 4,
        text: "色がやさしいピンク。",
        who: "momo",
        size: "F",
      },
    ],
  },
  {
    id: "dress",
    category: "onepiece",
    name: "シャツワンピース",
    price: 16500,
    sizes: ["F"],
    isNew: true,
    rank: 12,
    material: "綿100%",
    madeIn: "日本製",
    description: "襟付きのシャツワンピース。袖はたっぷり、着丈はふくらはぎの中ほど。",
    care: "洗濯機可（弱）／陰干し",
    variants: [
      {
        color: "ホワイト",
        images: ["om-dress-white", "om-dress-white-d", "om-dress-white-e"],
      },
    ],
    measurements: {
      F: [118, 60, "-", 58],
    },
    reviews: [
      {
        rating: 5,
        text: "一枚でさまになります。",
        who: "aya",
        size: "F",
      },
    ],
  },
  {
    id: "scarf",
    category: "acc",
    name: "ウール リブマフラー",
    price: 6600,
    sizes: ["F"],
    rank: 14,
    material: "毛100%",
    madeIn: "日本製",
    description: "太めの糸で編んだリブのマフラー。30cm×180cm。",
    care: "手洗い",
    variants: [
      {
        color: "グレー",
        images: ["pk-scarf-grey", "pk-scarf-grey-d", "pk-scarf-grey-e"],
      },
      {
        color: "チャコール",
        images: ["pk-scarf-charcoal", "pk-scarf-charcoal-d", "pk-scarf-charcoal-e"],
      },
      {
        color: "ライトグレー",
        images: ["pk-scarf-light", "pk-scarf-light-d", "pk-scarf-light-e"],
      },
      {
        color: "アイボリー",
        images: ["pk-scarf-ivory", "pk-scarf-ivory-d", "pk-scarf-ivory-e"],
      },
      {
        color: "パープル",
        images: ["pk-scarf-purple", "pk-scarf-purple-d", "pk-scarf-purple-e"],
      },
      {
        color: "イエロー",
        images: ["pk-scarf-yellow", "pk-scarf-yellow-d", "pk-scarf-yellow-e"],
      },
      {
        color: "ブラウン",
        images: ["pk-scarf-brown", "pk-scarf-brown-d", "pk-scarf-brown-e"],
      },
      {
        color: "ブルー",
        images: ["pk-scarf-blue", "pk-scarf-blue-d", "pk-scarf-blue-e"],
      },
    ],
    measurements: {
      F: [180, 30, "-", "-"],
    },
    reviews: [
      {
        rating: 5,
        text: "色が多くて選ぶのが楽しい。",
        who: "N",
        size: "F",
      },
      {
        rating: 5,
        text: "首に巻いても重くない。",
        who: "ai",
        size: "F",
      },
    ],
  },
  {
    id: "tote",
    category: "acc",
    name: "キャンバストートバッグ L",
    price: 5500,
    sizes: ["F"],
    rank: 15,
    material: "綿100%（帆布 10号）",
    madeIn: "日本製",
    description:
      "10号帆布のトート。A4の書類とノートパソコンが横に入ります。持ち手は肩にかけられる長さ。",
    care: "手洗い",
    variants: [
      {
        color: "ナチュラル",
        images: ["pk-tote-natural", "pk-tote-natural-d", "pk-tote-natural-e"],
      },
      {
        color: "ブラック",
        images: ["pk-tote-black", "pk-tote-black-d", "pk-tote-black-e"],
      },
      {
        color: "グリーン",
        images: ["pk-tote-green", "pk-tote-green-d", "pk-tote-green-e"],
      },
      {
        color: "グレー",
        images: ["pk-tote-grey", "pk-tote-grey-d", "pk-tote-grey-e"],
      },
      {
        color: "ホワイト",
        images: ["pk-tote-white", "pk-tote-white-d", "pk-tote-white-e"],
      },
    ],
    measurements: {
      F: [38, 42, 14, "-"],
    },
    reviews: [
      {
        rating: 4,
        text: "丈夫。少し硬い。",
        who: "tom",
        size: "F",
      },
    ],
  },
  {
    id: "cap",
    category: "acc",
    name: "コットンツイル キャップ",
    price: 4950,
    sizes: ["F"],
    rank: 18,
    material: "綿100%",
    madeIn: "日本製",
    description: "つばの短いコットンキャップ。後ろのベルトでサイズを調整できます。",
    care: "手洗い",
    variants: [
      {
        color: "イエロー",
        images: ["pk-cap-yellow", "pk-cap-yellow-d", "pk-cap-yellow-e"],
      },
      {
        color: "ホワイト",
        images: ["pk-cap-white", "pk-cap-white-d", "pk-cap-white-e"],
      },
      {
        color: "ブラウン",
        images: ["pk-cap-brown", "pk-cap-brown-d", "pk-cap-brown-e"],
      },
    ],
    measurements: {
      F: ["56-60", "-", "-", "-"],
    },
    reviews: [
      {
        rating: 5,
        text: "深さがちょうどいい。",
        who: "k2",
        size: "F",
      },
    ],
  },
  {
    id: "socks-rib",
    category: "acc",
    name: "リブソックス 3足セット",
    price: 1980,
    sizes: ["F"],
    rank: 16,
    material: "綿80% ナイロン18% ポリウレタン2%",
    madeIn: "日本製（奈良）",
    description: "奈良の工場で編んだリブソックス。グレー・パープル・イエローの3足セット。",
    care: "洗濯機可",
    variants: [
      {
        color: "アソート",
        images: ["pk-socks-rib", "pk-socks-rib-d", "pk-socks-rib-e"],
      },
    ],
    measurements: {
      F: ["23-25", "-", "-", "-"],
    },
    reviews: [
      {
        rating: 5,
        text: "かかとが丈夫。",
        who: "yy",
        size: "F",
      },
    ],
  },
  {
    id: "socks-stripe",
    category: "acc",
    name: "マルチボーダー ソックス",
    price: 1320,
    sizes: ["F"],
    rank: 20,
    material: "綿80% ナイロン18% ポリウレタン2%",
    madeIn: "日本製（奈良）",
    description: "足元にひとつ色を。",
    care: "洗濯機可",
    variants: [
      {
        color: "ボーダー",
        images: ["pk-socks-stripe", "pk-socks-stripe-d", "pk-socks-stripe-e"],
      },
    ],
    measurements: {
      F: ["23-25", "-", "-", "-"],
    },
    reviews: [],
  },
  {
    id: "socks-dot",
    category: "acc",
    name: "ドット ソックス",
    price: 1320,
    sizes: ["F"],
    rank: 19,
    material: "綿80% ナイロン18% ポリウレタン2%",
    madeIn: "日本製（奈良）",
    description: "小さなドット柄。ネイビー。",
    care: "洗濯機可",
    variants: [
      {
        color: "ネイビー",
        images: ["pk-socks-dot-navy", "pk-socks-dot-navy-d", "pk-socks-dot-navy-e"],
      },
    ],
    measurements: {
      F: ["25-27", "-", "-", "-"],
    },
    reviews: [],
  },
  {
    id: "sneaker",
    category: "shoes",
    name: "レザースニーカー",
    price: 17600,
    sizes: ["23", "24", "25", "26", "27", "28"],
    rank: 17,
    material: "アッパー 牛革／ソール ラバー",
    madeIn: "日本製",
    description:
      "ステアレザーのローカット。ソールはやや厚め。最初は硬く、2週間ほどで足になじみます。",
    care: "乾いた布で拭く",
    variants: [
      {
        color: "ネイビー",
        images: ["pk-sneaker-navy", "pk-sneaker-navy-d", "pk-sneaker-navy-e"],
      },
      {
        color: "ブラック",
        images: ["pk-sneaker-black", "pk-sneaker-black-d", "pk-sneaker-black-e"],
      },
      {
        color: "オリーブ",
        images: ["pk-sneaker-olive", "pk-sneaker-olive-d", "pk-sneaker-olive-e"],
      },
    ],
    measurements: {},
    reviews: [
      {
        rating: 5,
        text: "革が柔らかくなってから最高。",
        who: "shu",
        size: "26",
      },
      {
        rating: 3,
        text: "最初が痛い。",
        who: "mk",
        size: "24",
      },
    ],
  },
  {
    id: "slipon",
    category: "shoes",
    name: "キャンバス スリッポン",
    price: 11000,
    sale: 8800,
    sizes: ["23", "24", "25", "26", "27", "28"],
    rank: 21,
    material: "アッパー 綿／ソール ラバー",
    madeIn: "中国製",
    description: "キャンバスのスリッポン。かかとを踏んでも履ける作り。",
    care: "手洗い",
    variants: [
      {
        color: "グレー",
        images: ["pk-slipon-grey", "pk-slipon-grey-d", "pk-slipon-grey-e"],
      },
      {
        color: "レッド",
        images: ["pk-slipon-red", "pk-slipon-red-d", "pk-slipon-red-e"],
      },
    ],
    measurements: {},
    reviews: [
      {
        rating: 4,
        text: "軽い。",
        who: "ko",
        size: "27",
      },
    ],
  },
];

export const measurementLabels: Record<string, string[]> = {
  tops: ["着丈", "身幅", "肩幅", "袖丈"],
  outer: ["着丈", "身幅", "肩幅", "袖丈"],
  onepiece: ["着丈", "身幅", "肩幅", "袖丈"],
  bottoms: ["股下", "ウエスト(平置き)", "わたり", "-"],
  acc: ["長さ／高さ", "幅", "マチ", "-"],
  shoes: [],
};

export const looks = [
  {
    image: "look-2",
    title: "白ニットとデニム",
    items: ["knit-crew", "jeans-st"],
  },
  {
    image: "look-25",
    title: "ダウンを羽織って",
    items: ["down", "knit-crew", "jeans-st"],
  },
  {
    image: "look-8",
    title: "ニットとスカート",
    items: ["knit-turtle", "skirt-pleat"],
  },
  {
    image: "look-24",
    title: "シアーシャツとロングスカート",
    items: ["shirt-sheer", "skirt-tiered"],
  },
  {
    image: "look-15",
    title: "黒Tシャツとイージーパンツ",
    items: ["tee-crew", "wide"],
  },
  {
    image: "look-10",
    title: "赤いケーブルニット",
    items: ["knit-cable"],
  },
  {
    image: "look-23",
    title: "ファーのジャケット",
    items: ["fur"],
  },
  {
    image: "look-26",
    title: "白のシャツワンピース",
    items: ["dress"],
  },
];

export const news = [
  {
    date: "2026.11.10",
    iso: "2026-11-10",
    text: "冬物のダウンジャケットが入荷しました。サイズはS〜L。",
  },
  {
    date: "2026.11.01",
    iso: "2026-11-01",
    text: "11,000円以上のお買い上げで送料無料になりました。",
  },
  {
    date: "2026.10.20",
    iso: "2026-10-20",
    text: "会員登録で初回10%OFFクーポン「WELCOME10」をお使いいただけます。",
  },
];
