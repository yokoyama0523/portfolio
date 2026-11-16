import { Img } from "~/samples/shared/Img";
import { openhouse } from "../content/openhouse";

const { event } = openhouse;

export function EventCard() {
  return (
    <div className="ev">
      <div className="im">
        <Img image={event.image} priority />
      </div>
      <div>
        <h2>{event.title}</h2>
        <p>{event.when}</p>
        <p>{event.text}</p>
      </div>
    </div>
  );
}
