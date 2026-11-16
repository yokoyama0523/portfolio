import { type InputHTMLAttributes, useEffect, useRef } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  onCommit: (value: string) => void;
};

export function CommitInput({ onCommit, ...rest }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const commit = useRef(onCommit);
  commit.current = onCommit;
  useEffect(() => {
    const input = ref.current;
    if (!input) return;
    const handle = () => commit.current(input.value);
    input.addEventListener("change", handle);
    return () => input.removeEventListener("change", handle);
  }, []);
  return <input ref={ref} {...rest} />;
}
