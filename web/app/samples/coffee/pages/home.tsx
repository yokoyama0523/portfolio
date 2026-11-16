import { type CSSProperties, useCallback, useState } from "react";
import { sampleMeta } from "~/samples/shared/meta";
import { Toast } from "~/samples/shared/Toast";
import { useActiveSection } from "~/samples/shared/useActiveSection";
import { useCart } from "../cart/CartContext";
import { Bean } from "../components/home/Bean";
import { Brew } from "../components/home/Brew";
import { Drawer } from "../components/home/Drawer";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Shop } from "../components/home/Shop";
import { Subscription } from "../components/home/Subscription";
import { Visual } from "../components/home/Visual";
import { home, type Scene } from "../content/home";
import { type ProductId, products } from "../content/store";
import "../styles/home.css";

export const meta = () => sampleMeta("coffee", home.meta);

const observe = { rootMargin: "-45% 0px -45% 0px" };

const scenes: Record<string, Scene> = {
  hero: home.hero.scene,
  ...Object.fromEntries(home.beans.map((bean) => [bean.id, bean.scene])),
  [home.subscription.id]: home.subscription.scene,
  [home.brew.id]: home.brew.scene,
  [home.shop.id]: home.shop.scene,
};

export default function CoffeeHome() {
  const { active, refs } = useActiveSection<Scene>(scenes, home.hero.scene, observe);
  const { change } = useCart();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", stamp: 0 });
  const close = useCallback(() => setOpen(false), []);

  const add = (id: ProductId) => {
    change(id, 1);
    setToast({ message: home.added(products[id].name), stamp: Date.now() });
  };

  return (
    <>
      <Header onOpenCart={() => setOpen(true)} />
      <div className="page" style={{ "--roast": `var(--${active.tone})` } as CSSProperties}>
        <Visual scene={active} />
        <main className="right">
          <Hero sectionRef={refs.hero} />
          {home.beans.map((bean, index) => (
            <Bean
              key={bean.id}
              bean={bean}
              index={index}
              sectionRef={refs[bean.id]}
              onAdd={() => add(bean.id)}
            />
          ))}
          <Subscription sectionRef={refs[home.subscription.id]} />
          <Brew sectionRef={refs[home.brew.id]} />
          <Shop sectionRef={refs[home.shop.id]} />
        </main>
      </div>
      <Drawer open={open} onClose={close} />
      <Toast message={toast.message} stamp={toast.stamp} />
    </>
  );
}
