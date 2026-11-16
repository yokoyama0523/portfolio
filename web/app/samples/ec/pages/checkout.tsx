import { StepIndicator } from "~/samples/shared/form/StepIndicator";
import { sampleMeta } from "~/samples/shared/meta";
import { AddressPane } from "../checkout/AddressPane";
import { ConfirmPane } from "../checkout/ConfirmPane";
import { DeliveryPane } from "../checkout/DeliveryPane";
import { DonePane } from "../checkout/DonePane";
import { PaymentPane } from "../checkout/PaymentPane";
import { Summary } from "../checkout/Summary";
import { STEP, useCheckout } from "../checkout/useCheckout";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { checkoutPage as text } from "../content/checkout";
import "../styles/checkout.css";

export const meta = () => sampleMeta("ec", text.meta);

const panes = {
  [STEP.address]: AddressPane,
  [STEP.delivery]: DeliveryPane,
  [STEP.payment]: PaymentPane,
  [STEP.confirm]: ConfirmPane,
};

export default function EcCheckout() {
  const form = useCheckout();
  const Pane = panes[form.step as keyof typeof panes];
  return (
    <>
      <Header minimal />
      <main className="wrap">
        {form.placed ? (
          <DonePane order={form.placed} form={form} />
        ) : (
          <>
            <h1 className="ttl">{text.title}</h1>
            <div className="lay">
              <div>
                <StepIndicator labels={text.steps} step={form.step} format={text.stepLabel} />
                <form onSubmit={form.submit} noValidate>
                  <Pane form={form} />
                </form>
              </div>
              <Summary form={form} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
