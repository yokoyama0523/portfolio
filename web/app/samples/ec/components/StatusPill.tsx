import { statusKey } from "../content/orderStatus";

export function StatusPill({ status, label = status }: { status: string; label?: string }) {
  return <span className={`pill ${statusKey(status)}`}>{label}</span>;
}
