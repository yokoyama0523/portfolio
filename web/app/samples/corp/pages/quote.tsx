import { sampleMeta } from "~/samples/shared/meta";
import { quote } from "../content/quote";
import { ConfirmPane } from "../quote/ConfirmPane";
import { ContactPane } from "../quote/ContactPane";
import { DonePane } from "../quote/DonePane";
import { Header } from "../quote/Header";
import { ModeTabs } from "../quote/ModeTabs";
import { QuoteFields } from "../quote/QuoteFields";
import { StepIndicator } from "../quote/StepIndicator";
import { STEP, useQuoteForm } from "../quote/useQuoteForm";
import { VisitFields } from "../quote/VisitFields";
import "../styles/quote.css";

export const meta = () => sampleMeta("corp", quote.meta);

export default function CorpQuote() {
  const form = useQuoteForm();
  const mode = quote.modes[form.mode];
  return (
    <>
      <Header />
      <main>
        <h1>{mode.title}</h1>
        <p className="lead">{mode.lead}</p>
        <ModeTabs mode={form.mode} onChange={form.setMode} />
        <StepIndicator step={form.step} />
        <form noValidate onSubmit={form.submit}>
          {form.step === STEP.content && (
            <section className="pane">
              {form.mode === "quote" ? <QuoteFields form={form} /> : <VisitFields form={form} />}
              <div className="nav">
                <span />
                <button type="button" className="btn" onClick={form.leaveContent}>
                  {quote.next.content}
                </button>
              </div>
            </section>
          )}
          {form.step === STEP.contact && <ContactPane form={form} />}
          {form.step === STEP.confirm && <ConfirmPane form={form} />}
          {form.step === STEP.done && <DonePane form={form} />}
        </form>
      </main>
      <footer className="ft">{quote.footer}</footer>
    </>
  );
}
