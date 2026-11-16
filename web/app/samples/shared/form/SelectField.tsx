type Props = {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SelectField({ id, label, options, value, onChange, className }: Props) {
  return (
    <div className={className}>
      <label className="t" htmlFor={id}>
        {label}
      </label>
      <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
