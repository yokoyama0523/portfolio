import "@fontsource-variable/noto-sans-jp";
import "@fontsource/shippori-mincho/500.css";
import "@fontsource/shippori-mincho/700.css";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import "./styles/base.css";

export default function HouseLayout() {
  return (
    <>
      <Outlet />
      <SampleCredit />
    </>
  );
}
