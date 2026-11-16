import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router";

const SHOWN_MS = 2600;

type Toast = { message: string; link?: { to: string; label: string }; stamp: number };

const ToastContext = createContext<((message: string, link?: Toast["link"]) => void) | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [visible, setVisible] = useState(false);
  const show = useCallback((message: string, link?: Toast["link"]) => {
    setToast({ message, link, stamp: Date.now() });
  }, []);
  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), SHOWN_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return (
    <ToastContext value={show}>
      {children}
      <div className={visible ? "toast on" : "toast"} role="status">
        {toast?.message}
        {toast?.link && <Link to={toast.link.to}>{toast.link.label}</Link>}
      </div>
    </ToastContext>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}
