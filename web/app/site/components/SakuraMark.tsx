import { CENTER_RADIUS, PETAL_ANGLES, PETAL_PATH } from "./sakuraShape";

export function SakuraPetals({ centerClassName }: { centerClassName: string }) {
  return (
    <>
      {PETAL_ANGLES.map((deg) => (
        <path key={deg} transform={`rotate(${deg})`} d={PETAL_PATH} fill="currentColor" />
      ))}
      <circle r={CENTER_RADIUS} className={centerClassName} />
    </>
  );
}
