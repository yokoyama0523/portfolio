import { defaultSettings, type Part, type Session, type Settings, useClinic } from "./store";

export type Mark = "open" | "other" | "closed";

export const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
export const PART_LABEL: Record<Part, string> = { am: "午前", pm: "午後" };
const PARTS: Part[] = ["am", "pm"];

const span = (session: Session) => `${session.start}〜${session.end}`;
const dayList = (days: number[]) => days.map((day) => `${DAY_NAMES[day]}曜`).join("・");

const mostCommon = (sessions: Session[]) => {
  const counts = new Map<string, number>();
  for (const session of sessions) counts.set(span(session), (counts.get(span(session)) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
};

export const summarize = (settings: Settings) => {
  const notes: string[] = [];
  const rows = PARTS.flatMap((part) => {
    const sessions = WEEK_ORDER.map((day) => settings.week[day][part]);
    const main = mostCommon(sessions.filter((session) => session.open));
    if (!main) return [];
    const marks: Mark[] = sessions.map((session) =>
      !session.open ? "closed" : span(session) === main ? "open" : "other",
    );
    const mainStart = main.split("〜")[0];
    const groups = new Map<string, number[]>();
    WEEK_ORDER.forEach((day, i) => {
      if (marks[i] !== "other") return;
      const session = settings.week[day][part];
      const note =
        session.start === mainStart ? `${session.end}まで` : `${session.start}〜${session.end}`;
      groups.set(note, [...(groups.get(note) ?? []), day]);
    });
    for (const [note, days] of groups)
      notes.push(`▲ ${dayList(days)}の${PART_LABEL[part]}は${note}`);
    return [{ part, time: main, marks }];
  });
  const closedDays = WEEK_ORDER.filter((day) => {
    const { am, pm } = settings.week[day];
    return !am.open && !pm.open;
  });
  const closedText = [...closedDays.map((day) => `${DAY_NAMES[day]}曜`), "祝日"].join("・");
  notes.push(`休診日　${closedText}`);
  return { rows, notes, closedText };
};

export const useHours = () => {
  const data = useClinic();
  return summarize(data?.settings ?? defaultSettings);
};
