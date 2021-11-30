import { FiEdit, FiInfo, FiTrash2 } from "react-icons/fi";

import Progress from "components/Progress";
import React from "react";
import activities from "data/activities.json";
import styles from "./Activity.module.scss";
import { useTranslation } from "react-i18next";
import IconModal from "components/IconModal";

const Activity = ({ activity, day, handleDeleteActivity }) => {
  const { t } = useTranslation();

  const formatDate = (from, to) => {
    return `${from.slice(0, 2)}:${from.slice(2, 4)} - ${to.slice(
      0,
      2
    )}:${to.slice(2, 4)}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.time}>
          {formatDate(activity.from, activity.to)}
        </span>
        <span className={styles.name}>
          {t(`activities.${activity.id}.title`)}
        </span>
      </div>
      <Progress value={activities[activity.id].weight} />
      <div className={styles.actions}>
        <IconModal variant="gray" title={t(`activities.${activity.id}.title`)}>
          {t(`activities.${activity.id}.description`)}
        </IconModal>
        <div className={styles.change}>
          <button className={styles.button}>
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
