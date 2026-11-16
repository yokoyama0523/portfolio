import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { sampleMeta } from "~/samples/shared/meta";
import { reserve } from "../content/reserve";
import { ConfirmPane } from "../reserve/ConfirmPane";
import { DonePane } from "../reserve/DonePane";
import { GuestPane } from "../reserve/GuestPane";
import { Header } from "../reserve/Header";
import { RoomPane } from "../reserve/RoomPane";
import { StayPane } from "../reserve/StayPane";
import { STEP, useStayForm } from "../reserve/useStayForm";
import "../styles/reserve.css";

export const meta = () => sampleMeta("ryokan", reserve.meta);

const panes = {
  [STEP.stay]: StayPane,
  [STEP.room]: RoomPane,
  [STEP.guest]: GuestPane,
  [STEP.confirm]: ConfirmPane,
  [STEP.done]: DonePane,
};

export default function RyokanReserve() {
  const form = useStayForm();
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
