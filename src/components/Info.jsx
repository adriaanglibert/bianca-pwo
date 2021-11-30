import React, {useState} from 'react';
import { FiInfo } from "react-icons/fi";
import Dialog from './Dialog';
import styles from 'components/Info.module.scss';


const Info = ({ title, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className={styles.button} onClick={() => setOpen(true)}>
                <FiInfo />
            </button>

            <Dialog
                title={title}
                open={open}
                setOpen={setOpen}
                icon={<FiInfo/>}
                >
                {children}
            </Dialog>
        </>
    )
}

export default Info
