import { useState } from "react";
import { adminPage } from "../content/admin";
import type { Coupon } from "../content/catalog";
import { useShop } from "../store/ShopContext";

const text = adminPage.settings;

const toNumber = (value: string) => Number(value) || 0;

export function SettingsView() {
  const { settings, admin } = useShop();
  const [shipping, setShipping] = useState(String(settings.shipping));
  const [freeFrom, setFreeFrom] = useState(String(settings.freeShippingFrom));
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState<Coupon["type"]>("rate");
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");

  const saveShipping = () => {
    admin.saveSettings({
      ...settings,
      shipping: toNumber(shipping),
      freeShippingFrom: toNumber(freeFrom),
    });
    setMessage(text.saved);
  };

  const removeCoupon = (key: string) => {
    const { [key]: _removed, ...coupons } = settings.coupons;
    admin.saveSettings({ ...settings, coupons });
  };

  const addCoupon = () => {
    const key = code.trim().toUpperCase();
    if (!key) return;
    admin.saveSettings({
      ...settings,
      coupons: {
        ...settings.coupons,
        [key]: { type, value: toNumber(value), label: label.trim() || key },
      },
    });
    setCode("");
  };

  const reset = () => {
    if (!window.confirm(text.resetConfirm)) return;
    admin.reset();
  };

  return (
    <>
      <div className="pnl">
        <h2>{text.shippingTitle}</h2>
        <div className="f narrow">
          <div>
            <label className="t" htmlFor="sship">
              {text.shipping}
            </label>
            <input
              type="number"
              id="sship"
              value={shipping}
              onChange={(event) => setShipping(event.target.value)}
            />
          </div>
          <div>
            <label className="t" htmlFor="sfree">
              {text.freeFrom}
            </label>
            <input
              type="number"
              id="sfree"
              value={freeFrom}
              onChange={(event) => setFreeFrom(event.target.value)}
            />
          </div>
          <div className="w">
            <button type="button" className="btn sm" onClick={saveShipping}>
              {text.save}
            </button>{" "}
            <span className="note">{message}</span>
          </div>
        </div>
      </div>
      <div className="pnl">
        <h2>{text.couponsTitle}</h2>
        <table className="tb">
          <thead>
            <tr>
              {text.couponColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {Object.entries(settings.coupons).map(([key, coupon]) => (
              <tr key={key}>
                <td className="code">{key}</td>
                <td>{coupon.type === "rate" ? text.rateOff(coupon.value) : text.freeShipping}</td>
                <td>{coupon.label}</td>
                <td>
                  <button type="button" className="danger" onClick={() => removeCoupon(key)}>
                    {text.remove}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tools add">
          <input
            type="text"
            className="upper"
            placeholder={text.codePlaceholder}
            aria-label={text.codePlaceholder}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <select
            aria-label={text.couponColumns[1]}
            value={type}
            onChange={(event) => setType(event.target.value as Coupon["type"])}
          >
            {text.types.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="short"
            placeholder={text.valuePlaceholder}
            aria-label={text.types[0].label}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <input
            type="text"
            placeholder={text.labelPlaceholder}
            aria-label={text.labelPlaceholder}
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
          <button type="button" className="btn sm" onClick={addCoupon}>
            {text.add}
          </button>
        </div>
      </div>
      <div className="pnl">
        <h2>{text.demoTitle}</h2>
        <p className="note">{text.demoText}</p>
        <button type="button" className="btn g sm reset" onClick={reset}>
          {text.reset}
        </button>
      </div>
    </>
  );
}
