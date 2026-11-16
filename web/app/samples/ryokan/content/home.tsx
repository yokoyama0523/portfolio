import { image } from "../assets";
import { inn } from "./inn";

export type Tone = "t15" | "t16" | "t18" | "t21" | "t06" | "t08" | "t10";

export const darkTones: Tone[] = ["t18", "t21"];

export const home = {
  meta: {
    title: `${inn.name}｜信州・渋温泉`,
    description:
      "信州・渋温泉、全12室の湯宿。到着の15時から翌朝の10時まで、一日の流れでご案内します。",
  },
  navLabel: "メニュー",
  nav: [
    { href: "#t16", label: "湯" },
    { href: "#t18", label: "献立" },
    { href: "#rooms", label: "部屋" },
    { href: "#book", label: "交通" },
  ],
  reserveLabel: "ご予約",
  hero: {
    label: "紹介",
    image: image("room.jpg"),
    alt: "障子越しに庭が見える和室",
    title: ["湯の音と、", "木の匂いと。"],
    place: "信州・渋温泉　全十二室",
    text: "到着の15時から、翌朝の10時まで。一日の流れでご案内します。",
  },
  hours: [
    {
      id: "t15",
      tone: "t15" as Tone,
      clock: { time: "15:00", label: "着く" },
      when: "十五時",
      title: ["石畳のいちばん奥に。"],
      image: image("arrive.jpg"),
      alt: "旅館の玄関",
      focus: "50% 22%",
      paragraphs: [
        "長野電鉄の湯田中駅から、送迎の車で10分。石畳の温泉街を歩いて、いちばん奥がゆらぎです。玄関で靴を脱いだら、ロビーで抹茶と栗の菓子を。鍵は、九つの外湯をめぐるための木の鍵です。",
      ],
      note: "送迎は 14:30 ／ 15:30 ／ 16:30 に駅へ。前日までにお知らせください。",
    },
    {
      id: "t16",
      tone: "t16" as Tone,
      clock: { time: "16:00", label: "湯" },
      when: "十六時",
      title: ["加水も加温もしない、", "源泉のまま。"],
      image: image("bath-source.jpg"),
      alt: "檜の湯船",
      focus: "62% 50%",
      paragraphs: [
        "敷地の奥から湧く自家源泉を、そのまま湯船に注いでいます。少し熱めの42度。露天は谷に向かって開いていて、夕方は山の影がゆっくり降りてくるのが見えます。",
      ],
      list: [
        { term: "泉質", value: "ナトリウム・塩化物泉（弱アルカリ性）" },
        { term: "湯船", value: "露天「星見」・内湯「杉」・貸切「月」（45分・無料）" },
        { term: "外湯", value: "渋温泉の九つの外湯は、木の鍵で何度でも" },
      ],
    },
    {
      id: "t18",
      tone: "t18" as Tone,
      clock: { time: "18:30", label: "夕餉" },
      when: "十八時半",
      title: ["信州の、その日のもの。"],
      image: image("kaiseki-1.jpg"),
      alt: "夕餉の八寸",
      paragraphs: [
        "部屋食ではなく、囲炉裏のある食事処で。献立は仕入れで毎日変わります。11月はこのような内容です。",
      ],
      list: [
        { term: "先付", value: "くるみ豆腐　山葵" },
        { term: "八寸", value: "信州サーモンの燻製、栗の渋皮煮、野沢菜の天ぷら" },
        { term: "向付", value: "千曲川の岩魚の造り" },
        { term: "焼物", value: "信州牛の炭火焼　塩と山椒" },
        { term: "食事", value: "新米の釜炊き、きのこ汁、香の物" },
        { term: "甘味", value: "林檎の葛寄せ" },
      ],
      photos: [image("sashimi.jpg"), image("kaiseki-2.jpg")],
    },
    {
      id: "t21",
      tone: "t21" as Tone,
      clock: { time: "21:00", label: "夜" },
      when: "二十一時",
      title: ["テレビのない部屋で、", "湯の音だけを。"],
      image: image("stars.jpg"),
      alt: "夜空",
      paragraphs: [
        "部屋にテレビはありません。窓を少し開けると、谷川の水音と、外湯に向かう下駄の音がします。露天「星見」は夜通し入れます。晴れた夜は、天の川が見えます。",
      ],
      note: "夜食に、おにぎりと味噌汁を 22時までお部屋へ。",
    },
    {
      id: "t06",
      tone: "t06" as Tone,
      clock: { time: "06:00", label: "朝湯" },
      when: "六時",
      title: ["朝の湯は、", "湯気が白い。"],
      image: image("bath-morning.jpg"),
      alt: "湯けむりの露天風呂",
      paragraphs: [
        "夜のあいだに気温が下がって、朝の露天は湯気で真っ白になります。誰もいない時間に、もう一度。湯上がりに、ロビーで淹れたての珈琲を。",
      ],
    },
    {
      id: "t08",
      tone: "t08" as Tone,
      clock: { time: "08:00", label: "朝餉" },
      when: "八時",
      title: ["湯豆腐と、焼き魚と、", "釜炊きの米。"],
      image: image("kaiseki-3.jpg"),
      alt: "朝餉",
      paragraphs: [
        "朝餉は、湯豆腐に信州味噌、川魚の一夜干し、温泉卵、自家製の漬物。ごはんは土鍋で炊いて、おかわりは好きなだけ。朝餉の時間は 7:30 から 9:00 のあいだで選べます。",
      ],
    },
    {
      id: "t10",
      tone: "t10" as Tone,
      clock: { time: "10:00", label: "発つ" },
      when: "十時",
      title: ["また、湯の音を", "聞きに。"],
      image: image("umbrella.jpg"),
      alt: "玄関の傘",
      paragraphs: [
        "チェックアウトは10時。お荷物は送迎の車までお運びします。帰りに温泉街を歩くなら、荷物は夕方まで玄関で預かります。",
      ],
      note: "再訪のお客さまには、前回と違う部屋をご用意しています。",
    },
  ],
  rooms: {
    id: "rooms",
    title: "部屋",
    text: "全12室。どの部屋も窓が谷に向いています。広さと湯の有無で三つの型があります。",
    pricePrefix: "1泊2食",
    notes: { tani: "〜　1名・2名利用時", sugi: "〜", tsuki: "〜" } as Record<string, string>,
  },
  book: {
    id: "book",
    title: "ご予約",
    fields: {
      date: "到着日",
      nights: { label: "泊数", options: [1, 2, 3], suffix: "泊" },
      adults: { label: "大人の人数", options: ["2", "1", "3", "4"] },
    },
    submit: "空きを確かめる",
    accessTitle: "交通",
    access: [
      { term: "住所", value: "長野県下高井郡山ノ内町平穏 2200" },
      { term: "電車", value: "長野駅から長野電鉄で湯田中駅（約45分）。駅から送迎10分" },
      { term: "車", value: "上信越道 信州中野ICから 20分。駐車場 8台（無料）" },
      { term: "時間", value: "チェックイン 15:00〜18:00　チェックアウト 10:00" },
      { term: "子ども", value: "小学生以上。食事は大人と同じ献立です" },
    ],
  },
  footer: {
    note: `© ${inn.name}　｜　このページはポートフォリオ用の架空の宿です。人物の写真はフリー素材（ぱくたそ）のモデルで、本文の人物とは関係ありません。`,
    union: "渋温泉旅館組合　加盟",
  },
};
