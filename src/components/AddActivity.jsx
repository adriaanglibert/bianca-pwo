import React, { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'components/Button';
import { FiPlus, FiCalendar } from 'react-icons/fi';
import SelectInput from "components/SelectInput";
import Dialog from "components/Dialog";
import activities from 'data/activities.json';
import days from 'data/days.json';
import TimeRange from 'components/TimeRange';

const Actions = ({ saveActivity, activityInfo, cancelActivity, disabled }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button onClick={() => cancelActivity()}>
                {t('actions.cancel')}
            </Button>

            <Button
                disabled={disabled}
                variant="success"
                onClick={() => saveActivity(activityInfo)}>
                {t('actions.plan')}
            </Button>
        </>
    )
}

const AddActivity = ({ defaultActivity, setDefaultActivity, isOpen, setIsOpen, addActivity }) => {
    const { t } = useTranslation();
    console.log('defaultActivity', defaultActivity);
    const [activityInfo, setActivityInfo] = useState({});
    console.log('activityInfo',  activityInfo, activityInfo?.from, activityInfo?.to);
    const [validation, setValidation] = useState({
        filledRequired: false,
        timeValidation: true
    });

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
    useEffect(() => {
        console.log('useEffect');
        if (Object.keys(activityInfo).length === 4) {
            setValidation(v => ({
                ...v,
                filledRequired: true
            }));
        }

        return () => {
            setValidation(v => ({
                ...v,
                filledRequired: false
            }));
        }
    }, [activityInfo]);

    useEffect(() => {
        setActivityInfo(defaultActivity)
        return () => {
            setActivityInfo({});
        }
    }, [defaultActivity])

    const handleInput = (val) => {
        console.log('Handle Input');
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
        console.log('Save activity');
        addActivity(info);

        // Reset activity
        setActivityInfo({});
        setDefaultActivity({});
    }

    const cancelActivity = () => {
        setIsOpen(false);
        setDefaultActivity({});
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} icon={<FiPlus />} variant="primary">
                {t('settings.default.button')}
            </Button>

            <Dialog
                actions={<Actions
                    activityInfo={activityInfo}
                    saveActivity={saveActivity}
                    cancelActivity={cancelActivity}
                    disabled={Object.values(validation).some(val => !val)}
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

                <TimeRange
                    from={activityInfo?.from}
                    to={activityInfo?.to}
                    handleInput={handleInput}
                    validation={validation}
                    setValidation={setValidation} />
            </Dialog>
        </>
    )
}

export default AddActivity
