import ActivityModal from "components/ActivityModal";
import React from "react";
import WeekContainer from "components/WeekContainer";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const Week = ({
  activities,
  defaultActivities,
  setActivities,
  children,
  firstMoment,
  isLoading,
  buttonLabel,
  defaultModalTitle,
  defaultModalEdit,
  initAllowMultipleDays = false,
}) => {
  const [modalActivity, setModalActivity] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [allowMultipleDays, setAllowMultipleDays] = useState(
    initAllowMultipleDays
  );
  const [modalTitle, setModalTitle] = useState(defaultModalTitle);

  const filterDayActivities = (day, activity) => {
    let activityToUpload = activity;
    let activitiesToUpload = activities;

    // Remove original if you're updating.
    if (activity.uuid) {
      Object.keys(activities).forEach((day) => {
        return (activitiesToUpload[day] = activitiesToUpload[day].filter(
          (act) => act.uuid !== activity.uuid
        ));
      });
    } else {
      activityToUpload = {
        ...activity,
        uuid: uuid(),
      };
    }

    const daysActivities = [];

    if (activitiesToUpload?.[day]) {
      daysActivities.push(...activitiesToUpload[day]);
    }

    daysActivities.push(activityToUpload);
    daysActivities.sort((a, b) => parseInt(a.from) - parseInt(b.from));

    return daysActivities;
  };

  const filterActivities = (activity) => {
    let { day, days } = activity;
    let dailyActs = [];
    let multidayActs = {};

    if (day) {
      dailyActs = filterDayActivities(activity.day, activity);

      setActivities({
        ...activities,
        [day]: dailyActs,
      });
    } else if (days) {
      days.forEach((day) => {
        multidayActs[day] = filterDayActivities(day, { day: day, ...activity });
      });

      setActivities({ ...activities, ...multidayActs });
    }
  };

  const saveActivity = (act) => {
    setAllowMultipleDays(false);
    filterActivities(act);
    setIsOpen(false);
    setModalActivity({});
  };

  const closeActivity = () => {
    setAllowMultipleDays(true);
    setModalTitle(defaultModalTitle);
    setIsOpen(false);
    setModalActivity({});
  };

  const deleteActivity = (day, activity) => {
    setActivities({
      ...activities,
      [day]: activities[day].filter((act) => act !== activity),
    });
  };

  const editActivity = (act) => {
    setAllowMultipleDays(false);
    setModalTitle(defaultModalEdit);
    setModalActivity(act);
    setIsOpen(true);
  };

  return (
    <WeekContainer
      activities={activities}
      defaultActivities={defaultActivities}
      handleDeleteActivity={deleteActivity}
      handleEditActivity={editActivity}
      firstMoment={firstMoment}
      isLoading={isLoading}
    >
      {children}

      <ActivityModal
        buttonLabel={buttonLabel}
        title={modalTitle}
        setTitle={setModalTitle}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        saveActivity={saveActivity}
        closeActivity={closeActivity}
        modalActivity={modalActivity}
        setModalActivity={setModalActivity}
        isEdit={!allowMultipleDays}
      />
    </WeekContainer>
  );
};

export default Week;
