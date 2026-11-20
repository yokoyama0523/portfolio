import type { CSSProperties } from "react";

const RISE_STEP_S = 0.04;

const HARD_SPACE = String.fromCharCode(0xa0);

const letters = (text: string, hardSpace = false) =>
  [...text].map((ch, i) => ({ ch: hardSpace && ch === " " ? HARD_SPACE : ch, id: `${i}-${ch}` }));

export const fadeUpClass = "animate-fade-up motion-reduce:animate-none";
export const delayStyle = (seconds: number): CSSProperties => ({
  animationDelay: `${seconds}s`,
});

export function RiseText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block overflow-hidden pb-descender -mb-descender">
        {letters(text, true).map((l, i) => (
          <span
            key={l.id}
            className="inline-block animate-rise motion-reduce:animate-none"
            style={delayStyle(delay + i * RISE_STEP_S)}
          >
            {l.ch}
          </span>
        ))}
      </span>
    </>
  );
}

export function ScrubLetters({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {letters(text).map((l) => (
          <span key={l.id} data-scrub-part>
            {l.ch}
          </span>
        ))}
      </span>
    </>
  );
}
