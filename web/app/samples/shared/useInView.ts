import { type RefObject, useEffect, useState } from "react";

export function useInView(target: RefObject<Element | null>, options?: IntersectionObserverInit) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const element = target.current;
    if (!element || seen) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setSeen(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, options, seen]);
  return seen;
}
