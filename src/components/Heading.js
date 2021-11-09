import React from 'react'
import styles from './Heading.module.scss';

const Heading = ({children, level = 1, as = null}) => {
    const Tag = 'h' + level;

    return <Tag className={`${styles.heading} ${styles['h' + as]}`}>{children}</Tag>;
}

export default Heading;