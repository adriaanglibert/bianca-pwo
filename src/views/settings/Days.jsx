import Checkbox from "components/Checkbox";
import CheckboxContainer from "components/CheckboxContainer";
import React from "react";
import days from "../../data/days.json";
import { useTranslation } from "react-i18next";

function Days() {
  const { t } = useTranslation();

  return (
    days && (
      <CheckboxContainer title={t("settings.when")}>
        {Object.keys(days).map((day) => (
          <Checkbox name="days" key={day}>{days[day]}</Checkbox>
        ))}
      </CheckboxContainer>
    )
  );
}

export default Days;
