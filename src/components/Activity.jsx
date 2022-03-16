import { FiEdit, FiTrash2 } from "react-icons/fi";
import { formatDate, kcalForTime } from "utils/helpers";

import { FiHelpCircle } from "react-icons/fi";
import IconModal from "components/IconModal";
import { MAX_DAY_KCAL } from 'constants/values';
import Progress from "components/Progress";
import React from "react";
import ReactTooltip from 'react-tooltip';
import Truncate from "components/Truncate";
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
  const strategies = activities[activity.id]?.strategies;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.time} data-tip={t(`weight.${getActivityIntensity(metWeight)}`)}>
          {formatDate(activity.from, activity.to)}
        </span>

        <span className={`${styles.name}`}>
          <Truncate className={styles.truncate}>
            {t(`activities.${activity.id}.title`)}
          </Truncate>
        </span>
      </div>

      <div data-tip={t(`weight.${getActivityIntensity(metWeight)}`)}>
        <Progress
          value={Math.abs(kcalForTime(metWeight, activity))}
          max={MAX_DAY_KCAL}
          isResting={Math.sign(metWeight) > 0 ? 'tiring' : 'rest'} />
      </div>

      <div className={styles.actions}>
        <div>
          {translations.activities[activity.id].description && (
            <IconModal
              variant="gray"
              title={t(`activities.${activity.id}.title`)}
            >
              {t(`activities.${activity.id}.description`)}
            </IconModal>
          )}

          {strategies?.length && (
            <IconModal
              icon={<FiHelpCircle/>}
              variant="gray"
              title={`${translations.activities[activity.id].title} - ${t('advice')}`}
            >
              {
                strategies?.map((strategy, index) => <div key={index} className={index + 2 == strategies?.length ? styles.text : ''}>
                  <strong>
                    {strategy.title}
                  </strong>
                  <p>
                    {strategy.description}
                  </p>
                </div>)
              }
            </IconModal>
          )}
        </div>

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

      <ReactTooltip delayShow={500}/>
    </div>
  );
};

export default Activity;
