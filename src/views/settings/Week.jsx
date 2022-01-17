import ActivityModal from "components/ActivityModal";
import React from "react";
import WeekContainer from "components/WeekContainer";
import { useState } from "react";

const Week = ({ activities, defaultActivities, children, handleSaveActivity, handleDeleteActivity }) => {
  const [defaultActivity, setDefaultActivity] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();

  const saveActivity = (obj) => {
    handleSaveActivity(obj.day, obj);
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
