import { useRef, useState } from "react";

type Validators<V> = Partial<Record<keyof V, (value: string) => boolean>>;

export function useFields<V extends Record<string, string>>(initial: V, validators: Validators<V>) {
  const [values, setValues] = useState(initial);
  const [invalid, setInvalid] = useState<(keyof V)[]>([]);
  const refs = useRef<Partial<Record<keyof V, HTMLInputElement | null>>>({});
  const required = Object.keys(validators) as (keyof V)[];

  const update = (field: keyof V, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    const check = validators[field];
    if (!check) return;
    const bad = value !== "" && !check(value);
    setInvalid((current) =>
      bad ? [...new Set([...current, field])] : current.filter((f) => f !== field),
    );
  };

  const validate = () => {
    const bad = required.filter((field) => !validators[field]?.(values[field]));
    setInvalid(bad);
    if (bad.length) refs.current[bad[0]]?.focus();
    return bad.length === 0;
  };

  const register = (field: keyof V) => (element: HTMLInputElement | null) => {
    refs.current[field] = element;
  };

  const focus = (field: keyof V) => refs.current[field]?.focus();
  const isRequired = (field: keyof V) => required.includes(field);
  const isInvalid = (field: keyof V) => invalid.includes(field);

  return { values, update, validate, register, focus, isRequired, isInvalid };
}
