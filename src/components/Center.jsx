import React from 'react'
import general from 'styling/general.module.scss'

const Center = ({children, styling}) => {
    return (
        <div className={`${general.center} ${styling}`}>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Center
