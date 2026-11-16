import { Link } from "react-router";
import { company } from "../content/company";
import { quote } from "../content/quote";
import type { QuoteForm } from "./useQuoteForm";

const text = quote.done;

export function DonePane({ form }: { form: QuoteForm }) {
  const summary =
    form.mode === "quote"
      ? `${text.files(form.drawings.length)}　／　${text.duePrefix} ${form.due}`
      : `${form.slot}　／　${form.people}`;
  return (
    <section className="pane fin">
      <h2>{quote.modes[form.mode].doneTitle}</h2>
      <div className="no">
        <small>{text.number}</small>
        <span>{form.receipt}</span>
      </div>
      <p className="when">{summary}</p>
      <div className="box">
        {form.mode === "quote" ? (
          <>
            <b>{text.quote.title}</b>
            <ol>
              {text.quote.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </>
        ) : (
          <>
            <b>{text.visit.title}</b>
            {text.visit.text}
          </>
        )}
      </div>
      <p className="back">
        <Link className="btn g" to={company.paths.home}>
          {text.back}
        </Link>
      </p>
    </section>
  );
}
