import type { CSSProperties } from "react";
import { addDays, jpDate, startOfToday, ymd } from "~/samples/shared/dates";
import { adminPage } from "../content/admin";
import { isClosed, type Reservation, type Settings, slotTimes, toMinutes, toTime } from "./store";

const text = adminPage.day;

export type Slot = { date: string; time: string; chair: number };

type Props = {
  date: Date;
  reservations: Reservation[];
  settings: Settings;
  onDate: (date: Date) => void;
  onOpen: (id: string) => void;
  onNew: (slot: Slot) => void;
};

type Row = { kind: "slot"; time: string } | { kind: "break" };

const buildRows = (times: string[], step: number) => {
  const rows: Row[] = [];
  times.forEach((time, i) => {
    if (i > 0 && toMinutes(time) !== toMinutes(times[i - 1]) + step) rows.push({ kind: "break" });
    rows.push({ kind: "slot", time });
  });
  return rows;
};

function Kpis({ list, free }: { list: Reservation[]; free: number }) {
  const active = list.filter((r) => r.status !== "cancelled");
  const items = [
    { label: text.kpis.total, value: active.length },
    { label: text.kpis.first, value: active.filter((r) => r.kind === "初診").length },
    { label: text.kpis.arrived, value: list.filter((r) => r.status === "arrived").length },
    { label: text.kpis.cancelled, value: list.filter((r) => r.status === "cancelled").length },
    { label: text.kpis.free, value: free },
  ];
  return (
    <dl className="kpis">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Appointment({ r, onOpen }: { r: Reservation; onOpen: (id: string) => void }) {
  const end = toTime(toMinutes(r.time) + r.minutes);
  return (
    <button type="button" className={`appt ${r.status}`} onClick={() => onOpen(r.id)}>
      <span className="appt-l1">
        <span className="appt-time">
          {r.time}〜{end}
        </span>
        <b>{r.name}</b>
      </span>
      <span className="appt-l2">
        {r.kind === "初診" && <span className="tag first">{r.kind}</span>}
        <span className="tag">{adminPage.source[r.source]}</span>
        {r.status === "arrived" && <span className="tag done">{adminPage.status.arrived}</span>}
        <span className="appt-menu">{r.menu}</span>
      </span>
    </button>
  );
}

export function DayView({ date, reservations, settings, onDate, onOpen, onNew }: Props) {
  const day = ymd(date);
  const list = reservations
    .filter((r) => r.date === day)
    .sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
  const active = list.filter((r) => r.status !== "cancelled");
  const cancelled = list.filter((r) => r.status === "cancelled");
  const times = slotTimes(date, settings);
  const step = settings.slotMinutes;
  const rows = buildRows(times, step);
  const rowOf = new Map<string, number>();
  rows.forEach((row, i) => {
    if (row.kind === "slot") rowOf.set(row.time, i + 2);
  });

  const covered = new Set<string>();
  for (const time of times) {
    const start = toMinutes(time);
    for (const r of active) {
      const own = toMinutes(r.time);
      if (own < start + step && start < own + r.minutes) covered.add(`${time}-${r.chair}`);
    }
  }
  const rowFor = (time: string) => {
    const at = times.find(
      (slot) => toMinutes(slot) <= toMinutes(time) && toMinutes(time) < toMinutes(slot) + step,
    );
    return at ? rowOf.get(at) : undefined;
  };
  const placed = active.filter((r) => rowFor(r.time) !== undefined && r.chair <= settings.chairs);
  const outside = active.filter((r) => !placed.includes(r));
  const chairs = Array.from({ length: settings.chairs }, (_, i) => i + 1);
  const free = times.reduce(
    (sum, time) => sum + chairs.filter((chair) => !covered.has(`${time}-${chair}`)).length,
    0,
  );
  const grid = {
    gridTemplateColumns: `4.5em repeat(${settings.chairs}, minmax(0, 1fr))`,
    gridTemplateRows: ["auto", ...rows.map((row) => (row.kind === "break" ? "18px" : "56px"))].join(
      " ",
    ),
  } as CSSProperties;

  return (
    <>
      <div className="toolbar">
        <div className="daynav">
          <button type="button" className="ghost" onClick={() => onDate(addDays(date, -1))}>
            {text.prev}
          </button>
          <h2>{jpDate(date)}</h2>
          <button type="button" className="ghost" onClick={() => onDate(addDays(date, 1))}>
            {text.next}
          </button>
          <button type="button" className="ghost" onClick={() => onDate(startOfToday())}>
            {text.today}
          </button>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() =>
            onNew({ date: day, time: times[0] ?? settings.week[date.getDay()].am.start, chair: 1 })
          }
        >
          {text.add}
        </button>
      </div>
      <Kpis list={list} free={free} />
      {isClosed(date, settings) ? (
        <p className="pnl empty">{text.closed}</p>
      ) : (
        <div className="pnl board-wrap">
          <div className="board" style={grid}>
            <div className="corner" />
            {chairs.map((chair) => (
              <div key={chair} className="chair-head">
                {adminPage.chair(chair)}
              </div>
            ))}
            {rows.map((row, i) =>
              row.kind === "break" ? (
                <div
                  key={`break-${times[i] ?? i}`}
                  className="break"
                  style={{ gridRow: i + 2, gridColumn: "1 / -1" }}
                />
              ) : (
                <div key={row.time} className="time" style={{ gridRow: i + 2 }}>
                  {row.time}
                </div>
              ),
            )}
            {times.flatMap((time) =>
              chairs
                .filter((chair) => !covered.has(`${time}-${chair}`))
                .map((chair) => (
                  <button
                    type="button"
                    key={`${time}-${chair}`}
                    className="cell"
                    style={{ gridRow: rowOf.get(time), gridColumn: chair + 1 }}
                    aria-label={text.emptyCell(time, chair)}
                    onClick={() => onNew({ date: day, time, chair })}
                  />
                )),
            )}
            {placed.map((r) => (
              <div
                key={r.id}
                className="appt-slot"
                style={{
                  gridRow: `${rowFor(r.time)} / span ${Math.max(1, Math.ceil(r.minutes / step))}`,
                  gridColumn: r.chair + 1,
                }}
              >
                <Appointment r={r} onOpen={onOpen} />
              </div>
            ))}
          </div>
        </div>
      )}
      {outside.length > 0 && (
        <div className="pnl outside">
          <h3>{text.outsideTitle}</h3>
          <p className="lead">{text.outsideLead}</p>
          <ul className="cancel-list">
            {outside.map((r) => (
              <li key={r.id}>
                <button type="button" onClick={() => onOpen(r.id)}>
                  <span>{r.time}</span>
                  <b>{r.name}</b>
                  <span>{r.menu}</span>
                  <span>{adminPage.chair(r.chair)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cancelled.length > 0 && (
        <div className="pnl">
          <h3>{text.cancelledTitle}</h3>
          <ul className="cancel-list">
            {cancelled.map((r) => (
              <li key={r.id}>
                <button type="button" onClick={() => onOpen(r.id)}>
                  <span>{r.time}</span>
                  <b>{r.name}</b>
                  <span>{r.menu}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
