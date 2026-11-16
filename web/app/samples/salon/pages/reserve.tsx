import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { sampleMeta } from "~/samples/shared/meta";
import { reserve } from "../content/reserve";
import { ConfirmPane } from "../reserve/ConfirmPane";
import { ContactPane } from "../reserve/ContactPane";
import { DatePane } from "../reserve/DatePane";
import { DonePane } from "../reserve/DonePane";
import { Header } from "../reserve/Header";
import { MenuPane } from "../reserve/MenuPane";
import { StylistPane } from "../reserve/StylistPane";
import { STEP, useReserveForm } from "../reserve/useReserveForm";
import "../styles/reserve.css";

export const meta = () => sampleMeta("salon", reserve.meta);

const panes = {
  [STEP.menu]: MenuPane,
  [STEP.stylist]: StylistPane,
  [STEP.date]: DatePane,
  [STEP.contact]: ContactPane,
  [STEP.confirm]: ConfirmPane,
  [STEP.done]: DonePane,
};

export default function SalonReserve() {
  const form = useReserveForm();
  const Pane = panes[form.step as keyof typeof panes];
  return (
    <>
      <Header />
      <main>
        <h1>{reserve.title}</h1>
        <p className="lead">{reserve.lead}</p>
        <StepIndicator
          labels={reserve.steps}
          step={form.step}
          format={reserve.stepLabel}
          pastClass="done"
        />
        <form noValidate onSubmit={form.submit}>
          <Pane form={form} />
        </form>
      </main>
      <footer className="ft">{reserve.footer}</footer>
    </>
  );
}
