import React, {useState} from 'react';
import { FiInfo } from "react-icons/fi";
import Dialog from './Dialog';


const Info = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => {console.log('Test'); setOpen(true)}}>
                <FiInfo />
            </button>

            <Dialog open={open}>
                {children}
            </Dialog>
        </>
    )
}

export default Info
