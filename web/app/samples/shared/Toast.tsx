import { useEffect, useState } from "react";

const SHOWN_MS = 1800;

type Props = { message: string; stamp: number; className?: string };

export function Toast({ message, stamp, className = "toast" }: Props) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!stamp) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), SHOWN_MS);
    return () => window.clearTimeout(timer);
  }, [stamp]);
  return (
    <div className={visible ? `${className} on` : className} role="status">
      {message}
    </div>
  );
}
