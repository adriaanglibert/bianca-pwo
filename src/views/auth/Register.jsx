import { LOGIN, REGISTER } from "constants/routes";
import React, { useState } from "react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "firebase-config";

import Button from "components/Button";
import Card from "components/Card";
import Center from "components/Center";
import Heading from "components/Heading";
import Input from "components/Input";
import Route from "components/Route";
import Tab from "components/Tab";
import Tabs from "components/Tabs";
import general from "styling/general.module.scss";
import { toast } from "react-hot-toast";
import useAuthentication from "hooks/useAuthentication";
import { useTranslation } from "react-i18next";

function Register() {
  useAuthentication(REGISTER);
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = () => {
    if (!name) toast.error("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <Center styling={general.column}>
      <Heading srOnly={true}>{t("titles.register")}</Heading>

      <Tabs>
        <Tab to={LOGIN}>{t("actions.sign_in")}</Tab>

        <Tab active={true} to={REGISTER}>
          {t("actions.register")}
        </Tab>
      </Tabs>

      <Card styling={general.mt0}>
        <Input
          styling={general.mt0}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("name.placeholder")}
        >
          {t("name.label")}
        </Input>

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

        <Button variant="success" onClick={register}>
          {t("actions.register")}
        </Button>

        <Button variant="google" onClick={signInWithGoogle}>
          {t("actions.google_register")}
        </Button>

        <Route styling={general.center} to={LOGIN}>
          {t("actions.already_registered")}
        </Route>
      </Card>
    </Center>
  );
}

export default Register;
