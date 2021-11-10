import Button from "components/Button";
import { HOME } from "constants/routes";
import Nav from "components/Nav";
import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Settings = () => {
  let history = useHistory();
  const { t } = useTranslation();

  const saveSettings = () => {
    history.push(HOME);
  };

  return (
    <>
      <Nav>
        <Button onClick={() => saveSettings()} variant="success">
          {t("save")}
        </Button>
      </Nav>

      <div>settings</div>
    </>
  );
};

export default Settings;
