import { Link } from "react-router-dom";
import React from "react";
import styles from "./Button.module.scss";

const Button = ({
  children,
  to = null,
  variant,
  onClick,
  styling,
  icon,
  ...props
}) => {
  return to ? (
    <Link
      to={to}
      className={`${styles.btn} ${styling} ${styles[variant]} ${
        icon && styles.iconButton
      }`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </Link>
  ) : (
    <button
      className={`${styles.btn} ${styling} ${styles[variant]} ${
        icon && styles.iconButton
      }`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
