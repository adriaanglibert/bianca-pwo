import { MAX_ACTIVITY_MET } from "constants/values";
import React from "react";
import styles from "./Progress.module.scss";

const Progress = ({
  value = 0,
  max = MAX_ACTIVITY_MET,
  className,
  isResting,
}) => {
  const coefficient = 100 / max;
  const width = `${value * coefficient}%`;

  return (
    <div
      title={value ? `${value}/${max}` : null}
      className={`${styles.progress} ${className}`}
    >
      <span
        className={`${styles.bar} ${value > max ? styles.danger : ""} ${
          styles[isResting]
        }`}
        style={{ width: width }}
      ></span>
    </div>
  );
};

export default Progress;
