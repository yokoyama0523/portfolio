import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { Lines } from "~/samples/shared/Lines";
import { sampleMeta } from "~/samples/shared/meta";
import { Logo } from "../components/Logo";
import { Sentences } from "../components/Sentences";
import { clinic } from "../content/clinic";
import { reserve } from "../content/reserve";
import { ConfirmPane } from "../reserve/ConfirmPane";
import { ContactPane } from "../reserve/ContactPane";
import { DatePane } from "../reserve/DatePane";
import { DonePane } from "../reserve/DonePane";
import { MenuPane } from "../reserve/MenuPane";
import { STEP, useReserveForm } from "../reserve/useReserveForm";
import "../styles/reserve.css";

export const meta = () => sampleMeta("dental", reserve.meta);

const panes = {
  [STEP.menu]: MenuPane,
  [STEP.date]: DatePane,
  [STEP.contact]: ContactPane,
  [STEP.confirm]: ConfirmPane,
  [STEP.done]: DonePane,
};

export default function DentalReserve() {
  const form = useReserveForm();
  const Pane = panes[form.step as keyof typeof panes];
  return (
    <>
      <header className="rhd">
        <Logo />
        <p className="rhd-tel">
          <small>{reserve.telLabel}</small>
          <a href={clinic.telHref}>{clinic.tel}</a>
        </p>
      </header>
      <main className="rmain">
        <h1 className="h1">{reserve.title}</h1>
        <p className="prose">
          <Lines lines={reserve.lead} />
        </p>
        <StepIndicator labels={reserve.steps} step={form.step} pastClass="done" />
        <form noValidate onSubmit={form.submit}>
          <Pane form={form} />
        </form>
      </main>
      <footer className="rft">
        <Sentences text={reserve.footer} />
      </footer>
    </>
  );
}
