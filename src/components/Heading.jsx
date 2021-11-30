import React from 'react'
import general from 'styling/general.module.scss';
import styles from './Heading.module.scss';

const Heading = ({children, level = 1, as = null, srOnly = false, variant = 'primary'}) => {
    const Tag = 'h' + level;

    return <Tag className={`${styles.heading} ${general['text-' + variant]} ${styles['h' + as]} ${srOnly && general.srOnly}`}>{children}</Tag>;
}

export default Heading;