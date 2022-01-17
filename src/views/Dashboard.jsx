import { FiChevronLeft, FiChevronRight, FiRotateCcw } from "react-icons/fi";
import React, { useContext, useEffect, useState } from "react";

import Button from "components/Button";
import Card from "components/Card";
import Container from "components/Container";
import { FiSettings } from "react-icons/fi";
import Heading from "components/Heading";
import Nav from "components/Nav";
import { SETTINGS } from "constants/routes";
import { UserContext } from "context";
import Week from "./settings/Week";
import general from "../styling/general.module.scss";
import moment from "moment";
import styling from "./Dashboard.module.scss";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [d] = useContext(UserContext);
  const [defaultActivities] = useState(d?.settings);
  const [date, setDate] = useState(moment().startOf("week"));

  const { t } = useTranslation();

  useEffect(() => {
    moment.locale("nl-be");
  }, []);

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
            <div className={styling.date}>
              <Heading>
                {moment(date).format("DD MMMM")} -{" "}
                {moment(date).add(6, "days").format("DD MMMM")}{" "}
                {moment(date).year()}
              </Heading>

              <div className={styling.actions}>
                {date.week() !== moment().week() && (
                  <Button
                    onClick={() => setDate(moment().startOf("week"))}
                    icon={<FiRotateCcw />}
                  >
                    <span className={general.srOnly}>
                      {t("actions.current_week")}
                    </span>
                  </Button>
                )}

                <Button
                  onClick={() => changeWeek("subtract")}
                  icon={<FiChevronLeft />}
                >
                  <span className={general.srOnly}>
                    {t("actions.previous_week")}
                  </span>
                </Button>
                <Button
                  onClick={() => changeWeek("add")}
                  icon={<FiChevronRight />}
                >
                  <span className={general.srOnly}>
                    {t("actions.next_week")}
                  </span>
                </Button>
              </div>
            </div>

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
