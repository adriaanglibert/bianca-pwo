import React, { useContext, useState } from "react";

import Button from "components/Button";
import Container from "components/Container";
import { FiSave } from "react-icons/fi";
import { HOME } from "constants/routes";
import Heading from "components/Heading";
import Nav from "components/Nav";
import { UserContext } from "context";
import Week from "views/settings/Week";
import useData from "hooks/useData";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from 'uuid';
import Label from "components/Label";
import IconModal from "components/IconModal";
import general from "styling/general.module.scss";

const Settings = () => {
  let history = useHistory();
  const { t } = useTranslation();

  const [d] = useContext(UserContext);
  const [, setData] = useData(null, () => history.push(HOME));
  const [activities, setActivities] = useState(d?.settings);

  const handleSaveActivity = (day, activity) => {
    let activityToUpload = activity;
    let activitiesToUpload = activities;

    // Remove original if you're updating.
    if (activity.uuid) {
      Object.keys(activities).forEach(day => {
        return activitiesToUpload[day] = activitiesToUpload[day].filter(act => act.uuid !== activity.uuid);
      });
    } else {
      activityToUpload = {
        ...activity,
        uuid: uuid()
      }
    }

    const daysActivities = [];

    if (activitiesToUpload?.[day]) {
      daysActivities.push(...activitiesToUpload[day]);
    }

    daysActivities.push(activityToUpload);
    daysActivities.sort((a, b) => parseInt(a.from) - parseInt(b.from));

    setActivities({
      ...activitiesToUpload,
      [day]: daysActivities,
    });
  };

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
          handleSaveActivity={handleSaveActivity}
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
