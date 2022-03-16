import { FiCalendar, FiPlus } from "react-icons/fi";
import React, { useEffect, useMemo, useState } from "react";

import Button from "components/Button";
import Dialog from "components/Dialog";
import SelectCheckbox from "components/SelectCheckbox";
import SelectInput from "components/SelectInput";
import TimeRange from "components/TimeRange";
import activities from "data/activities.json";
import days from "data/days.json";
import { useTranslation } from "react-i18next";

function groupByKey(array, key, keys, t) {
  const grouped = array.reduce((hash, obj, index) => {
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat({ id: keys[index], ...obj }),
    });
  }, {});

  return Object.keys(grouped).map((group) => {
    return {
      label: group,
      options: grouped[group]
        .map((el) => {
          const id = el.id;

          return {
            value: id,
            label: t(`activities.${id}.title`),
            type: "activity",
            highlight: activities[id]?.highlight,
          };
        })
        .sort((a, b) => {
          var nameA = a.label.toUpperCase(); // ignore upper and lowercase
          var nameB = b.label.toUpperCase(); // ignore upper and lowercase
          if (a.highlight || b.highlight) {
            return -1;
          }
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }),
    };
  });
}

const Actions = ({ save, info, cancel, disabled }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button onClick={() => cancel()}>{t("actions.cancel")}</Button>

      <Button disabled={disabled} variant="success" onClick={() => save(info)}>
        {t("actions.plan")}
      </Button>
    </>
  );
};

const ActivityModal = ({
  buttonLabel,
  title,
  setTitle,
  modalActivity,
  setModalActivity,
  isOpen,
  setIsOpen,
  saveActivity,
  closeActivity,
  isEdit = false,
}) => {
  const { t } = useTranslation();
  const [activityInfo, setActivityInfo] = useState({ days: [] });
  const [validation, setValidation] = useState({
    filledRequired: false,
    timeValidation: true,
  });
  const label = isEdit ? "edit" : "select";

  // Transform data
  const acts = useMemo(() => {
    return groupByKey(
      Object.values(activities),
      "category",
      Object.keys(activities),
      t
    ).sort((a, b) => {
      var nameA = a.label.toUpperCase(); // ignore upper and lowercase
      var nameB = b.label.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }, [t]);

  const dys = useMemo(() => {
    return Object.keys(days).map((day) => {
      return {
        value: day,
        label: days[day],
        type: "day",
      };
    });
  }, []);

  // Validation
  useEffect(() => {
    if (Object.keys(activityInfo).length >= 4) {
      setValidation((v) => ({
        ...v,
        filledRequired: true,
      }));
    }

    return () => {
      setValidation((v) => ({
        ...v,
        filledRequired: false,
      }));
    };
  }, [activityInfo]);

  // Initial Values
  useEffect(() => {
    setActivityInfo(modalActivity);

    return () => {
      setActivityInfo({});
    };
  }, [modalActivity]);

  const open = () => {
    setTitle(title);
    setIsOpen(true);
  };

  const save = (info) => {
    saveActivity(info);

    // Reset activity
    setActivityInfo({});
    setModalActivity({});
  };

  const cancel = () => {
    closeActivity();
  };

  const handleInput = (val) => {
    switch (val.type) {
      case "days":
        val.value?.forEach((day) => {
          let prevDays = [];

          if (activityInfo.days) {
            prevDays = activityInfo.days;
          }

          setActivityInfo({
            ...activityInfo,
            days: [...prevDays, day.value],
          });
        });
        break;
      case "day":
        setActivityInfo({
          ...activityInfo,
          day: val.value,
        });
        break;
      case "activity":
        setActivityInfo({
          ...activityInfo,
          id: val.value,
        });
        break;
      case "from":
        setActivityInfo({
          ...activityInfo,
          from: val.value,
        });
        break;
      case "to":
        setActivityInfo({
          ...activityInfo,
          to: val.value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Button
        styling="add-activity-button"
        onClick={() => open()}
        icon={<FiPlus />}
        variant="primary"
      >
        {t(buttonLabel)}
      </Button>

      <Dialog
        actions={
          <Actions
            info={activityInfo}
            save={save}
            cancel={cancel}
            disabled={Object.values(validation).some((val) => !val)}
          />
        }
        icon={<FiCalendar />}
        title={t(title)}
        open={isOpen}
        setOpen={setIsOpen}
        onClose={cancel}
      >
        {isEdit ? (
          <SelectInput
            value={activityInfo?.day}
            options={dys}
            handleInput={handleInput}
          >
            {t("actions.edit_day")}
          </SelectInput>
        ) : (
          <SelectCheckbox
            value={activityInfo?.day}
            options={dys}
            handleInput={handleInput}
          >
            {t("actions.select_days")}
          </SelectCheckbox>
        )}

        <SelectInput
          value={activityInfo?.id}
          options={acts}
          handleInput={handleInput}
          grouped={true}
        >
          {t(`actions.${label}_activity`)}
        </SelectInput>

        <TimeRange
          from={activityInfo?.from}
          to={activityInfo?.to}
          handleInput={handleInput}
          validation={validation}
          setValidation={setValidation}
        >
          {t(`actions.${label}_time`)}
        </TimeRange>
      </Dialog>
    </>
  );
};

export default ActivityModal;
