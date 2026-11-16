import "@fontsource-variable/noto-sans-jp";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/zen-maru-gothic/700.css";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import "./styles/base.css";

export default function DentalLayout() {
  return (
    <>
      <Outlet />
      <SampleCredit />
    </>
  );
}
