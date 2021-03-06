import { FiChevronLeft, FiChevronRight, FiRotateCcw } from "react-icons/fi";
import React, { useEffect } from "react";

import Button from "components/Button";
import Heading from "components/Heading";
import general from "../styling/general.module.scss";
import moment from "moment";
import styling from "./WeekNavigator.module.scss";
import { useTranslation } from "react-i18next";

function WeekNavigator({ date, setDate, changeWeek, children }) {
  const { t } = useTranslation();

  useEffect(() => {
    moment.locale("nl-be");
  }, []);

  return (
    <div className={styling.date}>
      <Heading className={styling.heading}>
        <span>{moment(date).format("DD MMMM")} - </span>

        <span>
          {moment(date).add(6, "days").format("DD MMMM")} {moment(date).year()}
        </span>
      </Heading>

      <div className={styling.actions}>
        {children}

        {date.week() !== moment().week() && (
          <Button
            onClick={() => {
              setDate(moment().startOf("week"));
              changeWeek();
            }}
            icon={<FiRotateCcw />}
          >
            <span className={general.srOnly}>{t("actions.current_week")}</span>
          </Button>
        )}

        <Button onClick={() => changeWeek("subtract")} icon={<FiChevronLeft />}>
          <span className={general.srOnly}>{t("actions.previous_week")}</span>
        </Button>

        <Button onClick={() => changeWeek("add")} icon={<FiChevronRight />}>
          <span className={general.srOnly}>{t("actions.next_week")}</span>
        </Button>
      </div>
    </div>
  );
}

export default WeekNavigator;
