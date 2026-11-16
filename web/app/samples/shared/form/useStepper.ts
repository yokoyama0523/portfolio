import { useState } from "react";

export function useStepper(first = 1) {
  const [step, setStep] = useState(first);
  const go = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { step, go };
}
