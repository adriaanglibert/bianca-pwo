import React from 'react'
import styles from './Label.module.scss';

const Label = ({ tag = true, children }) => {
    return (
        tag ?
        <label className={styles.label}>
            {children}
        </label> :
        <strong className={styles.label}>
            {children}
        </strong>
    )
}

export default Label
