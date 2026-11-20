import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Form, Link, useLocation, useSearchParams } from "react-router";
import { useHydrated } from "~/samples/shared/useHydrated";
import { shop } from "../content/catalog";
import { paths } from "../content/paths";
import { shell } from "../content/shell";
import { useShop } from "../store/ShopContext";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "../ui/Icons";

const HIDE_AFTER_PX = 160;
const OVER_UNTIL_PX = 24;
const JITTER_PX = 6;
const MENU_ID = "ec-menu";

export function Header({ minimal = false, over = false }: { minimal?: boolean; over?: boolean }) {
  const { cart, wish, auth } = useShop();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  const search = useRef<HTMLInputElement>(null);
  const here = location.pathname + (hydrated ? location.search : "");
  const scroll = useScrollState();
  const bump = useBump(cart.count);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openSearch = () => {
    setOpen(true);
    window.setTimeout(() => search.current?.focus(), 0);
  };

  const classes = [
    "hd",
    open ? "nav-open" : "",
    !open && scroll.hidden ? "hide" : "",
    over && !open && scroll.top ? "over" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={classes}>
        <div className="hd-in">
          <div className="hd-l">
            <button
              type="button"
              className="burger"
              aria-expanded={open}
              aria-controls={MENU_ID}
              onClick={() => setOpen(!open)}
            >
              <span className="burger-lines" aria-hidden="true" />
              <span className="burger-text">{open ? shell.closeLabel : shell.menuLabel}</span>
            </button>
            {!minimal && (
              <button
                type="button"
                className="hd-icon"
                aria-label={shell.search.label}
                onClick={openSearch}
              >
                <SearchIcon />
              </button>
            )}
          </div>
          <Link className="logo" to={paths.home} onClick={() => setOpen(false)}>
            {shop.name}
          </Link>
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
      </header>
      <div className={open ? "drawer on" : "drawer"} id={MENU_ID} inert={!open}>
        <div className="drawer-in">
          <nav className="drawer-main" aria-label={shell.categoryLabel}>
            {shell.nav.map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                style={{ "--i": i } as CSSProperties}
                aria-current={here === item.to ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="drawer-side">
            {!minimal && (
              <Form
                className="search"
                action={paths.list()}
                role="search"
                onSubmit={() => setOpen(false)}
              >
                <input
                  ref={search}
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
            )}
            <nav className="drawer-sub" aria-label={shell.menuLabel}>
              {shell.drawerExtra.map((item) => (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

function useScrollState() {
  const [state, setState] = useState({ hidden: false, top: true });
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const read = () => {
      const y = window.scrollY;
      const top = y < OVER_UNTIL_PX;
      if (Math.abs(y - last) < JITTER_PX) {
        setState((s) => (s.top === top ? s : { ...s, top }));
        return;
      }
      setState({ hidden: y > last && y > HIDE_AFTER_PX, top });
      last = y;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return state;
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
