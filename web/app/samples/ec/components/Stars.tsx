const MAX = 5;

export function Stars({ value }: { value: number }) {
  return <span className="stars">{"★".repeat(value) + "☆".repeat(MAX - value)}</span>;
}
