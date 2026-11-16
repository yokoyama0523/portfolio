import { pickPrefecture, prefectures } from "../content/prefectures";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: string;
  error?: string;
  invalid?: boolean;
};

export function PrefectureField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  invalid = false,
}: Props) {
  return (
    <div>
      <label className="t" htmlFor={id}>
        {label}
        {required && <em>{required}</em>}
      </label>
      <select
        id={id}
        name={id}
        required
        aria-invalid={invalid}
        className={invalid ? "bad" : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{pickPrefecture}</option>
        {prefectures.map((pref) => (
          <option key={pref}>{pref}</option>
        ))}
      </select>
      {error && <div className="errmsg">{error}</div>}
    </div>
  );
}
