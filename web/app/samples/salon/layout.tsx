import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/noto-sans-jp";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import "./styles/base.css";

export default function SalonLayout() {
  return (
    <>
      <Outlet />
      <SampleCredit />
    </>
  );
}
