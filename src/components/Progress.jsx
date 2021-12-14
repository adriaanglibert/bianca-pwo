import React from 'react'
import styles from './Progress.module.scss';

const Progress = ({value = 0, max = 70}) => {
    const coefficient = 100 / max;
    const width = `${value * coefficient}%`;

    return (
        <div className={styles.progress}>
            <span className={styles.bar} style={{width: width}}></span>
        </div>
    )
}

export default Progress