import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ymd } from "~/samples/shared/dates";
import { shop } from "../content/catalog";
import { orderStatus } from "../content/orderStatus";
import { cartTotals, productById } from "./pricing";
import { seedOrders, seedUsers } from "./seed";
import { type StockOverrides, skuKey, stockOf } from "./stock";
import { clearAll, read, write } from "./storage";
import type { CartLine, Order, OrderItem, Settings, User } from "./types";

const RECENT_LIMIT = 8;
const ORDER_SERIAL_BASE = 1000;

const defaultSettings: Settings = {
  shipping: shop.shipping,
  freeShippingFrom: shop.freeShippingFrom,
  coupons: shop.coupons,
};

type State = {
  loaded: boolean;
  settings: Settings;
  stock: StockOverrides;
  cart: CartLine[];
  coupon: string;
  wish: string[];
  users: Record<string, User>;
  session: string | null;
  orders: Order[];
  recent: string[];
  admin: boolean;
};

const empty: State = {
  loaded: false,
  settings: defaultSettings,
  stock: {},
  cart: [],
  coupon: "",
  wish: [],
  users: {},
  session: null,
  orders: [],
  recent: [],
  admin: false,
};

const load = (): State => {
  if (!read("seeded", 0)) {
    write("users", seedUsers());
    write("orders", seedOrders(new Date()));
    write("seeded", 1);
  }
  return {
    loaded: true,
    settings: read("settings", defaultSettings),
    stock: read("stock", {}),
    cart: read<CartLine[]>("cart", []).filter((line) => productById[line.id]),
    coupon: read("coupon", ""),
    wish: read<string[]>("wish", []).filter((id) => productById[id]),
    users: read("users", {}),
    session: read("session", null),
    orders: read("orders", []),
    recent: read<string[]>("recent", []).filter((id) => productById[id]),
    admin: read("admin", false),
  };
};

const storageKeys: Record<keyof Omit<State, "loaded">, string> = {
  settings: "settings",
  stock: "stock",
  cart: "cart",
  coupon: "coupon",
  wish: "wish",
  users: "users",
  session: "session",
  orders: "orders",
  recent: "recent",
  admin: "admin",
};

type Changes = Partial<Omit<State, "loaded">>;

const moveStock = (stock: StockOverrides, items: OrderItem[], direction: 1 | -1) => {
  const next = { ...stock };
  for (const item of items) {
    const left = stockOf(stock, item.id, item.color, item.size) + direction * item.qty;
    next[skuKey(item.id, item.color, item.size)] = Math.max(0, left);
  }
  return next;
};

const orderNumber = (now: Date, count: number) =>
  `AS-${ymd(now).replace(/-/g, "")}-${String(ORDER_SERIAL_BASE + count + 1).slice(-4)}`;

function useShopState() {
  const [state, setState] = useState<State>(empty);
  useEffect(() => setState(load()), []);

  const update = useCallback((change: (current: State) => Changes) => {
    setState((current) => {
      const changes = change(current);
      for (const [key, value] of Object.entries(changes))
        write(storageKeys[key as keyof typeof storageKeys], value);
      return { ...current, ...changes };
    });
  }, []);

  const stock = useCallback(
    (id: string, color: string, size: string) => stockOf(state.stock, id, color, size),
    [state.stock],
  );

  const cart = useMemo(
    () => ({
      lines: state.cart,
      count: state.cart.reduce((sum, line) => sum + line.qty, 0),
      add: (id: string, color: string, size: string, qty = 1) =>
        update((current) => {
          const max = stockOf(current.stock, id, color, size);
          const found = current.cart.find(
            (line) => line.id === id && line.color === color && line.size === size,
          );
          return {
            cart: found
              ? current.cart.map((line) =>
                  line === found ? { ...line, qty: Math.min(max, line.qty + qty) } : line,
                )
              : [...current.cart, { id, color, size, qty: Math.min(max, qty) }],
          };
        }),
      update: (index: number, qty: number) =>
        update((current) => ({
          cart: current.cart.map((line, i) =>
            i === index
              ? {
                  ...line,
                  qty: Math.max(
                    1,
                    Math.min(stockOf(current.stock, line.id, line.color, line.size), qty),
                  ),
                }
              : line,
          ),
        })),
      remove: (index: number) =>
        update((current) => ({ cart: current.cart.filter((_, i) => i !== index) })),
      clear: () => update(() => ({ cart: [], coupon: "" })),
      coupon: state.coupon,
      setCoupon: (code: string) => update(() => ({ coupon: code })),
      totals: (options?: { pay?: string; gift?: boolean }) =>
        cartTotals(state.cart, state.settings, state.coupon, options),
    }),
    [state.cart, state.coupon, state.settings, update],
  );

  const wish = useMemo(
    () => ({
      ids: state.wish,
      has: (id: string) => state.wish.includes(id),
      toggle: (id: string) => {
        update((current) => ({
          wish: current.wish.includes(id)
            ? current.wish.filter((item) => item !== id)
            : [id, ...current.wish],
        }));
        return !state.wish.includes(id);
      },
    }),
    [state.wish, update],
  );

  const user =
    state.session && state.users[state.session]
      ? { email: state.session, ...state.users[state.session] }
      : null;

  const auth = useMemo(
    () => ({
      user,
      login: (email: string, pw: string) => {
        const found = state.users[email];
        if (!found || found.pw !== pw) return false;
        update(() => ({ session: email }));
        return true;
      },
      logout: () => update(() => ({ session: null })),
      register: (email: string, pw: string, name: string, kana: string) => {
        if (state.users[email]) return false;
        const since = ymd(new Date());
        update((current) => ({
          users: { ...current.users, [email]: { pw, name, kana, tel: "", addresses: [], since } },
          session: email,
        }));
        return true;
      },
      save: (email: string, changes: Partial<User>) =>
        update((current) => ({
          users: { ...current.users, [email]: { ...current.users[email], ...changes } },
        })),
    }),
    [user, state.users, update],
  );

  const orders = useMemo(
    () => ({
      all: state.orders,
      mine: (email: string) =>
        state.orders
          .filter((order) => order.email === email)
          .sort((a, b) => b.at.localeCompare(a.at)),
      place: (order: Omit<Order, "no" | "at" | "status">) => {
        const now = new Date();
        const placed: Order = {
          ...order,
          no: orderNumber(now, state.orders.length),
          at: now.toISOString(),
          status: orderStatus.received,
        };
        update((current) => ({
          orders: [...current.orders, placed],
          stock: moveStock(current.stock, order.items, -1),
        }));
        return placed;
      },
      cancel: (no: string) =>
        update((current) => {
          const order = current.orders.find((item) => item.no === no);
          if (!order) return {};
          return {
            stock: moveStock(current.stock, order.items, 1),
            orders: current.orders.map((item) =>
              item.no === no ? { ...item, status: orderStatus.cancelled } : item,
            ),
          };
        }),
      update: (no: string, changes: Partial<Order>) =>
        update((current) => ({
          orders: current.orders.map((order) =>
            order.no === no ? { ...order, ...changes } : order,
          ),
        })),
    }),
    [state.orders, update],
  );

  const admin = useMemo(
    () => ({
      signedIn: state.admin,
      signIn: () => update(() => ({ admin: true })),
      signOut: () => update(() => ({ admin: false })),
      reset: () => {
        clearAll();
        setState(load());
      },
      setStock: (id: string, color: string, size: string, qty: number) =>
        update((current) => ({
          stock: { ...current.stock, [skuKey(id, color, size)]: Math.max(0, Math.floor(qty)) },
        })),
      saveSettings: (settings: Settings) => update(() => ({ settings })),
    }),
    [state.admin, update],
  );

  const viewed = useCallback(
    (id: string) =>
      update((current) => ({
        recent: [id, ...current.recent.filter((item) => item !== id)].slice(0, RECENT_LIMIT),
      })),
    [update],
  );

  return {
    loaded: state.loaded,
    settings: state.settings,
    stockOverrides: state.stock,
    stock,
    cart,
    wish,
    auth,
    orders,
    admin,
    users: state.users,
    recent: state.recent,
    viewed,
  };
}

export type Shop = ReturnType<typeof useShopState>;

const ShopContext = createContext<Shop | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  return <ShopContext value={useShopState()}>{children}</ShopContext>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside ShopProvider");
  return value;
}
