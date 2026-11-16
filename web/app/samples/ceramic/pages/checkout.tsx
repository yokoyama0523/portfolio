import { Link } from "react-router";
import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { sampleMeta } from "~/samples/shared/meta";
import { ConfirmPane } from "../checkout/ConfirmPane";
import { DeliveryPane } from "../checkout/DeliveryPane";
import { DonePane } from "../checkout/DonePane";
import { ExtrasPane } from "../checkout/ExtrasPane";
import { Side } from "../checkout/Side";
import { STEP, useCheckout } from "../checkout/useCheckout";
import { checkout } from "../content/checkout";
import { store } from "../content/store";
import "../styles/checkout.css";

export const meta = () => sampleMeta("ceramic", checkout.meta);

const panes = {
  [STEP.delivery]: DeliveryPane,
  [STEP.extras]: ExtrasPane,
  [STEP.confirm]: ConfirmPane,
  [STEP.done]: DonePane,
};

export default function CeramicCheckout() {
  const form = useCheckout();
  const Pane = panes[form.step as keyof typeof panes];
  return (
    <>
      <header className="hd">
        <Link className="logo" to={store.paths.home}>
          {store.name}
        </Link>
        <small>{checkout.sub}</small>
      </header>
      <main>
        <div>
          <h1>{checkout.title}</h1>
          <p className="lead">{checkout.lead}</p>
          <StepIndicator labels={checkout.steps} step={form.step} format={checkout.stepLabel} />
          <form noValidate onSubmit={form.submit}>
            <Pane form={form} />
          </form>
        </div>
        <Side form={form} />
      </main>
      <footer className="ft">{checkout.footer}</footer>
    </>
  );
}
