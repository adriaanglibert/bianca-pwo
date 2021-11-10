import Button from "components/Button";
import Container from "components/Container";
import { HOME } from "constants/routes";
import Heading from "components/Heading";
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

      <Container>
          <Heading>
            {t("actions.settings")}
          </Heading>

          <strong>
            {t("settings.when")}
          </strong>
      </Container>
    </>
  );
};

export default Settings;
