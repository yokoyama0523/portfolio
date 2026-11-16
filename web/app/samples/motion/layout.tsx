import "@fontsource-variable/noto-sans-jp";
import "@fontsource-variable/schibsted-grotesk";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";

export default function MotionLayout() {
  return (
    <>
      <Outlet />
      <SampleCredit />
    </>
  );
}
