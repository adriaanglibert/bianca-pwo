import {
  ACTIVITIES_SUB_COLLECTION,
  USERS_COLLECTION,
  db,
} from "firebase-config";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Button from "components/Button";
import Card from "components/Card";
import { FiSettings } from "react-icons/fi";
import Nav from "components/Nav";
import { SETTINGS } from "constants/routes";
import { UserContext } from "context";
import Week from "./settings/Week";
import WeekNavigator from "components/WeekNavigator";
import { calculateDailyWeight } from "../utils/helpers";
import general from "../styling/general.module.scss";
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
    const fetchActivities = async (date) => {
      console.log("Activities from API.");
      const query = await db
        .collection(USERS_COLLECTION)
        .doc(d.uid)
        .collection(ACTIVITIES_SUB_COLLECTION)
        .doc(date)
        .get();
      const data = await query;
      const week = data.data();

      setCachedActivities({
          ...cachedActivities,
          [date]: week,
      });
      setWeekActivities(week);
    };

    if (dateInISO in cachedActivities) {
      setWeekActivities(cachedActivities?.[dateInISO]);
    } else {
      fetchActivities(dateInISO);
    }
  }, [date]);

  const saveActivities = async (activities) => {
    const doc = db
      .collection(USERS_COLLECTION)
      .doc(d?.uid)
      .collection(ACTIVITIES_SUB_COLLECTION)
      .doc(dateInISO);
    await doc.set(activities, { merge: true });

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
        <aside className={styling.sidebar}>
          <Card styling={general.m0}>{valueOfActivities}</Card>
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
