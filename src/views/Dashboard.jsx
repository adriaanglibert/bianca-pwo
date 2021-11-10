import React from 'react'
import { logout } from 'firebase-config';

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Dashboard
