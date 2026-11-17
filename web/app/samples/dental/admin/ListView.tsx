import { useRef, useState } from "react";
import { addDays, jpDate, startOfToday, ymd } from "~/samples/shared/dates";
import { adminPage } from "../content/admin";
import { Pager } from "./Pager";
import { type Reservation, type Source, type Status, toMinutes } from "./store";

const text = adminPage.list;
type Period = (typeof text.periods)[number]["id"];

const parse = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const inPeriod = (r: Reservation, period: Period) => {
  const today = ymd(startOfToday());
  if (period === "today") return r.date === today;
  if (period === "week") return r.date >= today && r.date <= ymd(addDays(startOfToday(), 6));
  if (period === "past") return r.date < today;
  return r.date > today || (r.date === today && r.status === "booked");
};

const order = (a: Reservation, b: Reservation) =>
  a.date === b.date ? toMinutes(a.time) - toMinutes(b.time) : a.date < b.date ? -1 : 1;

type Props = { reservations: Reservation[]; onOpen: (id: string) => void };

export function ListView({ reservations, onOpen }: Props) {
  const [period, setPeriod] = useState<Period>("upcoming");
  const [status, setStatus] = useState<Status | "all">("all");
  const [source, setSource] = useState<Source | "all">("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);

  const q = query.trim();
  const rows = reservations
    .filter((r) => inPeriod(r, period))
    .filter((r) => status === "all" || r.status === status)
    .filter((r) => source === "all" || r.source === source)
    .filter(
      (r) =>
        !q || r.name.includes(q) || r.kana.includes(q) || r.tel.includes(q) || r.id.includes(q),
    )
    .sort(period === "past" ? (a, b) => order(b, a) : order);
  const last = Math.max(1, Math.ceil(rows.length / text.pageSize));
  const current = Math.min(page, last);
  const start = (current - 1) * text.pageSize;
  const shown = rows.slice(start, start + text.pageSize);
  const filtered =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      set(value);
      setPage(1);
    };
  const goTo = (next: number) => {
    setPage(next);
    top.current?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <div className="pnl filters" ref={top}>
        <fieldset className="seg">
          <legend className="sr">{text.period}</legend>
          {text.periods.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={period === item.id}
              onClick={() => filtered(setPeriod)(item.id)}
            >
              {item.label}
            </button>
          ))}
        </fieldset>
        <label className="sel">
          <span>{text.status}</span>
          <select
            value={status}
            onChange={(e) => filtered(setStatus)(e.target.value as Status | "all")}
          >
            <option value="all">{text.all}</option>
            {(Object.keys(adminPage.status) as Status[]).map((key) => (
              <option key={key} value={key}>
                {adminPage.status[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="sel">
          <span>{text.source}</span>
          <select
            value={source}
            onChange={(e) => filtered(setSource)(e.target.value as Source | "all")}
          >
            <option value="all">{text.all}</option>
            {(Object.keys(adminPage.source) as Source[]).map((key) => (
              <option key={key} value={key}>
                {adminPage.source[key]}
              </option>
            ))}
          </select>
        </label>
        <input
          type="search"
          className="search"
          placeholder={text.search}
          aria-label={text.search}
          value={query}
          onChange={(e) => filtered(setQuery)(e.target.value)}
        />
        <span className="count">
          {rows.length > 0
            ? text.range(start + 1, start + shown.length, rows.length)
            : text.count(0)}
        </span>
      </div>
      <div className="pnl table-wrap">
        {rows.length === 0 ? (
          <p className="empty">{text.empty}</p>
        ) : (
          <table className="rlist">
            <thead>
              <tr>
                <th scope="col">{text.columns.when}</th>
                <th scope="col">{text.columns.name}</th>
                <th scope="col">{text.columns.menu}</th>
                <th scope="col">{text.columns.kind}</th>
                <th scope="col">{text.columns.source}</th>
                <th scope="col">{text.columns.status}</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className={r.status}>
                  <td className="when">
                    <button type="button" onClick={() => onOpen(r.id)}>
                      {jpDate(parse(r.date))}
                      <span>{r.time}</span>
                    </button>
                  </td>
                  <td>
                    <b>{r.name}</b>
                    <small>{r.tel}</small>
                  </td>
                  <td>{r.menu}</td>
                  <td>{r.kind === "初診" && <span className="tag tag-first">{r.kind}</span>}</td>
                  <td>{adminPage.source[r.source]}</td>
                  <td>
                    <span className={`state ${r.status}`}>{adminPage.status[r.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pager current={current} last={last} onPage={goTo} />
    </>
  );
}
