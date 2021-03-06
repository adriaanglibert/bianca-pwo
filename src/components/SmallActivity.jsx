import React from "react";
import Truncate from "components/Truncate";
import styles from "./Activity.module.scss";
import { useTranslation } from "react-i18next";

const SmallActivity = ({ activity, day, handleDeleteActivity, handleEditActivity }) => {
  const { t } = useTranslation();

  const formatDate = (from, to) => {
    return `${from.slice(0, 2)}:${from.slice(2, 4)} - ${to.slice(
      0,
      2
    )}:${to.slice(2, 4)}`;
  };

  return (
    <div>
      <div className={styles.inner}>
        <small className={styles.time}>
          {formatDate(activity.from, activity.to)}
        </small>

        <Truncate className={styles.small}>
          {t(`activities.${activity.id}.title`)}
        </Truncate>
      </div>
    </div>
  );
};

export default SmallActivity;
