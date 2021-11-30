import React, {useMemo, useState} from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'components/Button';
import { FiPlus, FiCalendar } from 'react-icons/fi';
import SelectInput from "components/SelectInput";
import Dialog from "components/Dialog";
import activities from 'data/activities.json';
import days from 'data/days.json';
import TimeRange from 'components/TimeRange';

const Actions = ({ addActivity, activityInfo, setIsOpen }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button onClick={() => setIsOpen(false)}>
                {t('actions.cancel')}
            </Button>

            <Button
                variant="success"
                onClick={() => addActivity(activityInfo)}>
                {t('actions.plan')}
            </Button>
        </>
    )
}

const AddActivity = ({ isOpen, setIsOpen, addActivity }) => {
    const { t } = useTranslation();
    const [activityInfo, setActivityInfo] = useState({
        from: '0800',
        to: '0830',
    });

    const acts = useMemo(() => {
        return Object.keys(activities).map(activity => {
            return {
                value: activity,
                label: t(`activities.${activity}.title`),
                type: 'activity'
            }
        })
      }, []);

    const dys = useMemo(() => {
        return Object.keys(days).map(day => {
            return {
                value: day,
                label: days[day],
                type: 'day'
            }
        })
      }, []);

    const handleInput = (val) => {
        switch (val.type) {
            case 'day':
                setActivityInfo({
                    ...activityInfo,
                    day: val.value
                })
                break;
            case 'activity':
                setActivityInfo({
                    ...activityInfo,
                    id: val.value
                })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} icon={<FiPlus />} variant="primary">
                {t('settings.default.button')}
            </Button>

            <Dialog
                actions={<Actions
                    addActivity={addActivity}
                    activityInfo={activityInfo}
                    setIsOpen={setIsOpen}
                />}
                icon={<FiCalendar />}
                title={t('actions.default_plan')}
                open={isOpen}
                setOpen={setIsOpen}>
                <SelectInput
                    value={activityInfo?.id}
                    options={acts}
                    handleInput={handleInput}
                    >
                    {t('actions.select_activity')}
                </SelectInput>

                <SelectInput
                    value={activityInfo?.day}
                    options={dys}
                    handleInput={handleInput}
                    >
                    {t('actions.select_day')}
                </SelectInput>

                <TimeRange  handleInput={handleInput} />
            </Dialog>
        </>
    )
}

export default AddActivity
