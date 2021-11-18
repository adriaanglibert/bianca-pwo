import { FiEdit, FiInfo, FiTrash } from "react-icons/fi";

import React from "react";
import styles from "./Activity.module.scss";
import { useTranslation } from "react-i18next";

const Activity = ({ id, from, to }) => {
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
        <span className={styles.time}>{formatDate(from, to)}</span>
        <span className={styles.name}>{t(`activities.${id}.title`)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.button}>
          <FiInfo />
        </button>
        <div className={styles.change}>
          <button className={styles.button}>
            <FiEdit />
          </button>
          <button className={styles.button}>
            <FiTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
