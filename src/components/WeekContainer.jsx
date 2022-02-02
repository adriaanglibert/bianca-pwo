import Activity from "components/Activity";
import Collapsible from "./Collapsible";
import Loading from "views/Loading";
import { MAX_DAY_WEIGHT } from "constants/values";
import Progress from 'components/Progress';
import React from "react";
import SmallActivity from "components/SmallActivity";
import { calculateDailyWeight } from "utils/helpers";
import daysConstants from "data/days.json";
import moment from "moment";
import styles from "./WeekContainer.module.scss";

const WeekContainer = ({
  children,
  firstMoment,
  activities,
  defaultActivities,
  handleDeleteActivity,
  handleEditActivity,
  isLoading
}) => {
  const days = Object.keys(daysConstants);

  return (
    <>
      {children}

      <div className={styles.container}>
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${days.length}, minmax(150px, 1fr))`,
          }}
        >
          {days.map((day, index) => (
            <div key={day} className={styles.column}>
              <header className={styles.header}>
                <strong className={`${styles.title} ${firstMoment && moment().isSame(moment(firstMoment).add(index, "day"), 'day') && styles.active}`}>{daysConstants[day]}</strong>
                {firstMoment && (
                  <span className={styles.date}>
                    {moment(firstMoment).add(index, "day").format("DD/MM")}
                  </span>
                )}

                <Progress
                  value={calculateDailyWeight(activities?.[day])}
                  max={MAX_DAY_WEIGHT}
                  className={styles.progress} />
              </header>

              {
                isLoading ?
                <Loading/> :
                <>
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
                </>
              }
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeekContainer;
