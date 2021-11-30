import React, {useState} from 'react';
import { FiInfo } from "react-icons/fi";
import Dialog from './Dialog';
import styles from 'components/IconModal.module.scss';
import general from 'styling/general.module.scss';
import { useTranslation } from 'react-i18next';


const IconModal = ({ title, children, type = 'info', variant = 'primary', icon =  <FiInfo /> }) => {
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();

    return (
        <>
            <button title={`${t(type)}: ${title}`} className={`${styles.button} ${general['text-' + variant]}`} onClick={() => setOpen(true)}>
               {icon}
            </button>

            <Dialog
                title={title}
                open={open}
                setOpen={setOpen}
                icon={icon}
                >
                {children}
            </Dialog>
        </>
    )
}

export default IconModal
