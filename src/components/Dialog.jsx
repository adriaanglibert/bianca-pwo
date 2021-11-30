import React from 'react'
import Modal from 'react-modal';
import Heading from './Heading';
import { defaultStyles } from 'react-modal';
import styles from 'components/Dialog.module.scss';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { FiX } from "react-icons/fi";

const customStyles = {
    ...defaultStyles,
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '0.4rem',
        boxShadow: '0.25rem 0.25rem 0.5rem rgba(16,16,16, 0.10)',
        padding: '0',
        maxWidth: '90%',
        maxHeight: '90%'
    },
    overlay: {
        backgroundColor: 'rgba(16, 16, 16, 0.75)',
        padding: '1rem'
    },
};


const Dialog = ({ title, variant, children, open = false, setOpen, icon }) => {
    const {t} = useTranslation();

    return (
        <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            contentLabel={title}
            style={customStyles}
        >
            {
                title &&
                <div className={styles.header}>
                    {icon && <span className={styles.icon}>{icon}</span>}
                    <Heading variant={variant} level={2}>
                        {title}
                    </Heading>
                </div>
            }

            <article className={styles.content}>
                {children}
            </article>

            <div className={styles.actions}>
                <Button variant="light" onClick={() => setOpen(false)}>
                    {t('close')}
                </Button>
            </div>

        </Modal>
    )
}

export default Dialog
