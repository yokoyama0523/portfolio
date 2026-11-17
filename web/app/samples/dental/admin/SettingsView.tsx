import { useState } from "react";
import { jpDate } from "~/samples/shared/dates";
import { Lines } from "~/samples/shared/Lines";
import { adminPage } from "../content/admin";
import { DAY_NAMES, WEEK_ORDER } from "./hours";
import {
  clinicActions,
  defaultSettings,
  type Part,
  type Session,
  type Settings,
  toMinutes,
  toTime,
} from "./store";

const text = adminPage.settings;
const PARTS: Part[] = ["am", "pm"];

const timeOptions = (from: number, to: number) => {
  const list: string[] = [];
  for (let t = from; t <= to; t += 30) list.push(toTime(t));
  return list;
};

const TIMES = timeOptions(7 * 60, 22 * 60);
const SLOTS = [15, 30, 60];
const CHAIRS = [1, 2, 3, 4, 5];

const parse = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const problems = (settings: Settings) =>
  WEEK_ORDER.flatMap((day) => {
    const { am, pm } = settings.week[day];
    const name = DAY_NAMES[day];
    const list = PARTS.filter((part) => {
      const s = settings.week[day][part];
      return s.open && toMinutes(s.end) <= toMinutes(s.start);
    }).map((part) => text.orderError(name, text[part]));
    if (am.open && pm.open && toMinutes(pm.start) < toMinutes(am.end))
      list.push(text.overlapError(name));
    return list;
  });

function SessionFields({
  day,
  part,
  session,
  onChange,
}: {
  day: number;
  part: Part;
  session: Session;
  onChange: (session: Session) => void;
}) {
  const name = DAY_NAMES[day];
  return (
    <div className={session.open ? "session" : "session off"}>
      <input
        type="checkbox"
        aria-label={text.openLabel(name, text[part])}
        checked={session.open}
        onChange={() => onChange({ ...session, open: !session.open })}
      />
      <select
        aria-label={text.start(name, text[part])}
        value={session.start}
        disabled={!session.open}
        onChange={(e) => onChange({ ...session, start: e.target.value })}
      >
        {TIMES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <span aria-hidden="true">{text.to}</span>
      <select
        aria-label={text.end(name, text[part])}
        value={session.end}
        disabled={!session.open}
        onChange={(e) => onChange({ ...session, end: e.target.value })}
      >
        {TIMES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}

export function SettingsView({ settings }: { settings: Settings }) {
  const [draft, setDraft] = useState(settings);
  const [holiday, setHoliday] = useState("");
  const [message, setMessage] = useState("");
  const errors = problems(draft);

  const set = (patch: Partial<Settings>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setMessage("");
  };

  const setSession = (day: number, part: Part, session: Session) =>
    set({
      week: draft.week.map((value, i) => (i === day ? { ...value, [part]: session } : value)),
    });

  const addHoliday = () => {
    if (!holiday || draft.holidays.includes(holiday)) return;
    set({ holidays: [...draft.holidays, holiday].sort() });
    setHoliday("");
  };

  const save = () => {
    if (errors.length > 0) return;
    clinicActions.saveSettings(draft);
    setMessage(text.saved);
  };

  const reset = () => {
    if (!window.confirm(text.resetConfirm)) return;
    clinicActions.reset();
    setDraft(defaultSettings);
    setMessage("");
  };

  return (
    <>
      <section className="pnl">
        <h2>{text.weekTitle}</h2>
        <p className="lead">
          <Lines lines={text.weekLead} />
        </p>
        <div className="week-wrap">
          <table className="week">
            <thead>
              <tr>
                <th scope="col">{text.day}</th>
                <th scope="col">{text.am}</th>
                <th scope="col">{text.pm}</th>
              </tr>
            </thead>
            <tbody>
              {WEEK_ORDER.map((day) => (
                <tr key={day}>
                  <th scope="row" className={day === 0 ? "sun" : day === 6 ? "sat" : undefined}>
                    {DAY_NAMES[day]}
                  </th>
                  {PARTS.map((part) => (
                    <td key={part} data-label={text[part]}>
                      <SessionFields
                        day={day}
                        part={part}
                        session={draft.week[day][part]}
                        onChange={(session) => setSession(day, part, session)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="pnl">
        <h2>{text.slotTitle}</h2>
        <div className="grid-fields">
          <label className="sel" htmlFor="s-slot">
            <span>{text.slotMinutes}</span>
            <select
              id="s-slot"
              value={draft.slotMinutes}
              onChange={(e) => set({ slotMinutes: Number(e.target.value) })}
            >
              {SLOTS.map((n) => (
                <option key={n} value={n}>
                  {adminPage.minutes(n)}
                </option>
              ))}
            </select>
          </label>
          <label className="sel" htmlFor="s-chairs">
            <span>{text.chairs}</span>
            <select
              id="s-chairs"
              value={draft.chairs}
              onChange={(e) => set({ chairs: Number(e.target.value) })}
            >
              {CHAIRS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="sel" htmlFor="s-ahead">
            <span>{text.lookahead}</span>
            <select
              id="s-ahead"
              value={draft.lookaheadDays}
              onChange={(e) => set({ lookaheadDays: Number(e.target.value) })}
            >
              {text.lookaheadOptions.map((n) => (
                <option key={n} value={n}>
                  {text.days(n)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>
      <section className="pnl">
        <h2>{text.holidaysTitle}</h2>
        <div className="row">
          <input
            type="date"
            aria-label={text.holidaysTitle}
            value={holiday}
            onChange={(e) => setHoliday(e.target.value)}
          />
          <button type="button" className="btn line" onClick={addHoliday}>
            {text.holidayAdd}
          </button>
        </div>
        <ul className="holidays">
          {draft.holidays.map((date) => (
            <li key={date}>
              {jpDate(parse(date))}
              <button
                type="button"
                className="ghost"
                onClick={() => set({ holidays: draft.holidays.filter((d) => d !== date) })}
              >
                {text.holidayRemove}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <div className="save-bar">
        <button type="button" className="btn" disabled={errors.length > 0} onClick={save}>
          {text.save}
        </button>
        {errors.length > 0 ? (
          <ul className="warn" role="alert">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : (
          <span className="ok" role="status">
            {message}
          </span>
        )}
      </div>
      <section className="pnl">
        <h2>{text.resetTitle}</h2>
        <p className="lead">{text.resetLead}</p>
        <button type="button" className="btn line" onClick={reset}>
          {text.reset}
        </button>
      </section>
    </>
  );
}
