import { inn } from "./inn";

export const reserve = {
  meta: { title: `ご予約｜${inn.name}`, slug: "reserve/" },
  title: "ご予約",
  lead: "空き状況を見ながら、お部屋を選べます。公式サイトからのご予約は、夕餉に一品お付けします。",
  steps: ["日程", "お部屋", "お客さま", "確認"],
  stepLabel: (n: number, label: string) => `${"一二三四"[n - 1]}　${label}`,
  back: "戻る",
  required: "必須",
  empty: "—",
  stay: {
    legend: "日程と人数",
    date: "到着日",
    defaultLeadDays: 14,
    nights: { label: "泊数", options: ["1", "2", "3"], suffix: "泊" },
    adults: { label: "大人", options: ["1", "2", "3", "4"], initial: "2" },
    kids: { label: "子ども（小学生）", options: ["0", "1", "2"], initial: "0" },
    hint: "未就学のお子さまはご遠慮いただいています。",
    next: "空きを見る",
  },
  room: {
    legend: "お部屋",
    stayHint: (date: string, nights: string, adults: string, kids: number) =>
      `${date}から${nights}泊、${adults}名${kids ? `＋子ども${kids}名` : ""}`,
    capacity: (count: number) => `${count}名まで`,
    perNight: "1名1泊・2食付き",
    full: "この日は満室です",
    overCapacity: "人数が定員を超えています",
    dinnerLegend: "夕餉の時間",
    dinners: ["18:00", "18:30", "19:00", "19:30"],
    pickupLegend: "送迎",
    pickups: ["湯田中駅 14:30", "湯田中駅 15:30", "湯田中駅 16:30", "不要（車で来ます）"],
    billLegend: "お見積もり",
    noRoom: "空いているお部屋がありません。日程を変えてお試しください。",
    adultsLine: (room: string, adults: string, nights: string) =>
      `${room}　大人 ${adults}名 × ${nights}泊`,
    kidsLine: (kids: number, nights: string) => `子ども ${kids}名 × ${nights}泊 `,
    kidsNote: "（大人の7割）",
    taxLabel: "入湯税 ",
    taxNote: (people: number, nights: string) => `150円 × ${people}名 × ${nights}泊`,
    totalLabel: "合計（税込）",
    next: "お客さま情報へ",
  },
  pricing: { kidRate: 0.7, bathTax: 150 },
  guest: {
    legend: "代表のお客さま",
    name: { label: "お名前", placeholder: "鈴木 一郎", error: "お名前を入力してください" },
    kana: {
      label: "ふりがな",
      placeholder: "すずき いちろう",
      error: "ひらがなで入力してください",
    },
    tel: { label: "電話番号", placeholder: "090-1234-5678", error: "電話番号を確認してください" },
    email: {
      label: "メール",
      placeholder: "ichiro@example.com",
      error: "メールアドレスを確認してください",
    },
    pref: {
      label: "お住まい",
      options: ["東京都", "神奈川県", "長野県", "愛知県", "大阪府", "その他"],
    },
    arrive: {
      label: "到着の予定時刻",
      options: ["15:00ごろ", "16:00ごろ", "17:00ごろ", "18:00ごろ（夕餉は19:00以降に）"],
    },
    note: {
      label: "アレルギー・ご要望",
      placeholder: "食べられないもの、記念日、足の悪い方がいる、など",
    },
    next: "内容を確認する",
  },
  confirm: {
    legend: "この内容で予約します",
    hint: "お支払いは当日、現金かカードで。キャンセル料は前日 50%、当日 100%、3日前までは無料です。",
    edit: "変更",
    submit: "予約を確定する",
    labels: {
      stay: "日程",
      room: "お部屋",
      extras: "夕餉・送迎",
      total: "合計",
      name: "お名前",
      contact: "連絡先",
      arrive: "到着",
      note: "ご要望",
    },
    stay: (date: string, nights: string, adults: string, kids: number) =>
      `${date}から ${nights}泊　大人${adults}名${kids ? `・子ども${kids}名` : ""}`,
    totalNote: "（税込・入湯税込み）",
  },
  done: {
    title: "お待ちしています",
    number: "予約番号",
    receiptPrefix: "Y",
    summary: (date: string, nights: string, room: string, adults: string) =>
      `${date}から${nights}泊　${room}　${adults}名`,
    boxes: [
      {
        title: "当日まで",
        text: "前日に、送迎の時刻と夕餉の時間を確認のメールでお送りします。到着が遅れるときは、お電話で一言お知らせください。",
      },
      {
        title: "持ちもの",
        text: "浴衣・タオル・歯ブラシは部屋にあります。外湯めぐり用の木の鍵は、玄関でお渡しします。",
      },
    ],
    back: "宿のページへ戻る",
  },
  footer: "このページはポートフォリオ用です。予約は実際には送信されません。",
};
