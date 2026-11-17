import { useSyncExternalStore } from "react";
import { addDays, startOfToday, ymd } from "~/samples/shared/dates";

export type Status = "booked" | "arrived" | "cancelled";
export type Source = "web" | "tel";
export type Kind = "初診" | "再診";

export type Reservation = {
  id: string;
  date: string;
  time: string;
  minutes: number;
  chair: number;
  kind: Kind;
  menu: string;
  name: string;
  kana: string;
  tel: string;
  email: string;
  birth: string;
  who: string;
  note: string;
  status: Status;
  source: Source;
  createdAt: string;
};

export type Session = { open: boolean; start: string; end: string };
export type DayHours = { am: Session; pm: Session };
export type Part = keyof DayHours;

export type Settings = {
  week: DayHours[];
  slotMinutes: number;
  chairs: number;
  lookaheadDays: number;
  holidays: string[];
};

type State = { reservations: Reservation[]; settings: Settings; signedIn: boolean };

const PREFIX = "madobe_v2_";

const am = { open: true, start: "9:30", end: "13:00" };
const pm = { open: true, start: "14:30", end: "19:00" };
const weekday = { am, pm };
const weekend = { am, pm: { ...pm, end: "17:30" } };
const closedDay = { am: { ...am, open: false }, pm: { ...pm, open: false } };

export const defaultSettings: Settings = {
  week: [weekend, weekday, weekday, weekday, closedDay, weekday, weekend],
  slotMinutes: 30,
  chairs: 3,
  lookaheadDays: 28,
  holidays: ["2026-11-23", "2026-12-29", "2026-12-30", "2026-12-31", "2027-01-01"],
};

export const toMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const toTime = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;

const range = (session: Session, step: number) => {
  const times: string[] = [];
  if (!session.open) return times;
  for (let t = toMinutes(session.start); t + step <= toMinutes(session.end); t += step)
    times.push(toTime(t));
  return times;
};

export const sessionEnd = (date: Date, time: string, settings: Settings) => {
  const day = settings.week[date.getDay()];
  const t = toMinutes(time);
  const inAm = day.am.open && t >= toMinutes(day.am.start) && t < toMinutes(day.am.end);
  return toMinutes(inAm ? day.am.end : day.pm.end);
};

export const fits = (date: Date, time: string, minutes: number, settings: Settings) =>
  toMinutes(time) + minutes <= sessionEnd(date, time, settings);

export const isClosed = (date: Date, settings: Settings) => {
  const day = settings.week[date.getDay()];
  return (!day.am.open && !day.pm.open) || settings.holidays.includes(ymd(date));
};

export const slotTimes = (date: Date, settings: Settings) => {
  if (settings.holidays.includes(ymd(date))) return [];
  const day = settings.week[date.getDay()];
  return [...range(day.am, settings.slotMinutes), ...range(day.pm, settings.slotMinutes)];
};

const overlaps = (r: Reservation, time: string, minutes: number) => {
  const start = toMinutes(time);
  const own = toMinutes(r.time);
  return own < start + minutes && start < own + r.minutes;
};

export const activeOn = (reservations: Reservation[], date: string) =>
  reservations.filter((r) => r.date === date && r.status !== "cancelled");

export const freeChairs = (
  state: Pick<State, "reservations" | "settings">,
  date: string,
  time: string,
  minutes: number,
  ignore?: string,
) => {
  const busy = new Set(
    activeOn(state.reservations, date)
      .filter((r) => r.id !== ignore && overlaps(r, time, minutes))
      .map((r) => r.chair),
  );
  return Array.from({ length: state.settings.chairs }, (_, i) => i + 1).filter(
    (chair) => !busy.has(chair),
  );
};

const NAMES = [
  ["佐々木 恵", "ささき めぐみ"],
  ["高橋 健太", "たかはし けんた"],
  ["小林 美咲", "こばやし みさき"],
  ["山口 大輔", "やまぐち だいすけ"],
  ["中村 ひなた", "なかむら ひなた"],
  ["森 和子", "もり かずこ"],
  ["石井 陽介", "いしい ようすけ"],
  ["藤田 さくら", "ふじた さくら"],
  ["岡本 誠", "おかもと まこと"],
  ["吉田 遥", "よしだ はるか"],
  ["松本 翔", "まつもと しょう"],
  ["井上 典子", "いのうえ のりこ"],
  ["木村 悠真", "きむら ゆうま"],
  ["林 由美", "はやし ゆみ"],
  ["清水 隆", "しみず たかし"],
  ["山崎 結衣", "やまざき ゆい"],
  ["前田 修", "まえだ おさむ"],
  ["小川 七海", "おがわ ななみ"],
  ["村上 蓮", "むらかみ れん"],
  ["近藤 千尋", "こんどう ちひろ"],
  ["坂本 浩二", "さかもと こうじ"],
  ["遠藤 美穂", "えんどう みほ"],
  ["青木 颯太", "あおき そうた"],
  ["福田 恵子", "ふくだ けいこ"],
  ["西村 葵", "にしむら あおい"],
  ["太田 勝", "おおた まさる"],
  ["三浦 莉子", "みうら りこ"],
  ["原田 拓海", "はらだ たくみ"],
  ["中島 佳奈", "なかじま かな"],
  ["竹内 正樹", "たけうち まさき"],
];

const MENUS = [
  { menu: "定期検診・クリーニング", minutes: 30 },
  { menu: "定期検診・クリーニング", minutes: 30 },
  { menu: "痛み・むし歯の治療", minutes: 30 },
  { menu: "痛み・むし歯の治療", minutes: 60 },
  { menu: "こどもの歯", minutes: 30 },
  { menu: "歯ならびの相談", minutes: 30 },
  { menu: "入れ歯の調整", minutes: 30 },
  { menu: "ホワイトニング", minutes: 60 },
];

const NOTES = ["", "", "", "右下の奥歯がしみる", "麻酔が苦手です", "保育の希望あり", "前回の続き"];

const noise = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const seedReservations = (settings: Settings) => {
  const today = startOfToday();
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const list: Reservation[] = [];
  let n = 0;
  for (let offset = -7; offset <= 21; offset++) {
    const day = addDays(today, offset);
    const date = ymd(day);
    let count = 0;
    for (const time of slotTimes(day, settings)) {
      for (let chair = 1; chair <= settings.chairs; chair++) {
        n++;
        const roll = noise(n + day.getDate() * 31);
        const load = offset > 10 ? 0.22 : 0.5;
        if (roll > load) continue;
        const picked = MENUS[Math.floor(noise(n * 3) * MENUS.length)];
        const menu = fits(day, time, picked.minutes, settings)
          ? picked
          : { ...picked, minutes: 30 };
        if (
          freeChairs({ reservations: list, settings }, date, time, menu.minutes).indexOf(chair) < 0
        )
          continue;
        const [name, kana] = NAMES[(offset * 11 + count + NAMES.length * 3) % NAMES.length];
        count++;
        const past = offset < 0 || (offset === 0 && toMinutes(time) + menu.minutes <= nowMinutes);
        const cancelled = noise(n * 11) < 0.07;
        list.push({
          id: `M${date.replace(/-/g, "").slice(2)}-${String(100 + (n % 900)).padStart(3, "0")}`,
          date,
          time,
          minutes: menu.minutes,
          chair,
          kind: noise(n * 13) < 0.18 ? "初診" : "再診",
          menu: menu.menu,
          name,
          kana,
          tel: `090-0000-${String(1000 + (n % 9000)).padStart(4, "0")}`,
          email: "",
          birth: "",
          who: "本人",
          note: NOTES[Math.floor(noise(n * 17) * NOTES.length)],
          status: cancelled ? "cancelled" : past ? "arrived" : "booked",
          source: noise(n * 19) < 0.55 ? "web" : "tel",
          createdAt: ymd(addDays(day, -Math.ceil(noise(n * 23) * 14))),
        });
      }
    }
  }
  return list;
};

const read = <T>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(PREFIX + key);
    return value == null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    return;
  }
};

const fresh = (): State => {
  const settings = defaultSettings;
  return { settings, reservations: seedReservations(settings), signedIn: false };
};

const load = (): State => {
  const settings = read<Settings | null>("settings", null);
  const reservations = read<Reservation[] | null>("reservations", null);
  if (!settings || !reservations) {
    const state = fresh();
    write("settings", state.settings);
    write("reservations", state.reservations);
    return state;
  }
  return { settings, reservations, signedIn: read("signedIn", false) };
};

let current: State | null = null;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const snapshot = () => {
  if (typeof window === "undefined") return null;
  if (!current) current = load();
  return current;
};

const commit = (next: State) => {
  current = next;
  write("settings", next.settings);
  write("reservations", next.reservations);
  write("signedIn", next.signedIn);
  for (const listener of listeners) listener();
};

const update = (change: (state: State) => Partial<State>) => {
  const state = snapshot();
  if (state) commit({ ...state, ...change(state) });
};

export const clinicActions = {
  signIn: () => update(() => ({ signedIn: true })),
  signOut: () => update(() => ({ signedIn: false })),
  add: (reservation: Reservation) =>
    update((state) => ({ reservations: [...state.reservations, reservation] })),
  change: (id: string, patch: Partial<Reservation>) =>
    update((state) => ({
      reservations: state.reservations.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    })),
  saveSettings: (settings: Settings) => update(() => ({ settings })),
  reset: () => {
    const state = fresh();
    commit({ ...state, signedIn: true });
  },
};

export const useClinic = () => useSyncExternalStore(subscribe, snapshot, () => null);

export const newId = (date: string) =>
  `M${date.replace(/-/g, "").slice(2)}-${String(Math.floor(Math.random() * 900) + 100)}`;
