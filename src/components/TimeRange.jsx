import React, { useState } from 'react';

import Label from './Label';
import styles from './TimeRange.module.scss';
import { useTranslation } from 'react-i18next';

const formatTime = (time) => {
    return `${time.slice(0, 2)}:${time.slice(2, 4)}:00`;
}

const TimeRange = ({ handleInput, from, to, setValidation, validation, children }) => {
    const { t } = useTranslation();
    const [error, setError] = useState();

    const validateInput = (type, val) => {
        const timeAsNumber = val.replace(':', '');

        if ((type === 'to' && from >= timeAsNumber) || (type === 'from' && to <= timeAsNumber)) {
            setError(t('errors.time_range'));
            setValidation({
                ...validation,
                timeValidation: false
            });
        } else {
            setError(null);
            setValidation({
                ...validation,
                timeValidation: true
            });
        }

        return handleInput({ type: type, value: val.replace(':', '') });
    }

    return (
        <div className={styles.container}>
            <Label>
                {children}
            </Label>

            <div className={styles.fields}>
                <input
                    className={styles.time}
                    type="time"
                    defaultValue={from ? formatTime(from) : null}
                    onChange={e => validateInput('from', e.target.value)} />

                <span>{t('until')}</span>

                <input
                    className={styles.time}
                    type="time"
                    defaultValue={to ? formatTime(to) : null}
                    onChange={e => validateInput('to', e.target.value)} />
            </div>

            {
                error && <span className={styles.error}>{error}</span>
            }
        </div>
    )
}

export default TimeRange
