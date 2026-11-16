import { type FormEvent, useState } from "react";
import { TextField } from "~/samples/shared/form/TextField";
import { accountPage } from "../content/account";
import { useShop } from "../store/ShopContext";
import type { User } from "../store/types";

const text = accountPage.profile;

export function ProfileForm({ user }: { user: User & { email: string } }) {
  const { auth } = useShop();
  const [values, setValues] = useState({
    name: user.name,
    kana: user.kana,
    tel: user.tel,
    password: "",
  });
  const [message, setMessage] = useState("");
  const update = (field: keyof typeof values) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const changes: Partial<User> = {
      name: values.name.trim(),
      kana: values.kana.trim(),
      tel: values.tel.trim(),
    };
    if (values.password.length >= text.minLength) changes.pw = values.password;
    auth.save(user.email, changes);
    setMessage(text.saved);
  };

  return (
    <>
      <form className="f profile" noValidate onSubmit={submit}>
        <TextField id="pn" label={text.name} value={values.name} onChange={update("name")} />
        <TextField id="pk" label={text.kana} value={values.kana} onChange={update("kana")} />
        <div>
          <label className="t" htmlFor="pe">
            {text.email}
          </label>
          <input type="email" id="pe" value={user.email} disabled readOnly />
        </div>
        <TextField
          id="pt"
          type="tel"
          label={text.tel}
          value={values.tel}
          onChange={update("tel")}
        />
        <TextField
          id="ppw"
          type="password"
          label={text.password}
          className="w"
          value={values.password}
          onChange={update("password")}
        />
        <div className="w">
          <button type="submit" className="btn sm">
            {text.save}
          </button>{" "}
          <span className="note">{message}</span>
        </div>
      </form>
      <p className="note since">
        {text.since}
        {user.since}
        {text.restock}
      </p>
    </>
  );
}
