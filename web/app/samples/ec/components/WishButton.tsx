import type { ReactNode } from "react";
import { shell } from "../content/shell";
import { useShop } from "../store/ShopContext";
import { HeartIcon } from "../ui/Icons";
import { useToast } from "../ui/ToastContext";

type Props = { id: string; className: string; label?: string; children?: ReactNode };

export function WishButton({ id, className, label = shell.card.wish, children }: Props) {
  const { wish } = useShop();
  const toast = useToast();
  const on = wish.has(id);
  return (
    <button
      type="button"
      className={on ? `${className} on` : className}
      aria-label={children ? undefined : label}
      aria-pressed={on}
      onClick={(event) => {
        event.preventDefault();
        const added = wish.toggle(id);
        toast(added ? shell.toast.wishOn : shell.toast.wishOff);
      }}
    >
      <HeartIcon />
      {children}
    </button>
  );
}
