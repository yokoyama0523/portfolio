import { image } from "../assets";

export const rooms = [
  {
    id: "tani",
    name: "谷の間",
    count: "8室",
    text: "十畳の和室に広縁。谷側の窓。",
    price: 28600,
    capacity: 4,
    image: image("room.jpg"),
  },
  {
    id: "sugi",
    name: "杉の間",
    count: "3室",
    text: "十二畳＋次の間。檜の内風呂つき。",
    price: 36300,
    capacity: 4,
    image: image("corridor.jpg"),
  },
  {
    id: "tsuki",
    name: "離れ 月",
    count: "1室",
    text: "庭に面した一棟。源泉かけ流しの露天つき。",
    price: 52800,
    capacity: 3,
    image: image("garden.jpg"),
  },
];

export type Room = (typeof rooms)[number];

export const yen = (value: number) => `${value.toLocaleString("ja-JP")}円`;
