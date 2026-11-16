import { useEffect, useMemo, useRef, useState } from "react";

const options = { rootMargin: "-40% 0px -40% 0px" };

export function useActiveSection<T>(sections: Record<string, T>, initial: T) {
  const [active, setActive] = useState(initial);
  const elements = useRef(new Map<Element, T>());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const watcher = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const section = entry.isIntersecting ? elements.current.get(entry.target) : undefined;
        if (section) setActive(section);
      }
    }, options);
    observer.current = watcher;
    for (const element of elements.current.keys()) watcher.observe(element);
    return () => watcher.disconnect();
  }, []);

  const refs = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(sections).map(([id, section]) => [
          id,
          (element: HTMLElement | null) => {
            if (!element) return;
            elements.current.set(element, section);
            observer.current?.observe(element);
            return () => {
              elements.current.delete(element);
              observer.current?.unobserve(element);
            };
          },
        ]),
      ),
    [sections],
  );

  return { active, refs };
}
