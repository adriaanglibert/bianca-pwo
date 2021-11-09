import { Link } from 'react-router-dom';
import React from 'react';
import styles from './Tab.module.scss';

const Tab = ({children, active = false, ...props}) => {
    const classes = active ? styles.active : styles.inactive;

    return (
        <Link {...props} className={`${styles.tab} ${classes}`}>
            {children}
        </Link>
    )
}

export default Tab
