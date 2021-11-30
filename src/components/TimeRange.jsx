import React from 'react';
import styles from './TimeRange.module.scss';

const TimeRange = ({handleInput}) => {
    return (
        <div className={styles.container}>
            <input className={styles.time} type="time" onChange={e => handleInput(e, 'from')}/>
            <span>tot</span>
            <input className={styles.time} type="time" onChange={e => handleInput(e, 'to')}/>
        </div>
    )
}

export default TimeRange
