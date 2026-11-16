import { Summary } from "~/samples/shared/form/Summary";
import { quote } from "../content/quote";
import { summaryRows } from "./summary";
import { type QuoteForm, STEP } from "./useQuoteForm";

export function ConfirmPane({ form }: { form: QuoteForm }) {
  const mode = quote.modes[form.mode];
  return (
    <section className="pane">
      <fieldset>
        <legend>{quote.confirm.legend}</legend>
        <Summary rows={summaryRows(form)} editLabel={quote.confirm.edit} onEdit={form.go} />
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
