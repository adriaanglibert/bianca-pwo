import React from 'react'
import { Toaster } from "react-hot-toast";

const Toast = () => {
    return (
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
        />
    )
}

export default Toast
