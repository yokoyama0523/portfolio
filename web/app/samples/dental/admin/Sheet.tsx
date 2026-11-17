import { type ReactNode, useEffect } from "react";
import { adminPage } from "../content/admin";

type Props = { title: string; onClose: () => void; children: ReactNode };

export function Sheet({ title, onClose, children }: Props) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className="drawer-layer">
      <button
        type="button"
        className="scrim"
        aria-label={adminPage.drawer.close}
        onClick={onClose}
      />
      <aside className="drawer" aria-label={title}>
        <div className="drawer-head">
          <h2>{title}</h2>
          <button type="button" className="ghost" onClick={onClose}>
            {adminPage.drawer.close}
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
