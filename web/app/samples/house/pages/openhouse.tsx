import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { sampleMeta } from "~/samples/shared/meta";
import { openhouse } from "../content/openhouse";
import { ConfirmPane } from "../openhouse/ConfirmPane";
import { ContactPane } from "../openhouse/ContactPane";
import { DonePane } from "../openhouse/DonePane";
import { EventCard } from "../openhouse/EventCard";
import { FamilyPane } from "../openhouse/FamilyPane";
import { Header } from "../openhouse/Header";
import { SchedulePane } from "../openhouse/SchedulePane";
import { STEP, useOpenhouseForm } from "../openhouse/useOpenhouseForm";
import "../styles/openhouse.css";

export const meta = () => sampleMeta("house", openhouse.meta);

const panes = {
  [STEP.schedule]: SchedulePane,
  [STEP.family]: FamilyPane,
  [STEP.contact]: ContactPane,
  [STEP.confirm]: ConfirmPane,
  [STEP.done]: DonePane,
};

export default function HouseOpenhouse() {
  const form = useOpenhouseForm();
  const Pane = panes[form.step as keyof typeof panes];
  return (
    <>
      <Header />
      <main>
        <h1>{openhouse.title}</h1>
        <p className="lead">{openhouse.lead}</p>
        <EventCard />
        <StepIndicator labels={openhouse.steps} step={form.step} />
        <form noValidate onSubmit={form.submit}>
          <Pane form={form} />
        </form>
      </main>
      <footer className="ft">{openhouse.footer}</footer>
    </>
  );
}
