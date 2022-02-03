import { DAY_INTENSITY_PERCENTAGE, MAX_DAY_KCAL } from 'constants/values';

import React from 'react';

const showMessage = (value) => {
    const coefficient = 100 / MAX_DAY_KCAL;
    const percentage = value * coefficient;
    let message;
    for (const key in DAY_INTENSITY_PERCENTAGE) {
        if (percentage < DAY_INTENSITY_PERCENTAGE[key]) {
            message = key;
            break;
        }
    }
    return message;
}

const ActivityFeedback = ({weekTotal = 0}) => {
  return <div>
      <span>{showMessage(weekTotal)}</span>
  </div>;
};

export default ActivityFeedback;
