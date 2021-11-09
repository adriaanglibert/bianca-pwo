import React from 'react';
import styles from './Button.module.scss';

const Button = ({children, variant, onClick, ...props}) => {
    return (
        <button className={`${styles.btn} ${styles[variant]}`} onClick={onClick} {...props}>
            {children}
        </button>
    )
}

export default Button
