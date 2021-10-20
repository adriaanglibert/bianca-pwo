import React from 'react'
import general from 'styling/general.module.scss'

const Center = ({children}) => {
    return (
        <div className={general.center}>
            {children}
        </div>
    )
}

export default Center
