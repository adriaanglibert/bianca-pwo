import { FiCalendar, FiPlus } from 'react-icons/fi';
import React, { useEffect, useMemo, useState } from 'react'

import Button from 'components/Button';
import Dialog from "components/Dialog";
import SelectInput from "components/SelectInput";
import TimeRange from 'components/TimeRange';
import activities from 'data/activities.json';
import days from 'data/days.json';
import { useTranslation } from 'react-i18next'

const Actions = ({ save, info, cancel, disabled }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button onClick={() => cancel()}>
                {t('actions.cancel')}
            </Button>

            <Button
                disabled={disabled}
                variant="success"
                onClick={() => save(info)}>
                {t('actions.plan')}
            </Button>
        </>
    )
}

const ActivityModal = ({
    buttonLabel,
    title,
    setTitle,
    defaultActivity,
    setDefaultActivity,
    isOpen,
    setIsOpen,
    saveActivity,
    closeActivity
}) => {
    const { t } = useTranslation();
    const [activityInfo, setActivityInfo] = useState({});
    const [validation, setValidation] = useState({
        filledRequired: false,
        timeValidation: true
    });

    // Transform data
    const acts = useMemo(() => {
        return Object.keys(activities).map(id => {
            return {
                value: id,
                label: t(`activities.${id}.title`),
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

    // Validation
    useEffect(() => {
        if (Object.keys(activityInfo).length >= 4) {
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

    // Initial Values
    useEffect(() => {
        setActivityInfo(defaultActivity);

        return () => {
            setActivityInfo({});
        }
    }, [defaultActivity])

    const open = () => {
        setTitle(title);
        setIsOpen(true);
    }

    const save = (info) => {
        saveActivity(info);

        // Reset activity
        setActivityInfo({});
        setDefaultActivity({});
    }

    const cancel = () => {
        closeActivity();
    }

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
                actions={<Actions
                    info={activityInfo}
                    save={save}
                    cancel={cancel}
                    disabled={Object.values(validation).some(val => !val)}
                />}
                icon={<FiCalendar />}
                title={t(title)}
                open={isOpen}
                setOpen={setIsOpen}
                onClose={cancel}
            >
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

export default ActivityModal
