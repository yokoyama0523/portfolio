import "@fontsource-variable/noto-sans-jp";
import "@fontsource-variable/outfit";
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
