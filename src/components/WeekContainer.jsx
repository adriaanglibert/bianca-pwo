import Activity from "components/Activity";
import React from "react";
import days from "data/days.json";
import styles from "./WeekContainer.module.scss";

const WeekContainer = ({ children, activities, handleDeleteActivity }) => {
  const keys = Object.keys(days);
  console.log("Passed act: ", activities);
  return (
    <>
      {children}
      <div className={styles.container}>
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${keys.length}, minmax(226px, 1fr))`,
          }}
        >
          {keys.map((day) => (
            <div key={day} className={styles.column}>
              <header className={styles.header}>
                <strong className={styles.title}>{days[day]}</strong>
              </header>

              <hr className={styles.line} />

              {activities &&
                activities[day]?.map((activity, index) => (
                  <Activity
                    key={`${day}-${index}-${activity.name}`}
                    activity={activity}
                    day={day}
                    handleDeleteActivity={handleDeleteActivity}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeekContainer;
