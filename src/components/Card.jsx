import React from 'react'
import styles from './Card.module.scss';

const Card = ({children, styling}) => {
    return (
        <article className={`${styles.card} ${styling}`}>
            <div className={styles.inner}>
                {children}
            </div>
        </article>
    )
}

export default Card
