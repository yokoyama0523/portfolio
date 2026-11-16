import { type FormEvent, useState } from "react";
import { TextField } from "~/samples/shared/form/TextField";
import { useFields } from "~/samples/shared/form/useFields";
import { isFilled, isZip } from "~/samples/shared/validation";
import { PrefectureField } from "../components/PrefectureField";
import { accountPage } from "../content/account";
import { useShop } from "../store/ShopContext";
import type { Address, User } from "../store/types";
import { useToast } from "../ui/ToastContext";

const text = accountPage.addresses;

const blank = { name: "", kana: "", zip: "", pref: "", addr1: "", addr2: "", tel: "" };

const inputs = [
  { id: "name", dom: "an", type: "text" },
  { id: "kana", dom: "ak", type: "text" },
  { id: "zip", dom: "az", type: "text" },
] as const;

export function AddressBook({ user }: { user: User & { email: string } }) {
  const { auth } = useShop();
  const toast = useToast();
  const [editing, setEditing] = useState<number | null>(null);
  const fields = useFields(blank, {
    name: isFilled,
    zip: isZip,
    pref: isFilled,
    addr1: isFilled,
    tel: isFilled,
  });
  const addresses = user.addresses;
  const save = (next: Address[]) => auth.save(user.email, { addresses: next });

  const fill = (values: typeof blank) => {
    for (const [key, value] of Object.entries(values))
      fields.update(key as keyof typeof blank, value);
  };

  const reset = () => {
    fill(blank);
    setEditing(null);
  };

  const edit = (index: number) => {
    const { main: _main, ...address } = addresses[index];
    fill({ ...blank, ...address });
    setEditing(index);
    fields.focus("name");
  };

  const remove = (index: number) => {
    if (!window.confirm(text.removeConfirm)) return;
    const next = addresses.filter((_, i) => i !== index);
    if (next.length && !next.some((item) => item.main)) next[0] = { ...next[0], main: true };
    save(next);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fields.validate()) return;
    const v = fields.values;
    const address: Address = {
      name: v.name.trim(),
      kana: v.kana.trim(),
      zip: v.zip.trim(),
      pref: v.pref,
      addr1: v.addr1.trim(),
      addr2: v.addr2.trim(),
      tel: v.tel.trim(),
      main: editing === null ? addresses.length === 0 : Boolean(addresses[editing].main),
    };
    save(
      editing === null
        ? [...addresses, address]
        : addresses.map((item, i) => (i === editing ? address : item)),
    );
    reset();
    toast(text.saved);
  };

  const field = (id: keyof typeof blank, dom: string, type = "text", className?: string) => (
    <TextField
      key={id}
      id={dom}
      type={type}
      label={text.fields[id]}
      className={className}
      invalid={fields.isInvalid(id)}
      inputRef={fields.register(id)}
      value={fields.values[id]}
      onChange={(value) => fields.update(id, value)}
    />
  );

  return (
    <>
      {addresses.length ? (
        addresses.map((address, i) => (
          <div key={`${address.zip}${address.addr1}${address.name}`} className="ad">
            <div>
              <b className="medium">{address.name}</b>
              {address.main && <span className="main">{text.main}</span>}
              <br />〒{address.zip} {address.pref}
              {address.addr1} {address.addr2}
              <br />
              {address.tel}
            </div>
            <div className="btns">
              {!address.main && (
                <button
                  type="button"
                  onClick={() => save(addresses.map((item, k) => ({ ...item, main: k === i })))}
                >
                  {text.makeMain}
                </button>
              )}
              <button type="button" onClick={() => edit(i)}>
                {text.edit}
              </button>
              <button type="button" onClick={() => remove(i)}>
                {text.remove}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="note">{text.empty}</p>
      )}
      <div className="addf">
        <h3>{editing === null ? text.addTitle : text.editTitle}</h3>
        <form className="f" noValidate onSubmit={submit}>
          {inputs.map(({ id, dom, type }) => field(id, dom, type))}
          <PrefectureField
            id="ap"
            label={text.fields.pref}
            invalid={fields.isInvalid("pref")}
            value={fields.values.pref}
            onChange={(value) => fields.update("pref", value)}
          />
          {field("addr1", "a1", "text", "w")}
          {field("addr2", "a2", "text", "w")}
          {field("tel", "at", "tel")}
          <div className="end">
            <button type="submit" className="btn sm">
              {text.save}
            </button>
            {editing !== null && (
              <button type="button" className="btn g sm" onClick={reset}>
                {text.cancel}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
