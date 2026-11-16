export function Lines({ lines, always = [] }: { lines: string[]; always?: number[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 && (
            <br className={always.includes(i) ? undefined : "hidden md:inline"} />
          )}
        </span>
      ))}
    </>
  );
}
