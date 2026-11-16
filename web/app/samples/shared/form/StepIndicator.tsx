type Props = {
  labels: readonly string[];
  step: number;
  format?: (n: number, label: string) => string;
  pastClass?: string;
};

const numbered = (n: number, label: string) => `${n}　${label}`;

export function StepIndicator({ labels, step, format = numbered, pastClass = "past" }: Props) {
  return (
    <ol className="steps">
      {labels.map((label, i) => {
        const n = i + 1;
        const state = n === step ? "on" : n < step ? pastClass : undefined;
        return (
          <li key={label} className={state} aria-current={n === step ? "step" : undefined}>
            {format(n, label)}
          </li>
        );
      })}
    </ol>
  );
}
