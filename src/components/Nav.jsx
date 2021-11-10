import React from 'react'
import styling from './Nav.module.scss';

const Nav = () => {
    return (
        <nav className={styling.navbar}>
            <img src="/images/logo.png" alt="logo" />
        </nav>
    )
}

export default Nav
