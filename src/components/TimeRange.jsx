import React, {useRef, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import Label from './Label';
import styles from './TimeRange.module.scss';

const TimeRange = ({ handleInput, from, to }) => {
    const { t } = useTranslation();
    const fromEl = useRef();
    const toEl = useRef();

    const formatTime = (time) => {
        return `${time.slice(0, 2)}:${time.slice(2, 4)}:00`;
    }

    useEffect(() => {
        if (from) fromEl.current.value = formatTime(from);
        if (to) toEl.current.value = formatTime(to);
    }, [])

    return (
        <div className={styles.container}>
            <Label>
                {t('actions.set_time')}
            </Label>

            <div className={styles.fields}>
                <input
                    ref={fromEl}
                    className={styles.time}
                    type="time"
                    onChange={e => handleInput({ type: 'from', value: e.target.value.replace(':', '') })} />
                
                <span>tot</span>

                <input
                    ref={toEl}
                    className={styles.time}
                    type="time"
                    onChange={e => handleInput({ type: 'to', value: e.target.value.replace(':', '') })} />
            </div>
        </div>
    )
}

export default TimeRange
