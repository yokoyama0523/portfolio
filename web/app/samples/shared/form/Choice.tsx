import type { ReactNode } from "react";

type Props = {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  className?: string;
  children: ReactNode;
};

export function Choice({
  type,
  name,
  value,
  checked,
  disabled,
  onChange,
  className = "opt",
  children,
}: Props) {
  return (
    <label className={className}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {children}
    </label>
  );
}
