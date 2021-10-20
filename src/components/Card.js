import React from 'react'
import styles from './Card.module.scss';

const Card = ({children}) => {
    return (
        <article className={styles.card}>
            <div className={styles.inner}>
                {children}
            </div>
        </article>
    )
}

export default Card
