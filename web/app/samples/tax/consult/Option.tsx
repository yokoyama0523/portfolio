type Props = {
  name: string;
  value: string;
  title: string;
  note: string;
  checked: boolean;
  onSelect: (value: string) => void;
};

export function Option({ name, value, title, note, checked, onSelect }: Props) {
  return (
    <label className="opt">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
      />
      <b>{title}</b>
      <small>{note}</small>
    </label>
  );
}
