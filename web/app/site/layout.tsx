import "@fontsource-variable/outfit";
import "@fontsource/m-plus-rounded-1c/300.css";
import "@fontsource/m-plus-rounded-1c/400.css";
import "@fontsource/m-plus-rounded-1c/500.css";
import "@fontsource/m-plus-rounded-1c/700.css";
import { Outlet, useLocation } from "react-router";
import { Footer } from "~/site/components/Footer";
import { Header } from "~/site/components/Header";
import { MotionRoot } from "~/site/components/MotionRoot";
import "./app.css";

export default function SiteLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <MotionRoot key={pathname} />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
