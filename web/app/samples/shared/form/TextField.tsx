import type { HTMLInputTypeAttribute } from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: string;
  error?: string;
  invalid?: boolean;
  inputRef?: (element: HTMLInputElement | null) => void;
  className?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
  invalid = false,
  inputRef,
  className,
}: Props) {
  return (
    <div className={className}>
      <label className="t" htmlFor={id}>
        {label}
        {required && <em>{required}</em>}
      </label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={id}
        required={Boolean(required)}
        aria-invalid={invalid}
        aria-describedby={error ? `${id}-error` : undefined}
        className={invalid ? "bad" : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && (
        <div className="errmsg" id={`${id}-error`}>
          {error}
        </div>
      )}
    </div>
  );
}
