import "@fontsource-variable/bodoni-moda";
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import { ShopProvider } from "./store/ShopContext";
import "./styles/base.css";
import "./styles/motion.css";
import { ToastProvider } from "./ui/ToastContext";

export default function EcLayout() {
  return (
    <ShopProvider>
      <ToastProvider>
        <Outlet />
        <SampleCredit />
      </ToastProvider>
    </ShopProvider>
  );
}
