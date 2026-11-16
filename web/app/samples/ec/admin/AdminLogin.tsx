import { type FormEvent, useState } from "react";
import { Link } from "react-router";
import { adminPage } from "../content/admin";
import { paths } from "../content/paths";
import { useShop } from "../store/ShopContext";

const text = adminPage.login;

export function AdminLogin() {
  const { admin } = useShop();
  const [id, setId] = useState(text.credentials.id);
  const [password, setPassword] = useState(text.credentials.password);
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id.trim() === text.credentials.id && password === text.credentials.password) {
      admin.signIn();
      return;
    }
    setMessage(text.wrong);
  };
  return (
    <div className="login">
      <form noValidate onSubmit={submit}>
        <h1>{text.title}</h1>
        <p className="note demo">
          {text.demo.label}
          {text.demo.id}
          <b className="medium">{text.credentials.id}</b>
          {text.demo.password}
          <b className="medium">{text.credentials.password}</b>
        </p>
        <div className="f">
          <div>
            <label className="t" htmlFor="aid">
              {text.id}
            </label>
            <input
              type="text"
              id="aid"
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
          </div>
          <div>
            <label className="t" htmlFor="apw">
              {text.password}
            </label>
            <input
              type="password"
              id="apw"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="note alert" role="alert">
            {message}
          </div>
          <div>
            <button type="submit" className="btn full">
              {text.submit}
            </button>
          </div>
        </div>
        <p className="note back">
          <Link className="underline-soft" to={paths.home}>
            {text.back}
          </Link>
        </p>
      </form>
    </div>
  );
}
