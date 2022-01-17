import { FiEdit, FiTrash2 } from "react-icons/fi";

import IconModal from "components/IconModal";
import Progress from "components/Progress";
import React from "react";
import activities from "data/activities.json";
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
    <div className={styles.container}>
      <div className={styles.inner}>
        <small className={styles.time}>
          {formatDate(activity.from, activity.to)}
        </small>

        <small className={styles.name}>
          {t(`activities.${activity.value}.title`)}
        </small>
      </div>
    </div>
  );
};

export default SmallActivity;