import React from 'react'
import styles from './Card.module.scss';

const Card = ({children, innerStyling, styling}) => {
    return (
        <article className={`${styles.card} ${styling}`}>
            <div className={`${styles.inner} ${innerStyling}`}>
                {children}
            </div>
        </article>
    )
}

export default Card
