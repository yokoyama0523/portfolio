import { sectionTitles } from "~/site/data/copy";
import { processSteps, stepNumber } from "~/site/data/process";
import { SectionTitle } from "./SectionTitle";

export function Process() {
  return (
    <section id="process" className="bg-smoke px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-content gap-14 md:grid-cols-aside md:gap-24">
        <SectionTitle {...sectionTitles.process} />
        <ol className="border-t border-rule">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className="group grid grid-cols-step gap-x-6 border-b border-rule py-8 md:grid-cols-step-wide"
            >
              <span className="font-latin text-base tracking-6 text-accent">{stepNumber(i)}</span>
              <span>
                <span className="block text-xl font-bold tracking-6 text-ink">{step.title}</span>
                <span className="mt-2 block text-sm leading-relaxed tracking-6 text-text">
                  {step.text}
                </span>
              </span>
              <span
                className="hidden size-12 place-items-center self-center rounded-full border border-rule-strong text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:grid"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path
                    d="M4 12h15m-6-6 6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
