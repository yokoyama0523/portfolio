export function Head({ title, text }: { title: string; text?: string }) {
  return (
    <div className="head">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
