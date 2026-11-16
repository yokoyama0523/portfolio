import type { Product } from "../../content/catalog";
import { itemPage as text } from "../../content/item";
import { Measurements } from "../Measurements";

export function SizeGuide({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={open ? "modal on" : "modal"}
      role="dialog"
      aria-modal="true"
      aria-label={text.modal.label}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div className="bx">
        <button type="button" className="x" onClick={onClose}>
          {text.modal.close}
        </button>
        <h2>{text.modal.title}</h2>
        <Measurements product={product} />
        <p className="note modal-note">{text.modal.note}</p>
      </div>
    </div>
  );
}
