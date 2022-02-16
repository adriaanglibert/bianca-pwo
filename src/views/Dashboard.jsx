import {
  ACTIVITIES_SUB_COLLECTION,
  USERS_COLLECTION,
  db,
} from "firebase-config";
import React, { useContext, useEffect, useMemo, useState } from "react";

import Buddy from "components/Buddy";
import Button from "components/Button";
import { FiSettings } from "react-icons/fi";
import Nav from "components/Nav";
import { SETTINGS } from "constants/routes";
import { UserContext } from "context";
import Week from "views/settings/Week";
import WeekNavigator from "components/WeekNavigator";
import { calculateDailyWeight } from "utils/helpers";
import moment from "moment";
import styling from "./Dashboard.module.scss";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [d] = useContext(UserContext);
  const [date, setDate] = useState(moment().startOf("week"));
  const [defaultActivities] = useState(d?.settings);
  const [valueOfActivities, setValueOfActivities] = useState();
  const dateInISO = useMemo(() => date.toISOString(), [date]);
  const [cachedActivities, setCachedActivities] = useState({});
  const [weekActivities, setWeekActivities] = useState();

  useEffect(() => {
    const sum = calculateDailyWeight(weekActivities);
    setValueOfActivities(sum);
  }, [weekActivities]);

  useEffect(() => {
    const fetchActivities = async (dateInISO) => {
      console.log("Fetching activities from API.");
      const query = await db
        .collection(USERS_COLLECTION)
        .doc(d.uid)
        .collection(ACTIVITIES_SUB_COLLECTION)
        .doc(dateInISO)
        .get();
      const data = await query;
      const activities = data.data();

      setCachedActivities({
        ...cachedActivities,
        [dateInISO]: activities,
      });
    };

    if (dateInISO in cachedActivities) {
      console.log("Setting activities from Cache.");
      setWeekActivities(cachedActivities?.[dateInISO]);
    } else {
      fetchActivities(dateInISO);
    }
  }, [dateInISO, cachedActivities, d.uid]);

  const saveActivities = async (activities) => {
    const doc = db
      .collection(USERS_COLLECTION)
      .doc(d?.uid)
      .collection(ACTIVITIES_SUB_COLLECTION)
      .doc(dateInISO);
    await doc.set(activities, { merge: true });

    setCachedActivities({
      ...cachedActivities,
      [dateInISO]: activities,
    });
    setWeekActivities(activities);
  };

  const changeWeek = (method) => {
    if (method) {
      const newDate = moment(date)[method](1, "weeks");
      setDate(newDate);
    }
  };

  return (
    <>
      <Nav>
        <Button to={SETTINGS} variant="light" icon={<FiSettings />}>
          {t("actions.settings")}
        </Button>
      </Nav>

      <div className={styling.container}>
        <aside className={styling.buddy}>
          <Buddy weekActivities={weekActivities}>{valueOfActivities}</Buddy>
        </aside>

        <main className={styling.main}>
          <WeekNavigator
            date={date}
            setDate={setDate}
            changeWeek={changeWeek}
          />

          <Week
            activities={weekActivities}
            setActivities={saveActivities}
            defaultActivities={defaultActivities}
            firstMoment={date}
            buttonLabel="activity"
            defaultModalTitle="actions.activity_plan"
            defaultModalEdit="actions.activity_edit"
            // isLoading={isLoading}
          />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
