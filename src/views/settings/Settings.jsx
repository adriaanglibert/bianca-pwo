import React, { useContext, useState } from "react";

import Button from "components/Button";
import Container from "components/Container";
import { FiSave } from "react-icons/fi";
import { HOME } from "constants/routes";
import Heading from "components/Heading";
import IconModal from "components/IconModal";
import Label from "components/Label";
import Nav from "components/Nav";
import { UserContext } from "context";
import Week from "views/settings/Week";
import general from "styling/general.module.scss";
import useData from "hooks/useData";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Settings = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [d] = useContext(UserContext);
  const [, setData] = useData(null, () => navigate(HOME));
  const [activities, setActivities] = useState(d?.settings);

  const saveSettings = () => {
    setData({
      settings: activities,
    });
  };

  return (
    <>
      <Nav>
        <Button
          onClick={() => saveSettings()}
          variant="success"
          icon={<FiSave />}
        >
          {t("save")}
        </Button>
      </Nav>

      <Container>
        <Heading>{t("actions.settings")}</Heading>

        <Week
          buttonLabel="default_activity"
          defaultModalTitle="actions.default_plan"
          defaultModalEdit="actions.default_edit"
          activities={activities}
          setActivities={setActivities}
          initAllowMultipleDays={true}
        >
          <Label>
            {t("settings.default.title")}

            <IconModal title={t("settings.default.title")} variant='dark'>
              <p className={general.preLine}>{t("settings.default.description")}</p>
            </IconModal>
          </Label>
        </Week>
      </Container>
    </>
  );
};

export default Settings;
