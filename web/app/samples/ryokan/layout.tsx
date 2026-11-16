import "@fontsource-variable/noto-sans-jp";
import "@fontsource/kaisei-tokumin/400.css";
import "@fontsource/kaisei-tokumin/500.css";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import "./styles/base.css";

export default function RyokanLayout() {
  return (
    <>
      <Outlet />
      <SampleCredit />
    </>
  );
}
