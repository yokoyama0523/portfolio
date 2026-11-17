import { jpDate, ymd } from "~/samples/shared/dates";
import { Sentences } from "../components/Sentences";
import { reserve } from "../content/reserve";
import { availability, calendar, dayRange, rangeLabel, slotsFor } from "./calendar";
import { type ReserveForm, STEP } from "./useReserveForm";

const text = reserve.date;
const headClass = (i: number) =>
  i === 0 ? "d sun" : i === calendar.dayNames.length - 1 ? "d sat" : "d";

function Calendar({ form }: { form: ReserveForm }) {
  const { today, weekStart, date } = form;
  if (!today || !weekStart) return null;
  return (
    <>
      <div className="calhead">
        <button type="button" disabled={!form.canGoBack} onClick={() => form.moveWeek(-1)}>
          {text.prev}
        </button>
        <span>{rangeLabel(weekStart)}</span>
        <button type="button" disabled={!form.canGoForward} onClick={() => form.moveWeek(1)}>
          {text.next}
        </button>
      </div>
      <div className="cal">
        {calendar.dayNames.map((day, i) => (
          <div key={day} className={headClass(i)}>
            {day}
          </div>
        ))}
        {dayRange(weekStart).map((day) => {
          const state = availability(day, today);
          const picked = date && ymd(date) === ymd(day);
          const classes = [state === "x" ? "" : state, picked ? "on" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={ymd(day)}
              type="button"
              disabled={state === "x"}
              className={classes || undefined}
              onClick={() => form.pickDate(day)}
            >
              <span>{day.getDate()}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function Slots({ form }: { form: ReserveForm }) {
  const { date } = form;
  if (!date) return <p className="hint">{text.pickDayFirst}</p>;
  return (
    <>
      {slotsFor(date).map((slot) => (
        <button
          key={slot.time}
          type="button"
          disabled={!slot.open}
          className={form.time === slot.time ? "on" : undefined}
          onClick={() => form.setTime(slot.time)}
        >
          {slot.time}
        </button>
      ))}
    </>
  );
}

export function DatePane({ form }: { form: ReserveForm }) {
  const { date, time } = form;
  const picked = date ? `${jpDate(date)}　${time ?? text.pickTime}` : text.nothingPicked;
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <p className="hint">
          <Sentences text={text.hint} />
        </p>
        <Calendar form={form} />
      </fieldset>
      <fieldset>
        <legend>{text.timeLegend}</legend>
        <div className="slots">
          <Slots form={form} />
        </div>
        <div className="pick">
          {text.picked}
          <b>{picked}</b>
        </div>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.menu)}>
          {reserve.back}
        </button>
        <button
          type="button"
          className="btn"
          disabled={!(date && time)}
          onClick={() => form.go(STEP.contact)}
        >
          {text.nextStep}
        </button>
      </div>
    </section>
  );
}
