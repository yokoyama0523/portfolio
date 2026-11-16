import { store } from "./store";

export const checkout = {
  meta: { title: `レジ｜${store.name}`, slug: "checkout/" },
  secure: "安全な接続です",
  order: {
    title: "Checkout",
    lead: "お届け先と支払い方法を入力してください。",
    submit: "注文を確定する",
    doneTitle: "発送のこと",
    doneText:
      "次の火曜（焙煎日）から3日以内に発送します。発送したら、追跡番号をメールでお送りします。豆は焙煎から2週間がいちばんおいしい時期です。",
  },
  subscription: {
    title: "Subscription",
    lead: "定期便の種類と、お届け先を入力してください。初回は次の火曜に焙煎して、翌日に発送します。",
    submit: "定期便を始める",
    doneTitle: "定期便のこと",
    doneText:
      "初回は次の火曜に焙煎し、翌日に発送します。2回目以降は毎月同じ週に。お休みと解約は、メールのリンクからいつでも。",
    legend: "定期便",
    hint: "送料込み。お休み・解約はいつでも、マイページから。",
    initial: "おまかせの便",
    sideNote: "毎月1回・2種（200g×2）",
    summarySuffix: "（毎月）",
  },
  steps: ["Delivery", "Payment", "Confirm"],
  stepLabel: (n: number, label: string) => `${n}. ${label}`,
  back: "戻る",
  backToShop: "店に戻る",
  required: "必須",
  empty: "—",
  delivery: {
    legend: "お届け先",
    name: { label: "お名前", placeholder: "中村 葵", error: "お名前を入力してください" },
    tel: { label: "電話番号", placeholder: "090-1234-5678", error: "電話番号を確認してください" },
    zip: { label: "郵便番号", placeholder: "390-0811", error: "7桁で入力してください" },
    pref: {
      label: "都道府県",
      placeholder: "選んでください",
      options: ["北海道", "東京都", "神奈川県", "長野県", "愛知県", "大阪府", "福岡県", "その他"],
    },
    addr: {
      label: "住所",
      placeholder: "松本市中央 3-4-12 〇〇ハイツ 201",
      error: "住所を入力してください",
    },
    email: {
      label: "メール",
      placeholder: "aoi@example.com",
      error: "メールアドレスを確認してください",
    },
    when: {
      label: "配達の時間帯",
      options: ["指定なし", "午前", "14〜16時", "16〜18時", "18〜20時", "19〜21時"],
    },
    grind: {
      label: "挽き方",
      options: [
        "豆のまま",
        "中挽き（ペーパー）",
        "中細挽き（コーヒーメーカー）",
        "粗挽き（フレンチプレス）",
      ],
    },
    next: "支払いへ",
  },
  payment: {
    legend: "支払い方法",
    card: "クレジットカード",
    methods: [
      { value: "クレジットカード", note: "VISA / Master / JCB / AMEX", fee: 0 },
      { value: "コンビニ払い", note: "手数料 220円。発送は入金確認後", fee: 220 },
      { value: "代金引換", note: "手数料 330円", fee: 330 },
    ],
    cno: {
      label: "カード番号",
      placeholder: "4242 4242 4242 4242",
      error: "カード番号を確認してください",
    },
    exp: { label: "有効期限", placeholder: "12 / 28", error: "MM / YY で入力してください" },
    cvc: { label: "セキュリティコード", placeholder: "123", error: "3〜4桁の数字" },
    cardHint: "カード情報はこのページに保存されません（見本のため、送信もされません）。",
    next: "注文内容を確認する",
  },
  confirm: {
    legend: "この内容で注文します",
    edit: "変更",
    labels: {
      items: "商品",
      address: "お届け先",
      delivery: "配達・挽き方",
      payment: "支払い",
      total: "合計",
    },
    cardEnding: (last4: string) => `　（末尾 ${last4}）`,
    totalNote: "（税込・送料込み）",
    times: " × ",
    zipMark: "〒",
  },
  side: {
    title: "Your order",
    empty: "かごは空です。",
    pick: "豆を選ぶ",
    subtotal: "小計",
    shipping: "送料",
    free: "無料",
    fee: "手数料",
    total: "合計",
  },
  done: {
    title: "Thank you.",
    number: "注文番号",
    receiptPrefix: "K",
    summary: (total: string, payment: string) => `合計 ${total}　／　${payment}`,
  },
  footer:
    "このページはポートフォリオ用です。注文は実際には送信されず、カード情報も保存されません。",
};
