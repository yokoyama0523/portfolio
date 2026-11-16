import { Link } from "react-router";
import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { sampleMeta } from "~/samples/shared/meta";
import { ConfirmPane } from "../checkout/ConfirmPane";
import { DeliveryPane } from "../checkout/DeliveryPane";
import { DonePane } from "../checkout/DonePane";
import { PaymentPane } from "../checkout/PaymentPane";
import { Side } from "../checkout/Side";
import { STEP, useCheckout } from "../checkout/useCheckout";
import { checkout } from "../content/checkout";
import { store } from "../content/store";
import "../styles/checkout.css";

export const meta = () => sampleMeta("coffee", checkout.meta);

const panes = {
  [STEP.delivery]: DeliveryPane,
  [STEP.payment]: PaymentPane,
  [STEP.confirm]: ConfirmPane,
  [STEP.done]: DonePane,
};

export default function CoffeeCheckout() {
  const form = useCheckout();
  const Pane = panes[form.step as keyof typeof panes];
  const mode = form.subscribing ? checkout.subscription : checkout.order;
  return (
    <>
      <header className="hd">
        <Link className="logo" to={store.paths.home}>
          {store.name}
        </Link>
        <small>{checkout.secure}</small>
      </header>
      <main>
        <div>
          <h1>{mode.title}</h1>
          <p className="lead">{mode.lead}</p>
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
