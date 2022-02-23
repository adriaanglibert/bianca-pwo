import { DAY_INTENSITY_PERCENTAGE, MAX_DAY_KCAL } from "constants/values";
import React, { useEffect } from "react";

import { FiX } from "react-icons/fi";
import avatar from "assets/images/avatar.svg";
import { calculateDailyWeight } from "utils/helpers";
import days from "data/days.json";
import styling from "./Buddy.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Buddy = ({ weekActivities, defaultActivities }) => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState([]);
  const [feedbackOpen, setFeedbackOpen] = useState(feedback && feedback.length);

  useEffect(() => {
    let timeout;

    const heavyDays = Object.keys(days).flatMap((day) => {
      const dailyWeight =
        calculateDailyWeight(weekActivities?.[day]) +
        calculateDailyWeight(defaultActivities?.[day]);

      if (
        dailyWeight >
        MAX_DAY_KCAL * (DAY_INTENSITY_PERCENTAGE.medium / 100)
      ) {
        return days[day]?.toLowerCase();
      }

      return [];
    });

    setFeedback(heavyDays);

    if (heavyDays && heavyDays.length) {
      timeout = setTimeout(() => {
        setFeedbackOpen(true);
      }, 2500);
    } else {
      clearTimeout(timeout);
      setFeedbackOpen(false);
    }
  }, [weekActivities, defaultActivities]);

  const handleClick = (currentState) => {
    setFeedbackOpen(!currentState);
  };

  const formatDayList = (days) => {
    return days.length > 1 ? `${days.slice(0, -1).join(', ')} ${t('and')}  ${days.slice(-1)}` : days.join('');
  }

  return (
    <div className={styling.buddy}>
      <button
        disabled={!(feedback && feedback.length)}
        onClick={() => handleClick(feedbackOpen)}
        className={`${styling.button} ${
          feedback && feedback.length
            ? feedbackOpen
              ? ""
              : styling.animate
            : styling.sleeping
        }`}
      >
        <img alt={t("buddy_intro")} className={styling.avatar} src={avatar} />
      </button>

      <div className={styling.dialog} open={feedbackOpen}>
        <div>
          {t('buddy_feedback')}
          <span className={styling.days}>
            {feedback && formatDayList(feedback)}
          </span>.
        </div>

        <button
          className={styling.close}
          onClick={() => handleClick(feedbackOpen)}
          title={t("close")}
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default Buddy;
