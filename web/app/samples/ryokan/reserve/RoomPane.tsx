import { jpDate } from "~/samples/shared/dates";
import { Choice } from "~/samples/shared/form/Choice";
import { Img } from "~/samples/shared/Img";
import { reserve } from "../content/reserve";
import { yen } from "../content/rooms";
import { isoToDate } from "./availability";
import { STEP, type StayForm } from "./useStayForm";

const text = reserve.room;

function Bill({ form }: { form: StayForm }) {
  const { room, bill } = form;
  if (!room || !bill) {
    return (
      <div className="bill">
        <div>
          <span>{text.noRoom}</span>
        </div>
      </div>
    );
  }
  const kids = Number(form.kids);
  return (
    <div className="bill">
      <div>
        <span>{text.adultsLine(room.name, form.adults, form.nights)}</span>
        <span>{yen(bill.adults)}</span>
      </div>
      {kids > 0 && (
        <div>
          <span>
            {text.kidsLine(kids, form.nights)}
            <small>{text.kidsNote}</small>
          </span>
          <span>{yen(bill.kids)}</span>
        </div>
      )}
      <div>
        <span>
          {text.taxLabel}
          <small>{text.taxNote(form.people, form.nights)}</small>
        </span>
        <span>{yen(bill.tax)}</span>
      </div>
      <div className="t">
        <span>{text.totalLabel}</span>
        <span>{yen(form.total)}</span>
      </div>
    </div>
  );
}

export function RoomPane({ form }: { form: StayForm }) {
  const stayLabel = form.date
    ? text.stayHint(jpDate(isoToDate(form.date)), form.nights, form.adults, Number(form.kids))
    : "";
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <p className="hint">{stayLabel}</p>
        <div className="rooms">
          {form.choices.map(({ room, available, reason }) => (
            <label key={room.id} className="room">
              <input
                type="radio"
                name="room"
                value={room.id}
                disabled={!available}
                checked={form.room?.id === room.id}
                onChange={() => form.setRoomId(room.id)}
              />
              <div className="im">
                <Img image={room.image} />
              </div>
              <div>
                <h3>
                  {room.name}
                  <small className="count">{room.count}</small>
                </h3>
                <p>{room.text}</p>
                <p>{text.capacity(room.capacity)}</p>
              </div>
              <div className="pr">
                {available ? (
                  <>
                    <b className="price">{yen(room.price)}</b>
                    <small className="per">{text.perNight}</small>
                  </>
                ) : (
                  <span className="full">{reason}</span>
                )}
              </div>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.dinnerLegend}</legend>
        <div className="opts">
          {text.dinners.map((time) => (
            <Choice
              key={time}
              type="radio"
              name="dinner"
              value={time}
              checked={form.dinner === time}
              onChange={() => form.setDinner(time)}
            >
              {time}
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.pickupLegend}</legend>
        <div className="opts">
          {text.pickups.map((pickup) => (
            <Choice
              key={pickup}
              type="radio"
              name="pickup"
              value={pickup}
              checked={form.pickup === pickup}
              onChange={() => form.setPickup(pickup)}
            >
              {pickup}
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.billLegend}</legend>
        <Bill form={form} />
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.stay)}>
          {reserve.back}
        </button>
        <button
          type="button"
          className="btn"
          disabled={!form.room}
          onClick={() => form.go(STEP.guest)}
        >
          {text.next}
        </button>
      </div>
    </section>
  );
}
