import { Link } from "react-router";
import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { sampleMeta } from "~/samples/shared/meta";
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
      <header className="hd">
        <Link className="logo" to={clinic.paths.home}>
          <span className="mark" aria-hidden="true" />
          <b>{clinic.name}</b>
        </Link>
        <div className="tel">
          {reserve.telLabel}
          <b className="number">{clinic.tel}</b>
        </div>
      </header>
      <main>
        <h1>{reserve.title}</h1>
        <p className="lead">{reserve.lead}</p>
        <StepIndicator labels={reserve.steps} step={form.step} pastClass="done" />
        <form noValidate onSubmit={form.submit}>
          <Pane form={form} />
        </form>
      </main>
      <footer className="ft">{reserve.footer}</footer>
    </>
  );
}
