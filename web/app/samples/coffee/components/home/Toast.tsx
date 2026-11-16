import { useEffect, useState } from "react";

const SHOWN_MS = 1800;

export function Toast({ message, stamp }: { message: string; stamp: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!stamp) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), SHOWN_MS);
    return () => window.clearTimeout(timer);
  }, [stamp]);
  return (
    <div className={visible ? "toast on" : "toast"} role="status">
      {message}
    </div>
  );
}
