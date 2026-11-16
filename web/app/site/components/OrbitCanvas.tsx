import { useEffect, useRef } from "react";
import { themeColor } from "~/site/hooks/themeColor";
import { reducedMotion } from "~/site/hooks/useMotion";
import { startOrbit } from "./orbit/renderer";
import { LIFT } from "./orbit/timeline";

const hidden = { transform: `translate3d(0, ${LIFT}%, 0)` };

const setDarkMv = (dark: boolean) => {
  if (dark) document.documentElement.dataset.mv = "dark";
  else delete document.documentElement.dataset.mv;
};

export function OrbitCanvas({ message, tagline }: { message: string; tagline: readonly string[] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const list = message.split(" ");

  useEffect(() => {
    if (!canvas.current) return;
    return startOrbit({
      canvas: canvas.current,
      words: words.current,
      lines: lines.current,
      colors: { ink: themeColor("charcoal"), paper: themeColor("white") },
      onTone: setDarkMv,
      still: reducedMotion(),
    });
  }, []);

  return (
    <>
      <canvas ref={canvas} className="block size-full" />
      <h1 className="pointer-events-none absolute inset-0 grid place-items-center px-5 font-latin text-2xl font-medium leading-none tracking-1 text-charcoal md:text-4xl">
        <span className="flex flex-wrap justify-center gap-x-word-gap">
          {list.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-descender">
              {i > 0 && " "}
              <span
                ref={(el) => {
                  words.current[i] = el;
                }}
                className="block opacity-0 will-change-transform"
                style={hidden}
              >
                {w}
              </span>
            </span>
          ))}
        </span>
      </h1>
      <p className="pointer-events-none absolute inset-0 grid place-items-center px-5 text-center text-sm font-medium leading-relaxed tracking-14 text-charcoal md:text-3xl md:tracking-16">
        <span className="block">
          {tagline.map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <span
                ref={(el) => {
                  lines.current[i] = el;
                }}
                className="block opacity-0 will-change-transform"
                style={hidden}
              >
                {l}
              </span>
            </span>
          ))}
        </span>
      </p>
    </>
  );
}
