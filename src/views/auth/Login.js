import { LOGIN, REGISTER, RESET } from "constants/routes";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithGoogle } from "firebase-config";

import Card from "components/Card";
import Center from "components/Center";
import Input from "components/Input";
import { Link } from "react-router-dom";
import useAuthentication from "hooks/useAuthentication";
import { useTranslation } from "react-i18next";

function Login() {
  useAuthentication(LOGIN);
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Center>
      <Card>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email.placeholder")}
            >
            {t('email.label')}
          </Input>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***************"
            >
            Wachtwoord
          </Input>

          <button
            className="login__btn"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <div>
            <Link to={RESET}>Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to={REGISTER}>Register</Link> now.
          </div>
      </Card>
    </Center>
  );
}

export default Login;
