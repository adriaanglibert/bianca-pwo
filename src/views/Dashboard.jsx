import { FiChevronLeft, FiChevronRight, FiRotateCcw } from "react-icons/fi";
import React, { useContext, useEffect, useState } from "react";

import Button from "components/Button";
import Card from "components/Card";
import { FiSettings } from "react-icons/fi";
import Heading from "components/Heading";
import Nav from "components/Nav";
import { SETTINGS } from "constants/routes";
import { UserContext } from "context";
import Week from "./settings/Week";
import WeekNavigator from "components/WeekNavigator";
import general from "../styling/general.module.scss";
import moment from "moment";
import styling from "./Dashboard.module.scss";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [d] = useContext(UserContext);
  const [date, setDate] = useState(moment().startOf("week"));
  const [defaultActivities] = useState(d?.settings);

  const changeWeek = (method) => {
    const newDate = moment(date)[method](1, "weeks");
    setDate(newDate);
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
            <Card styling={general.m0}>Help</Card>
          </aside>

          <main className={styling.main}>
            <WeekNavigator
              date={date}
              setDate={setDate}
              changeWeek={changeWeek}
            />

            <Week
              activities={defaultActivities}
              defaultActivities={defaultActivities}
              firstMoment={date} />
          </main>
        </div>
    </>
  );
};

export default Dashboard;
