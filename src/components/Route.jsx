import { Link } from 'react-router-dom';
import React from 'react'
import styles from './Route.module.scss';

const Route = ({children, styling, ...props}) => {
    return (
        <Link {...props} className={`${styles.link} ${styling}`}>
            {children}
        </Link>
    )
}

export default Route
