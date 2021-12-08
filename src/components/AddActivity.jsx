import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'components/Button';
import { FiPlus, FiCalendar } from 'react-icons/fi';
import SelectInput from "components/SelectInput";
import Dialog from "components/Dialog";
import activities from 'data/activities.json';
import days from 'data/days.json';
import TimeRange from 'components/TimeRange';

const Actions = ({ saveActivity, activityInfo, setIsOpen, enabled }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button onClick={() => setIsOpen(false)}>
                {t('actions.cancel')}
            </Button>

            <Button
                disabled={!enabled}
                variant="success"
                onClick={() => saveActivity(activityInfo)}>
                {t('actions.plan')}
            </Button>
        </>
    )
}

const AddActivity = ({ isOpen, setIsOpen, addActivity }) => {
    const { t } = useTranslation();
    const [activityInfo, setActivityInfo] = useState({});
    const [errors, ] = useState({});

    // Transform data
    const acts = useMemo(() => {
        return Object.keys(activities).map(activity => {
            return {
                value: activity,
                label: t(`activities.${activity}.title`),
                type: 'activity'
            }
        })
    }, [t]);

    const dys = useMemo(() => {
        return Object.keys(days).map(day => {
            return {
                value: day,
                label: days[day],
                type: 'day'
            }
        })
    }, []);

    // Events
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
            case 'from':
                setActivityInfo({
                    ...activityInfo,
                    from: val.value
                })
                break;
            case 'to':
                setActivityInfo({
                    ...activityInfo,
                    to: val.value
                })
                break;
            default:
                break;
        }
    }

    const saveActivity = (info) => {
        addActivity(info);

        // Reset activity
        setActivityInfo({});
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} icon={<FiPlus />} variant="primary">
                {t('settings.default.button')}
            </Button>

            <Dialog
                actions={<Actions
                    saveActivity={saveActivity}
                    activityInfo={activityInfo}
                    setIsOpen={setIsOpen}
                    enabled={Boolean(!Object.keys(errors).length && Object.keys(activityInfo).length === 4)}
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

                <TimeRange from={activityInfo?.from} to={activityInfo?.to} handleInput={handleInput} />
            </Dialog>
        </>
    )
}

export default AddActivity
