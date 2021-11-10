import { LOGIN, REGISTER, RESET } from "constants/routes";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithGoogle } from "firebase-config";

import Button from "components/Button";
import Card from "components/Card";
import Center from "components/Center";
import Heading from "components/Heading";
import Input from "components/Input";
import Route from "components/Route";
import Tab from "components/Tab";
import Tabs from "components/Tabs";
import general from "styling/general.module.scss";
import useAuthentication from "hooks/useAuthentication";
import { useTranslation } from "react-i18next";

function Login() {
  useAuthentication(LOGIN);
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Center styling={general.column}>
      <Heading srOnly={true}>{t("titles.sign_in")}</Heading>

      <Tabs>
        <Tab active={true} to={LOGIN}>
          {t("actions.sign_in")}
        </Tab>

        <Tab to={REGISTER}>{t("actions.register")}</Tab>
      </Tabs>

      <Card styling={general.mt0}>
        <Input
          styling={general.mt0}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email.placeholder")}
        >
          {t("email.label")}
        </Input>

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password.placeholder")}
        >
          {t("password.label")}
        </Input>

        <Button
          variant="success"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          {t("actions.sign_in")}
        </Button>

        <Button variant="google" onClick={signInWithGoogle}>
          {t("actions.google_sign_in")}
        </Button>

        <Route styling={general.center} to={RESET}>
          {t("actions.reset_password")}
        </Route>
      </Card>
    </Center>
  );
}

export default Login;
