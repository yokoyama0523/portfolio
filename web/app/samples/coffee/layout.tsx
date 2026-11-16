import "@fontsource-variable/noto-sans-jp";
import "@fontsource-variable/space-grotesk";
import { Outlet } from "react-router";
import { SampleCredit } from "~/samples/shared/SampleCredit";
import { CartProvider } from "./cart/CartContext";
import "./styles/base.css";

export default function CoffeeLayout() {
  return (
    <CartProvider>
      <Outlet />
      <SampleCredit />
    </CartProvider>
  );
}
