import React, { useEffect } from "react";

import { MAX_DAY_KCAL } from 'constants/values';
import { Toaster } from 'react-hot-toast';
import { calculateDailyWeight } from "utils/helpers";
import days from 'data/days.json';
import styling from "./Buddy.module.scss";
import { toast } from 'react-hot-toast';

const Buddy = ({weekActivities}) => {
    useEffect(() => {
        // Dismiss toast
        console.log(weekActivities);
        const heavyDays = weekActivities && Object.keys(weekActivities).map(day => {
          return {
            day: day,
            weight: calculateDailyWeight(weekActivities[day])}
        })

        console.log(heavyDays);
    }, [weekActivities]);

    const notify = () => toast('Here is your toast.', {
        id: 'chat'
    });

  return (
    <div>
      <button onClick={notify} className={styling.button}>
        <img
          className={styling.avatar}
          src={process.env.PUBLIC_URL + "/images/avatar.svg"}
        />
      </button>
    </div>
  );
};

export default Buddy;
