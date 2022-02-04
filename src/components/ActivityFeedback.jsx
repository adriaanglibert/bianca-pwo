import { DAY_INTENSITY_PERCENTAGE, MAX_DAY_KCAL } from "constants/values";

import { FiAlertTriangle } from "react-icons/fi";
import IconModal from "components/IconModal";
import React from "react";
import { useTranslation } from "react-i18next";

const showMessage = (value) => {
  const coefficient = 100 / MAX_DAY_KCAL;
  const percentage = value * coefficient;
  let message = 'heavy';
  for (const key in DAY_INTENSITY_PERCENTAGE) {
    if (percentage < DAY_INTENSITY_PERCENTAGE[key]) {
      message = key;
      break;
    }
  }
  return message;
};

const Modal = ({ message, icon }) => {
  const { t } = useTranslation();
  console.log(message);
  return (
    message && (
      <IconModal
        icon={icon}
        variant={message}
        title={t(`week.${message}.title`)}
      >
        {t(`week.${message}.description`)}
      </IconModal>
    )
  );
};

const ActivityFeedback = ({ weekTotal = 0, className }) => {
  const message = showMessage(weekTotal);

  return (
    <div className={className}>
      {(message === "strong" || message === "heavy") && (
        <Modal message={message} icon={<FiAlertTriangle />} />
      )}
    </div>
  );
};

export default ActivityFeedback;
