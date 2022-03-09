import Button from "./Button";
import { FiX } from "react-icons/fi";
import Heading from "./Heading";
import Modal from "react-modal";
import React from "react";
import { defaultStyles } from "react-modal";
import general from "styling/general.module.scss";
import styles from "components/Dialog.module.scss";
import { useTranslation } from "react-i18next";

const customDialogStyles = {
  ...defaultStyles,
  content: {
    border: "none",
    borderRadius: "0.4rem",
    boxShadow: "0.25rem 0.25rem 0.5rem rgba(16,16,16, 0.10)",
    padding: "0",
    width: "90%",
    maxWidth: "460px",
    maxHeight: "90%",
    position: "relative",
    inset: "0",
    overflow: "visible",
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(16, 16, 16, 0.75)",
    padding: "1rem",
    zIndex: "100"
  },
};

const Dialog = ({
  title,
  variant = 'primary',
  children,
  open = false,
  setOpen,
  icon,
  actions = false,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel={title}
      style={customDialogStyles}
      shouldCloseOnOverlayClick={true}
      onAfterClose={onClose}
    >
      {title && (
        <div className={styles.header}>
          {icon && (
            <span className={`${styles.icon} ${general["text-" + variant]}`}>
              {icon}
            </span>
          )}
          <Heading variant={variant} level={2}>
            {title}
          </Heading>
        </div>
      )}

      <article className={styles.content}>{children}</article>

      <div className={styles.actions}>
        {actions ? (
          actions
        ) : (
          <Button variant="light" onClick={() => setOpen(false)}>
            {t("close")}
          </Button>
        )}
      </div>

      <button onClick={() => setOpen(false)} className={styles.close}>
        <FiX />
      </button>
    </Modal>
  );
};

export default Dialog;
