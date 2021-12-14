import React from 'react';
import { useTranslation } from 'react-i18next';
import Label from './Label';
import styles from './TimeRange.module.scss';

const formatTime = (time) => {
    return `${time.slice(0, 2)}:${time.slice(2, 4)}:00`;
}

const TimeRange = ({ handleInput, from, to }) => {
    const { t } = useTranslation();


    return (
        <div className={styles.container}>
            <Label>
                {t('actions.set_time')}
            </Label>

            <div className={styles.fields}>
                <input
                    className={styles.time}
                    type="time"
                    defaultValue={from ? formatTime(from) : null}
                    onChange={e => handleInput({ type: 'from', value: e.target.value.replace(':', '') })} />
                
                <span>tot</span>

                <input
                    className={styles.time}
                    type="time"
                    defaultValue={to ? formatTime(to) : null}
                    onChange={e => handleInput({ type: 'to', value: e.target.value.replace(':', '') })} />
            </div>
        </div>
    )
}

export default TimeRange
