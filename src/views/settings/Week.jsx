import Label from "components/Label";
import React from "react";
import WeekContainer from "components/WeekContainer";
import general from "styling/general.module.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import IconModal from "components/IconModal";
import ActivityModal from "components/ActivityModal";


const Week = ({ activities, handleSaveActivity, handleDeleteActivity }) => {
  const { t } = useTranslation();
  const [defaultActivity, setDefaultActivity] = useState({});
  const [isOpen, setIsOpen] = useState(false);


  const saveActivity = (obj) => {
    handleSaveActivity(obj.day, obj);
    setIsOpen(false);
    setDefaultActivity({});
  }

  const editActivity = (act) => {
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

      <ActivityModal
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
