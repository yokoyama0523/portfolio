import { type FormEvent, useState } from "react";
import { Link } from "react-router";
import { Logo } from "../components/Logo";
import { adminPage } from "../content/admin";
import { clinic } from "../content/clinic";
import { clinicActions } from "./store";

const text = adminPage.login;

export function AdminLogin() {
  const [id, setId] = useState(text.credentials.id);
  const [password, setPassword] = useState(text.credentials.password);
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id.trim() === text.credentials.id && password === text.credentials.password) {
      clinicActions.signIn();
      return;
    }
    setMessage(text.wrong);
  };

  return (
    <div className="adm-login">
      <form noValidate onSubmit={submit}>
        <Logo />
        <h1>{text.title}</h1>
        <p className="lead">{text.lead}</p>
        <p className="demo">{text.demo}</p>
        <div className="field">
          <label htmlFor="adm-id">{text.id}</label>
          <input
            id="adm-id"
            type="text"
            autoComplete="username"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="adm-pw">{text.password}</label>
          <input
            id="adm-pw"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <p className="alert" role="alert">
          {message}
        </p>
        <button type="submit" className="btn">
          {text.submit}
        </button>
        <p className="back">
          <Link to={clinic.paths.home}>{text.back}</Link>
        </p>
      </form>
    </div>
  );
}
