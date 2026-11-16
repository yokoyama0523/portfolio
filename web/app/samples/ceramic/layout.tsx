import "@fontsource/zen-kaku-gothic-antique/300.css";
import "@fontsource/zen-kaku-gothic-antique/400.css";
import "@fontsource/zen-kaku-gothic-antique/500.css";
import "@fontsource/zen-old-mincho/400.css";
import "@fontsource/zen-old-mincho/500.css";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import { CartProvider } from "./cart/CartContext";
import "./styles/base.css";

export default function CeramicLayout() {
  return (
    <CartProvider>
      <Outlet />
      <SampleCredit />
    </CartProvider>
  );
}
