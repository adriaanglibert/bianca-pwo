import { FiEdit, FiTrash2 } from "react-icons/fi";
import { formatDate, kcalForTime } from "utils/helpers";

import IconModal from "components/IconModal";
import { MAX_DAY_KCAL } from 'constants/values';
import Progress from "components/Progress";
import React from "react";
import activities from "data/activities.json";
import { getActivityIntensity } from '../utils/helpers';
import styles from "./Activity.module.scss";
import translations from "i18n/nl/translations";
import { useTranslation } from "react-i18next";

const Activity = ({
  activity,
  day,
  handleDeleteActivity,
  handleEditActivity,
}) => {
  const { t } = useTranslation();
  const metWeight = activities[activity.id]?.weight;

  return (
    <div className={styles.container} title={t(`weight.${getActivityIntensity(metWeight)}`)}>
      <div className={styles.inner}>
        <span className={styles.time}>
          {formatDate(activity.from, activity.to)}
        </span>

        <span className={styles.name}>
          {t(`activities.${activity.id}.title`)}
        </span>
      </div>

      <Progress
        value={Math.abs(kcalForTime(metWeight, activity))}
        max={MAX_DAY_KCAL}
        isResting={Math.sign(metWeight) > 0 ? 'tiring' : 'rest'} />

      <div className={styles.actions}>
        {translations.activities[activity.id].description && (
          <IconModal
            variant="gray"
            title={t(`activities.${activity.id}.title`)}
          >
            {t(`activities.${activity.id}.description`)}
          </IconModal>
        )}

        <div className={styles.change}>
          <button
            className={styles.button}
            onClick={() => handleEditActivity(activity)}
          >
            <FiEdit />
          </button>

          <button
            className={`${styles.button} ${styles.delete}`}
            onClick={() => handleDeleteActivity(day, activity)}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
