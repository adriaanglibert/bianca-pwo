import React from 'react';
import styles from './Input.module.scss';

const Input = ({ children, value, type = 'text', styling, onChange, placeholder }) => {
    return (
        <label className={styles.wrapper}>
            <span className={`${styles.label} ${styling}`}>
                {children}
            </span>

            <input
                type={type}
                className={styles.input}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </label>
    )
}

export default Input
