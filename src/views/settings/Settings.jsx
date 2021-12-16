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

const Settings = () => {
  let history = useHistory();
  const { t } = useTranslation();

  const [d] = useContext(UserContext);
  const [, setData] = useData(null, () => history.push(HOME));
  const [activities, setActivities] = useState(d?.settings);

  const handleAddActivity = (day, activity) => {
    const daysActivities = [];

    if (activities?.[day]) {
      daysActivities.push(...activities[day]);
    }

    daysActivities.push(activity);
    daysActivities.sort((a, b) => parseInt(a.from) - parseInt(b.from));

    setActivities({
      ...activities,
      [day]: daysActivities,
    });
  };

  const handleDeleteActivity = (day, activity) => {
    setActivities({
      ...activities,
      [day]: activities[day].filter(act => act !== activity)
    })
  }

  const handleEditActivity = (activity) => {
    console.log('====================================');
    console.log(activity);
    console.log('====================================');
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
          handleAddActivity={handleAddActivity}
          handleDeleteActivity={handleDeleteActivity}
          handleEditActivity={handleEditActivity} />
      </Container>
    </>
  );
};

export default Settings;
