import "@fontsource-variable/noto-serif-jp";
import "@fontsource/zen-kaku-gothic-new/400.css";
import "@fontsource/zen-kaku-gothic-new/500.css";
import "@fontsource/zen-kaku-gothic-new/700.css";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import "./styles/base.css";

export default function CorpLayout() {
  return (
    <>
      <Outlet />
      <SampleCredit />
    </>
  );
}
