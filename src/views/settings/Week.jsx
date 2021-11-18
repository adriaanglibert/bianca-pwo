import Label from "components/Label";
import React from "react";
import WeekContainer from "components/WeekContainer";
import general from "styling/general.module.scss";
import useData from "hooks/useData";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Week = () => {
  const { t } = useTranslation();
  const [data] = useData();
  const [activities, setActivities] = useState(data?.settings);

  const handleAddActivity = (day, activity) => {
    const daysActivities = [];

    if (activities?.[day]) {
        daysActivities.push(...activities[day]);
    }

    daysActivities.push(activity);
    daysActivities.sort((a, b) => parseInt(a.from) - parseInt(b.from));

    setActivities({
        ...activities,
        [day]: daysActivities
    });
  };

  return (
    <WeekContainer activities={activities}>
      <Label>{t("settings.default.title")}</Label>

      <p className={general.preLine}>{t("settings.default.description")}</p>

      <button
        onClick={() =>
          handleAddActivity("tuesday", {
            id: "breakfast",
            from: '0856',
            to: '1222',
          })
        }
      >
        add activity tuesday morning
      </button>

      <button
        onClick={() =>
          handleAddActivity("monday", {
            id: "shower",
            from: '1032',
            to: '1150',
          })
        }
      >
        add activity monday morning
      </button>
      <button
        onClick={() =>
          handleAddActivity("monday", {
            id: "work",
            from: '1950',
            to: '2050',
          })
        }
      >
        add activity monday night
      </button>

      <button
        onClick={() =>
          handleAddActivity("friday", {
            id: "shower",
            from: '1100',
            to: '1630',
          })
        }
      >
        add activity fgriday afternoon
      </button>
    </WeekContainer>
  );
};

export default Week;
