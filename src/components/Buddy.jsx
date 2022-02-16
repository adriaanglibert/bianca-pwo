import React, { useEffect } from "react";

import { MAX_DAY_KCAL } from "constants/values";
import avatar from 'assets/images/avatar.svg';
import { calculateDailyWeight } from "utils/helpers";
import styling from "./Buddy.module.scss";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const Buddy = ({ weekActivities }) => {
  const {t} = useTranslation();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // Dismiss toast
    const heavyDays =
      weekActivities &&
      Object.keys(weekActivities).map((day) => {
        if (calculateDailyWeight(weekActivities[day]) > MAX_DAY_KCAL) {
          return {
            day: day,
            weight: calculateDailyWeight(weekActivities[day]),
          };
        }

        return null;
      });
    setFeedback(heavyDays);
  }, [weekActivities]);

  const handleClick = () => {
    console.log("open buddy");
  };

  return (
    <div>
      <button onClick={handleClick} className={styling.button}>
        <img
          alt={t('buddy_intro')}
          className={styling.avatar}
          src={avatar}
        />
      </button>

      {feedback && <dialog>Feedback</dialog>}
    </div>
  );
};

export default Buddy;
