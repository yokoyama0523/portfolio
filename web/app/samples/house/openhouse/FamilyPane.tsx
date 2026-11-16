import { Choice } from "~/samples/shared/form/Choice";
import { SelectField } from "~/samples/shared/form/SelectField";
import { openhouse } from "../content/openhouse";
import { type OpenhouseForm, STEP } from "./useOpenhouseForm";

const text = openhouse.family;

export function FamilyPane({ form }: { form: OpenhouseForm }) {
  return (
    <section className="pane">
      <fieldset>
        <legend>{text.legend}</legend>
        <p className="hint">{text.hint}</p>
        <div className="f">
          <SelectField id="adults" {...text.adults} value={form.adults} onChange={form.setAdults} />
          <SelectField id="kids" {...text.kids} value={form.kids} onChange={form.setKids} />
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.stageLegend}</legend>
        <div className="opts">
          {text.stages.map((stage) => (
            <Choice
              key={stage}
              type="radio"
              name="stage"
              value={stage}
              checked={form.stage === stage}
              onChange={() => form.setStage(stage)}
            >
              {stage}
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.interestLegend}</legend>
        <div className="opts">
          {text.interests.map((interest) => (
            <Choice
              key={interest}
              type="checkbox"
              name="interest"
              value={interest}
              checked={form.interests.includes(interest)}
              onChange={() => form.toggleInterest(interest)}
            >
              {interest}
            </Choice>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{text.accessLegend}</legend>
        <div className="opts">
          {text.access.map((option) => (
            <Choice
              key={option.value}
              type="radio"
              name="access"
              value={option.value}
              checked={form.access === option.value}
              onChange={() => form.setAccess(option.value)}
            >
              {option.label}
            </Choice>
          ))}
        </div>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.schedule)}>
          {openhouse.back}
        </button>
        <button type="button" className="btn" onClick={() => form.go(STEP.contact)}>
          {text.next}
        </button>
      </div>
    </section>
  );
}
