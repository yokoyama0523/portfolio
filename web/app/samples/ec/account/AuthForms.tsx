import { type FormEvent, useState } from "react";
import { TextField } from "~/samples/shared/form/TextField";
import { useFields } from "~/samples/shared/form/useFields";
import { isEmail, isFilled } from "~/samples/shared/validation";
import { accountPage as text } from "../content/account";
import { useShop } from "../store/ShopContext";
import { useToast } from "../ui/ToastContext";

const hasMinLength = (value: string) => value.length >= text.register.minLength;

function LoginForm({ onDone }: { onDone: () => void }) {
  const { auth } = useShop();
  const [message, setMessage] = useState("");
  const fields = useFields(
    { email: text.login.initial.email, password: text.login.initial.password },
    { email: isEmail, password: isFilled },
  );
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fields.validate()) return;
    if (!auth.login(fields.values.email.trim(), fields.values.password)) {
      setMessage(text.login.wrong);
      return;
    }
    onDone();
  };
  return (
    <section>
      <h2>{text.login.title}</h2>
      <div className="demo">
        {text.login.demo.before}
        <code>{text.login.demoAccount.email}</code>
        {text.login.demo.between}
        <code>{text.login.demoAccount.password}</code>
      </div>
      <form className="f" noValidate onSubmit={submit}>
        {(["email", "password"] as const).map((id) => (
          <TextField
            key={id}
            id={id === "email" ? "le" : "lp"}
            type={id}
            {...text.login[id]}
            invalid={fields.isInvalid(id)}
            inputRef={fields.register(id)}
            value={fields.values[id]}
            onChange={(value) => fields.update(id, value)}
          />
        ))}
        <div className="note alert" role="alert">
          {message}
        </div>
        <div>
          <button type="submit" className="btn full">
            {text.login.submit}
          </button>
        </div>
      </form>
    </section>
  );
}

function RegisterForm({
  onDone,
  emailRef,
}: {
  onDone: () => void;
  emailRef?: (element: HTMLInputElement | null) => void;
}) {
  const { auth } = useShop();
  const toast = useToast();
  const [message, setMessage] = useState("");
  const fields = useFields(
    { name: "", kana: "", email: "", password: "" },
    { name: isFilled, kana: isFilled, email: isEmail, password: hasMinLength },
  );
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fields.validate()) return;
    const v = fields.values;
    if (!auth.register(v.email.trim(), v.password, v.name.trim(), v.kana.trim())) {
      setMessage(text.register.taken);
      return;
    }
    toast(text.register.done);
    onDone();
  };
  const inputs = [
    { id: "name", dom: "rn", type: "text" },
    { id: "kana", dom: "rk", type: "text" },
    { id: "email", dom: "re", type: "email" },
    { id: "password", dom: "rp", type: "password" },
  ] as const;
  return (
    <section id="register">
      <h2>{text.register.title}</h2>
      <p className="note lead">{text.register.lead}</p>
      <form className="f" noValidate onSubmit={submit}>
        {inputs.map(({ id, dom, type }) => {
          const register = fields.register(id);
          return (
            <TextField
              key={id}
              id={dom}
              type={type}
              {...text.register[id]}
              required={text.required}
              invalid={fields.isInvalid(id)}
              inputRef={(element) => {
                register(element);
                if (id === "email") emailRef?.(element);
              }}
              value={fields.values[id]}
              onChange={(value) => fields.update(id, value)}
            />
          );
        })}
        <div className="note alert" role="alert">
          {message}
        </div>
        <div>
          <button type="submit" className="btn w full">
            {text.register.submit}
          </button>
        </div>
      </form>
    </section>
  );
}

export function AuthForms({
  onDone,
  emailRef,
}: {
  onDone: () => void;
  emailRef?: (element: HTMLInputElement | null) => void;
}) {
  return (
    <div className="auth">
      <LoginForm onDone={onDone} />
      <RegisterForm onDone={onDone} emailRef={emailRef} />
    </div>
  );
}
