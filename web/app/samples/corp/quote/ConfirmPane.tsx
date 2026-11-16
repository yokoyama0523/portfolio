import { Fragment } from "react";
import { quote } from "../content/quote";
import { summaryRows } from "./summary";
import { type QuoteForm, STEP } from "./useQuoteForm";

export function ConfirmPane({ form }: { form: QuoteForm }) {
  const mode = quote.modes[form.mode];
  return (
    <section className="pane">
      <fieldset>
        <legend>{quote.confirm.legend}</legend>
        <div className="sum">
          <dl>
            {summaryRows(form).map((row) => (
              <Fragment key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.value}
                  <button type="button" className="edit" onClick={() => form.go(row.step)}>
                    {quote.confirm.edit}
                  </button>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
        <p className="hint confirm-hint">{mode.confirmNote}</p>
      </fieldset>
      <div className="nav">
        <button type="button" className="btn g" onClick={() => form.go(STEP.contact)}>
          {quote.back}
        </button>
        <button type="submit" className="btn">
          {mode.submit}
        </button>
      </div>
    </section>
  );
}
