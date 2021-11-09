import React from 'react'
import styles from './Tabs.module.scss';

const Tabs = ({children}) => {
    return (
        <nav className={styles.tabs}>
            {children}
        </nav>
    )
}

export default Tabs
