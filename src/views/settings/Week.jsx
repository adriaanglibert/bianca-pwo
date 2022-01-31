import ActivityModal from "components/ActivityModal";
import React from "react";
import WeekContainer from "components/WeekContainer";
import { useState } from "react";
import { v4 as uuid } from 'uuid';

const Week = ({ activities, defaultActivities, setActivities, children, firstMoment, handleSaveActivity, handleDeleteActivity }) => {
  const [defaultActivity, setDefaultActivity] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();

  const filterActivities = (day, activity) => {
    let activityToUpload = activity;
    let activitiesToUpload = activities;

    // Remove original if you're updating.
    if (activity.uuid) {
      Object.keys(activities).forEach(day => {
        return activitiesToUpload[day] = activitiesToUpload[day].filter(act => act.uuid !== activity.uuid);
      });
    } else {
      activityToUpload = {
        ...activity,
        uuid: uuid()
      }
    }

    const daysActivities = [];

    if (activitiesToUpload?.[day]) {
      daysActivities.push(...activitiesToUpload[day]);
    }

    daysActivities.push(activityToUpload);
    daysActivities.sort((a, b) => parseInt(a.from) - parseInt(b.from));

    setActivities({
      ...activitiesToUpload,
      [day]: daysActivities,
    });
  }

  const saveActivity = (obj) => {
    filterActivities(obj.day, obj);

    setIsOpen(false);
    setDefaultActivity({});
  }

  const editActivity = (act) => {
    setModalTitle('actions.edit_plan')
    setDefaultActivity(act);
    setIsOpen(true);
  }

  return (
    <WeekContainer
      activities={activities}
      defaultActivities={defaultActivities}
      handleDeleteActivity={handleDeleteActivity}
      handleEditActivity={editActivity}
      firstMoment={firstMoment}
    >
      {children}

      <ActivityModal
        title={modalTitle}
        setTitle={setModalTitle}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        saveActivity={saveActivity}
        defaultActivity={defaultActivity}
        setDefaultActivity={setDefaultActivity}
      />
    </WeekContainer>
  );
};

export default Week;
