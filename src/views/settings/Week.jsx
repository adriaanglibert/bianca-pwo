import Label from "components/Label";
import React from "react";
import WeekContainer from "components/WeekContainer";
import general from "styling/general.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import IconModal from "components/IconModal";
import AddActivity from "components/AddActivity";


const Week = ({ activities, handleAddActivity, handleDeleteActivity, handleEditActivity }) => {
  const { t } = useTranslation();
  const [defaultActivity, setDefaultActivity] = useState({});
  const [isOpen, setIsOpen] = useState(false);


  const addActivity = (obj) => {
    handleAddActivity(obj.day, obj);
    setIsOpen(false);
    setDefaultActivity({});
  }

  const editActivity = (act) => {
    handleEditActivity(act);
    setDefaultActivity(act);
    setIsOpen(true);
  } 

  return (
    <WeekContainer
      activities={activities}
      handleDeleteActivity={handleDeleteActivity}
      handleEditActivity={editActivity}
      >
      <Label>
        {t("settings.default.title")}

        <IconModal title={t("settings.default.title")} variant='dark'>
          <p className={general.preLine}>{t("settings.default.description")}</p>
        </IconModal>
      </Label>

      <AddActivity
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addActivity={addActivity}
        defaultActivity={defaultActivity}
        setDefaultActivity={setDefaultActivity}
      />
    </WeekContainer>
  );
};

export default Week;
