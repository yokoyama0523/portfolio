import "@fontsource/shippori-mincho/500.css";
import "@fontsource/shippori-mincho/600.css";
import "@fontsource/zen-kaku-gothic-new/400.css";
import "@fontsource/zen-kaku-gothic-new/500.css";
import "@fontsource/zen-kaku-gothic-new/700.css";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import { DemoSwitch } from "./components/DemoSwitch";
import "./styles/base.css";

export default function DentalLayout() {
  return (
    <div className="mdb">
      <Outlet />
      <SampleCredit />
      <DemoSwitch />
    </div>
  );
}
