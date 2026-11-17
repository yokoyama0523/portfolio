import { useState } from "react";
import { jpDate, ymd } from "~/samples/shared/dates";
import { adminPage } from "../content/admin";
import type { Slot } from "./DayView";
import { Sheet } from "./Sheet";
import {
  clinicActions,
  fits,
  freeChairs,
  type Kind,
  newId,
  type Reservation,
  type Settings,
  slotTimes,
} from "./store";

const text = adminPage.drawer;
const L = text.labels;

const parse = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

type Data = { reservations: Reservation[]; settings: Settings };

function When({
  data,
  date,
  time,
  minutes,
  chair,
  ignore,
  onDate,
  onTime,
  onChair,
}: {
  data: Data;
  date: string;
  time: string;
  minutes: number;
  chair: number;
  ignore?: string;
  onDate: (value: string) => void;
  onTime: (value: string) => void;
  onChair: (value: number) => void;
}) {
  const day = parse(date);
  const times = slotTimes(day, data.settings);
  const chairs = fits(day, time, minutes, data.settings)
    ? freeChairs(data, date, time, minutes, ignore)
    : [];
  return (
    <div className="when-fields">
      <label>
        <span>{L.date}</span>
        <input
          type="date"
          value={date}
          onChange={(e) => e.target.value && onDate(e.target.value)}
        />
      </label>
      <label>
        <span>{L.time}</span>
        <select value={time} onChange={(e) => onTime(e.target.value)}>
          {times.length === 0 && <option value={time}>{text.empty}</option>}
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>{L.chair}</span>
        <select value={chair} onChange={(e) => onChair(Number(e.target.value))}>
          {chairs.length === 0 && <option value={chair}>{text.empty}</option>}
          {chairs.map((c) => (
            <option key={c} value={c}>
              {adminPage.chair(c)}
            </option>
          ))}
        </select>
      </label>
      {chairs.length === 0 && <p className="warn">{text.noFree}</p>}
    </div>
  );
}

function Detail({ r, data }: { r: Reservation; data: Data }) {
  const [date, setDate] = useState(r.date);
  const [time, setTime] = useState(r.time);
  const [chair, setChair] = useState(r.chair);
  const [note, setNote] = useState(r.note);
  const [saved, setSaved] = useState("");
  const free = freeChairs(data, date, time, r.minutes, r.id);
  const canMove =
    fits(parse(date), time, r.minutes, data.settings) &&
    free.includes(chair) &&
    (date !== r.date || time !== r.time || chair !== r.chair);
  const rows = [
    [L.id, r.id],
    [L.when, `${jpDate(parse(r.date))}　${r.time}（${adminPage.minutes(r.minutes)}）`],
    [L.chair, adminPage.chair(r.chair)],
    [L.menu, r.menu],
    [L.kind, r.kind],
    [L.name, r.name],
    [L.kana, r.kana],
    [L.tel, r.tel],
    [L.email, r.email || text.empty],
    [L.birth, r.birth || text.empty],
    [L.who, r.who],
    [L.source, adminPage.source[r.source]],
    [L.createdAt, jpDate(parse(r.createdAt))],
  ];
  return (
    <>
      <p className={`state ${r.status}`}>{adminPage.status[r.status]}</p>
      <dl className="detail-list">
        {rows.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="actions">
        {r.status === "booked" && (
          <>
            <button
              type="button"
              className="btn"
              onClick={() => clinicActions.change(r.id, { status: "arrived" })}
            >
              {text.arrive}
            </button>
            <button
              type="button"
              className="btn line"
              onClick={() => clinicActions.change(r.id, { status: "cancelled" })}
            >
              {text.cancel}
            </button>
          </>
        )}
        {r.status !== "booked" && (
          <button
            type="button"
            className="btn line"
            onClick={() => clinicActions.change(r.id, { status: "booked" })}
          >
            {text.restore}
          </button>
        )}
      </div>
      {r.status === "booked" && (
        <section className="block">
          <h3>{text.moveTitle}</h3>
          <When
            data={data}
            date={date}
            time={time}
            minutes={r.minutes}
            chair={chair}
            ignore={r.id}
            onDate={setDate}
            onTime={setTime}
            onChair={setChair}
          />
          <button
            type="button"
            className="btn line"
            disabled={!canMove}
            onClick={() => clinicActions.change(r.id, { date, time, chair })}
          >
            {text.move}
          </button>
        </section>
      )}
      <section className="block">
        <h3>{L.note}</h3>
        <textarea
          aria-label={L.note}
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setSaved("");
          }}
        />
        <div className="row">
          <button
            type="button"
            className="btn line"
            onClick={() => {
              clinicActions.change(r.id, { note });
              setSaved(text.saved);
            }}
          >
            {text.saveNote}
          </button>
          <span className="ok" role="status">
            {saved}
          </span>
        </div>
      </section>
    </>
  );
}

function NewForm({ slot, data, onDone }: { slot: Slot; data: Data; onDone: (id: string) => void }) {
  const [date, setDate] = useState(slot.date);
  const [time, setTime] = useState(slot.time);
  const [chair, setChair] = useState(slot.chair);
  const [minutes, setMinutes] = useState(30);
  const [kind, setKind] = useState<Kind>("再診");
  const [menu, setMenu] = useState(text.menus[0]);
  const [name, setName] = useState("");
  const [kana, setKana] = useState("");
  const [tel, setTel] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const create = () => {
    const ok =
      name.trim() &&
      fits(parse(date), time, minutes, data.settings) &&
      freeChairs(data, date, time, minutes).includes(chair);
    if (!ok) {
      setError(name.trim() ? text.noFree : text.required);
      return;
    }
    const id = newId(date);
    clinicActions.add({
      id,
      date,
      time,
      minutes,
      chair,
      kind,
      menu,
      name: name.trim(),
      kana: kana.trim(),
      tel: tel.trim(),
      email: "",
      birth: "",
      who: "本人",
      note: note.trim(),
      status: "booked",
      source: "tel",
      createdAt: ymd(new Date()),
    });
    onDone(id);
  };

  return (
    <div className="new">
      <When
        data={data}
        date={date}
        time={time}
        minutes={minutes}
        chair={chair}
        onDate={setDate}
        onTime={setTime}
        onChair={setChair}
      />
      <div className="when-fields">
        <label>
          <span>{L.length}</span>
          <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
            {text.lengths.map((n) => (
              <option key={n} value={n}>
                {adminPage.minutes(n)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{L.kind}</span>
          <select value={kind} onChange={(e) => setKind(e.target.value as Kind)}>
            {text.kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="wide">
          <span>{L.menu}</span>
          <select value={menu} onChange={(e) => setMenu(e.target.value)}>
            {text.menus.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="when-fields">
        <label className="wide">
          <span>{L.name}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="wide">
          <span>{L.kana}</span>
          <input value={kana} onChange={(e) => setKana(e.target.value)} />
        </label>
        <label className="wide">
          <span>{L.tel}</span>
          <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
        </label>
        <label className="wide">
          <span>{L.note}</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
      </div>
      <p className="warn" role="alert">
        {error}
      </p>
      <button type="button" className="btn" onClick={create}>
        {text.create}
      </button>
    </div>
  );
}

type Props = {
  data: Data;
  openId: string | null;
  slot: Slot | null;
  onClose: () => void;
  onCreated: (id: string) => void;
};

export function Drawer({ data, openId, slot, onClose, onCreated }: Props) {
  const reservation = data.reservations.find((r) => r.id === openId) ?? null;
  if (!reservation && !slot) return null;
  return (
    <Sheet title={reservation ? reservation.name : text.newTitle} onClose={onClose}>
      {reservation ? (
        <Detail key={reservation.id + reservation.status} r={reservation} data={data} />
      ) : (
        slot && (
          <NewForm
            key={`${slot.date}${slot.time}${slot.chair}`}
            slot={slot}
            data={data}
            onDone={onCreated}
          />
        )
      )}
    </Sheet>
  );
}
