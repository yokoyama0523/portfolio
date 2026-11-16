import { type RefObject, useEffect, useState } from "react";

export function useScrolledPast(target: RefObject<HTMLElement | null>, offset = 0) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const update = () => {
      const element = target.current;
      if (element) setPast(window.scrollY > element.offsetHeight - offset);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [target, offset]);
  return past;
}
