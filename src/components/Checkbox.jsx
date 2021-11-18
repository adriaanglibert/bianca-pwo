import React from 'react'

const Checkbox = ({children, name, value}) => {
    return (
        <label>
            <input type="checkbox" name={name} value={value} />
            <span>
                {children}
            </span>
        </label>
    )
}

export default Checkbox
