import Activity from "components/Activity";
import Collapsible from "./Collapsible";
import React from "react";
import SmallActivity from "components/SmallActivity";
import days from "data/days.json";
import moment from "moment";
import styles from "./WeekContainer.module.scss";

const WeekContainer = ({
  children,
  firstMoment,
  activities,
  defaultActivities,
  handleDeleteActivity,
  handleEditActivity,
}) => {
  const keys = Object.keys(days);

  return (
    <>
      {children}

      <div className={styles.container}>
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${keys.length}, minmax(150px, 1fr))`,
          }}
        >
          {keys.map((day, index) => (
            <div key={day} className={styles.column}>
              <header className={styles.header}>
                <strong className={`${styles.title} ${moment().isSame(moment(firstMoment).add(index, "day"), 'day') && styles.active}`}>{days[day]}</strong>
                {firstMoment && (
                  <span className={styles.date}>
                    {moment(firstMoment).add(index, "day").format("DD/MM")}
                  </span>
                )}
              </header>

              <hr className={styles.line} />

              {activities &&
                activities[day]?.map((activity, index) => (
                  <Activity
                    key={`${day}-${index}-${activity.name}`}
                    activity={activity}
                    day={day}
                    handleDeleteActivity={handleDeleteActivity}
                    handleEditActivity={handleEditActivity}
                  />
                ))}

              {defaultActivities && defaultActivities[day]?.length && (
                <Collapsible title="Standaard">
                  {defaultActivities[day]?.map((activity, index) => (
                    <SmallActivity
                      key={`${day}-${index}-${activity.name}`}
                      activity={activity}
                      day={day}
                      handleDeleteActivity={handleDeleteActivity}
                      handleEditActivity={handleEditActivity}
                    />
                  ))}
                </Collapsible>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeekContainer;
