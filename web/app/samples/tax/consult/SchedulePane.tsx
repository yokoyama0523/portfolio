import { addDays, jpDate, monthDay, shortDate, ymd } from "~/samples/shared/dates";
import { consult } from "../content/consult";
import { calendar, openSlots, vacancy, weekdaysFrom } from "./booking";
import { Option } from "./Option";
import { type ConsultForm, STEP } from "./useConsultForm";

const text = consult.schedule;

function Calendar({ form }: { form: ConsultForm }) {
  const { today, weekStart, date } = form;
  if (!today || !weekStart) return null;
  return (
    <>
      <div className="calhead">
        <button type="button" disabled={!form.canGoBack} onClick={() => form.moveWeek(-1)}>
          {text.prevWeek}
        </button>
        <span>
          {monthDay(weekStart)} 〜 {monthDay(addDays(weekStart, calendar.lastShownOffset))}
        </span>
        <button type="button" disabled={!form.canGoForward} onClick={() => form.moveWeek(1)}>
          {text.nextWeek}
        </button>
      </div>
      <div className="cal">
        {calendar.weekdays.map((day) => (
          <div key={day} className="d">
            {day}
          </div>
        ))}
        {weekdaysFrom(weekStart).map((day) => {
          const open = vacancy(day, today);
          return (
            <button
              key={ymd(day)}
              type="button"
              disabled={!open}
              className={date && ymd(date) === ymd(day) ? "on" : undefined}
              onClick={() => form.pickDate(day)}
            >
              <span>{shortDate(day)}</span>
              <small>{text.vacancy(open)}</small>
            </button>
          );
        })}
      </div>
    </>
  );
}

function Slots({ form }: { form: ConsultForm }) {
  const { date, today } = form;
  if (!date || !today) return <p className="hint">{text.pickDayFirst}</p>;
  const open = openSlots(date, today);
  return (
    <>
      {calendar.slots.map((slot, i) => (
        <button
          key={slot}
          type="button"
          disabled={!open.has(i)}
          className={form.time === slot ? "on" : undefined}
          onClick={() => form.setTime(slot)}
        >
          {slot}
          {text.from}
        </button>
      ))}
    </>
  );
}

export function SchedulePane({ form }: { form: ConsultForm }) {
  const { date, time } = form;
  const picked = date
    ? `${jpDate(date)}　${time ? `${time}${text.from}` : text.pickTime}`
    : text.nothingPicked;
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.howLegend}</legend>
        <div className="opts">
          {text.how.map((option) => (
            <Option
              key={option.value}
              name="how"
              {...option}
              checked={form.values.how === option.value}
              onSelect={(value) => form.update("how", value)}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.dateLegend}</legend>
        <p className="hint">{text.dateHint}</p>
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
        <button type="button" className="btn g" onClick={() => form.go(STEP.topic)}>
          {consult.back}
        </button>
        <button
          type="button"
          className="btn"
          disabled={!(date && time)}
          onClick={() => form.go(STEP.contact)}
        >
          {text.next}
        </button>
      </div>
    </section>
  );
}
