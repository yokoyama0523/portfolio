import { consult } from "../content/consult";

export function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="steps">
      {consult.steps.map((label, i) => {
        const n = i + 1;
        const state = n === step ? "on" : n < step ? "past" : undefined;
        return (
          <li key={label} className={state} aria-current={n === step ? "step" : undefined}>
            {n}　{label}
          </li>
        );
      })}
    </ol>
  );
}
