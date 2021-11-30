import Label from "components/Label";
import React from "react";
import WeekContainer from "components/WeekContainer";
import general from "styling/general.module.scss";
import useData from "hooks/useData";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import IconModal from "components/IconModal";
import Button from "components/Button";
import { FiPlus, FiCalendar } from 'react-icons/fi';
import Dialog from "components/Dialog";
import SelectInput from "components/SelectInput";
import AddActivity from "components/AddActivity";


const Week = ({ activities, handleAddActivity, handleDeleteActivity }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);


  const addActivity = (obj) => {
    handleAddActivity(obj.day, obj);

    setIsOpen(false);
  }

  return (
    <WeekContainer activities={activities} handleDeleteActivity={handleDeleteActivity}>
      <Label>
        {t("settings.default.title")}

        <IconModal title={t("settings.default.title")} variant='dark'>
          <p className={general.preLine}>{t("settings.default.description")}</p>
        </IconModal>
      </Label>

      <AddActivity isOpen={isOpen} setIsOpen={setIsOpen} addActivity={addActivity} />
    </WeekContainer>
  );
};

export default Week;
