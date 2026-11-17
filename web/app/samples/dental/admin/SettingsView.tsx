import { useState } from "react";
import { jpDate } from "~/samples/shared/dates";
import { adminPage } from "../content/admin";
import { clinicActions, defaultSettings, type Settings, toTime } from "./store";

const text = adminPage.settings;
const DAYS = ["日", "月", "火", "水", "木", "金", "土"];
const ORDER = [1, 2, 3, 4, 5, 6, 0];

const timeOptions = (from: number, to: number) => {
  const list: string[] = [];
  for (let t = from; t <= to; t += 30) list.push(toTime(t));
  return list;
};

const AM = timeOptions(8 * 60, 13 * 60 + 30);
const PM = timeOptions(13 * 60, 21 * 60);
const SLOTS = [15, 30, 60];
const CHAIRS = [1, 2, 3, 4, 5];

const parse = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

function TimeSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="sel" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </label>
  );
}

export function SettingsView({ settings }: { settings: Settings }) {
  const [draft, setDraft] = useState(settings);
  const [holiday, setHoliday] = useState("");
  const [message, setMessage] = useState("");

  const set = (patch: Partial<Settings>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setMessage("");
  };

  const toggle = (day: number, part: "am" | "pm") =>
    set({
      week: draft.week.map((value, i) => (i === day ? { ...value, [part]: !value[part] } : value)),
    });

  const addHoliday = () => {
    if (!holiday || draft.holidays.includes(holiday)) return;
    set({ holidays: [...draft.holidays, holiday].sort() });
    setHoliday("");
  };

  const save = () => {
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
        <p className="lead">{text.weekLead}</p>
        <table className="week">
          <thead>
            <tr>
              <td />
              {ORDER.map((day) => (
                <th key={day} scope="col" className={day === 0 ? "sun" : day === 6 ? "sat" : ""}>
                  {DAYS[day]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["am", "pm"] as const).map((part) => (
              <tr key={part}>
                <th scope="row">{text[part]}</th>
                {ORDER.map((day) => (
                  <td key={day}>
                    <input
                      type="checkbox"
                      aria-label={`${DAYS[day]} ${text[part]}`}
                      checked={draft.week[day][part]}
                      onChange={() => toggle(day, part)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="pnl">
        <h2>{text.timesTitle}</h2>
        <div className="grid-fields">
          <TimeSelect
            id="s-am-start"
            label={text.amStart}
            value={draft.amStart}
            options={AM}
            onChange={(amStart) => set({ amStart })}
          />
          <TimeSelect
            id="s-am-end"
            label={text.amEnd}
            value={draft.amEnd}
            options={AM}
            onChange={(amEnd) => set({ amEnd })}
          />
          <TimeSelect
            id="s-pm-start"
            label={text.pmStart}
            value={draft.pmStart}
            options={PM}
            onChange={(pmStart) => set({ pmStart })}
          />
          <TimeSelect
            id="s-pm-end"
            label={text.pmEnd}
            value={draft.pmEnd}
            options={PM}
            onChange={(pmEnd) => set({ pmEnd })}
          />
          <TimeSelect
            id="s-we-end"
            label={text.weekendPmEnd}
            value={draft.weekendPmEnd}
            options={PM}
            onChange={(weekendPmEnd) => set({ weekendPmEnd })}
          />
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
        <button type="button" className="btn" onClick={save}>
          {text.save}
        </button>
        <span className="ok" role="status">
          {message}
        </span>
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
