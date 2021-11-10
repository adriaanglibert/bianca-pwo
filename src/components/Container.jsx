import React from 'react'
import styles from './Container.module.scss'

const Container = ({children, styling}) => {
    return (
        <div className={`${styles.container} ${styling}`}>
            {children}
        </div>
    )
}

export default Container
