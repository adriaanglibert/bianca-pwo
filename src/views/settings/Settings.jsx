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
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Settings = () => {
  let history = useHistory();
  const { t } = useTranslation();

  const [d] = useContext(UserContext);
  const [, setData] = useData(null, () => history.push(HOME));
  const [activities, setActivities] = useState(d?.settings);

  const handleDeleteActivity = (day, activity) => {
    setActivities({
      ...activities,
      [day]: activities[day].filter(act => act !== activity)
    })
  }

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
          activities={activities}
          setActivities={setActivities}
          handleDeleteActivity={handleDeleteActivity}
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
