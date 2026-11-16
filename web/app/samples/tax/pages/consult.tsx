import { sampleMeta } from "~/samples/shared/meta";
import { ConfirmPane } from "../consult/ConfirmPane";
import { ContactPane } from "../consult/ContactPane";
import { DonePane } from "../consult/DonePane";
import { Header } from "../consult/Header";
import { SchedulePane } from "../consult/SchedulePane";
import { StepIndicator } from "../consult/StepIndicator";
import { TopicPane } from "../consult/TopicPane";
import { STEP, useConsultForm } from "../consult/useConsultForm";
import { consult } from "../content/consult";
import "../styles/consult.css";

export const meta = () => sampleMeta("tax", consult.meta);

const panes = {
  [STEP.topic]: TopicPane,
  [STEP.schedule]: SchedulePane,
  [STEP.contact]: ContactPane,
  [STEP.confirm]: ConfirmPane,
  [STEP.done]: DonePane,
};

export default function TaxConsult() {
  const form = useConsultForm();
  const Pane = panes[form.step as keyof typeof panes];
  return (
    <>
      <Header />
      <main>
        <h1>{consult.title}</h1>
        <p className="lead">{consult.lead}</p>
        <StepIndicator step={form.step} />
        <form noValidate onSubmit={form.submit}>
          <Pane form={form} />
        </form>
      </main>
      <footer className="ft">{consult.footer}</footer>
    </>
  );
}
