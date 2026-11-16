import { quote } from "../content/quote";
import type { QuoteForm } from "./useQuoteForm";

const text = quote.visit;

export function VisitFields({ form }: { form: QuoteForm }) {
  return (
    <div className="mode">
      <fieldset>
        <legend>{text.slotLegend}</legend>
        <p className="hint">{text.slotHint}</p>
        <div className="slots">
          {form.slots.map((slot) => (
            <label key={slot.label} className="slot">
              <input
                type="radio"
                name="slot"
                value={slot.label}
                disabled={slot.full}
                checked={form.slot === slot.label}
                onChange={() => form.setSlot(slot.label)}
              />
              <b>{slot.title}</b>
              <small>{slot.full ? text.full : text.open}</small>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.interestLegend}</legend>
        <div className="opts">
          {text.interests.map((interest) => (
            <label key={interest} className="opt">
              <input
                type="checkbox"
                value={interest}
                checked={form.interests.includes(interest)}
                onChange={() => form.toggleInterest(interest)}
              />
              {interest}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.peopleLegend}</legend>
        <select
          className="people"
          aria-label={text.peopleLegend}
          value={form.people}
          onChange={(event) => form.setPeople(event.target.value)}
        >
          {text.people.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </fieldset>
    </div>
  );
}
