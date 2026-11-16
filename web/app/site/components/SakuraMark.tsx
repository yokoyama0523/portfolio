const PETAL_ANGLES = [0, 72, 144, 216, 288];
const PETAL =
  "M0 -1.2 C -3.4 -3.2 -4.2 -8.2 -1.7 -10.6 L 0 -9.2 L 1.7 -10.6 C 4.2 -8.2 3.4 -3.2 0 -1.2 Z";
const CENTER_RADIUS = 1.3;

export function SakuraPetals({ centerClassName }: { centerClassName: string }) {
  return (
    <>
      {PETAL_ANGLES.map((deg) => (
        <path key={deg} transform={`rotate(${deg})`} d={PETAL} fill="currentColor" />
      ))}
      <circle r={CENTER_RADIUS} className={centerClassName} />
    </>
  );
}
