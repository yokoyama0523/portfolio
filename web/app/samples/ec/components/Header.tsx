import { useEffect, useRef, useState } from "react";
import { Form, Link, useLocation, useSearchParams } from "react-router";
import { useHydrated } from "~/samples/shared/useHydrated";
import { shop } from "../content/catalog";
import { paths } from "../content/paths";
import { shell } from "../content/shell";
import { useShop } from "../store/ShopContext";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "../ui/Icons";

export function Header({ minimal = false }: { minimal?: boolean }) {
  const { cart, wish, auth } = useShop();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  const here = location.pathname + (hydrated ? location.search : "");
  const hidden = useHideOnScroll();
  const bump = useBump(cart.count);
  return (
    <header className={open ? "hd nav-open" : hidden ? "hd hide" : "hd"}>
      <div className="hd-in">
        <button
          type="button"
          className="burger"
          aria-label={shell.menuLabel}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
        </button>
        <Link className="logo" to={paths.home}>
          {shop.name}
        </Link>
        {!minimal && (
          <>
            <nav className="gnav" aria-label={shell.categoryLabel}>
              {shell.nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-current={here === item.to ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Form className="search" action={paths.list()} role="search">
              <input
                type="search"
                name="q"
                placeholder={shell.search.placeholder}
                aria-label={shell.search.label}
                defaultValue={hydrated ? (params.get("q") ?? "") : ""}
              />
              <button type="submit" aria-label={shell.search.submit}>
                <SearchIcon />
              </button>
            </Form>
          </>
        )}
        <div className="tools">
          {!minimal && (
            <>
              <Link to={paths.account()} aria-label={shell.tools.account}>
                <UserIcon />
                <span className="u">{auth.user?.name.split(" ")[0] ?? ""}</span>
              </Link>
              <Link to={paths.account("wish")} aria-label={shell.tools.wish}>
                <HeartIcon />
                {wish.ids.length > 0 && <b>{wish.ids.length}</b>}
              </Link>
            </>
          )}
          <Link to={paths.cart} aria-label={shell.tools.cart}>
            <BagIcon />
            {cart.count > 0 && (
              <b key={bump} className={bump ? "bump" : undefined}>
                {cart.count}
              </b>
            )}
          </Link>
        </div>
      </div>
      <div className="drawer">
        <nav aria-label={shell.menuLabel}>
          {[...shell.nav, ...shell.drawerExtra].map((item) => (
            <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

const HIDE_AFTER_PX = 160;
const JITTER_PX = 6;

function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) < JITTER_PX) return;
        setHidden(y > last && y > HIDE_AFTER_PX);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return hidden;
}

function useBump(count: number) {
  const before = useRef(count);
  const [bump, setBump] = useState(0);
  useEffect(() => {
    if (count > before.current) setBump((n) => n + 1);
    before.current = count;
  }, [count]);
  return bump;
}
