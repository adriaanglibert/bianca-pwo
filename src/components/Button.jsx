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
      className={`${styles.btn} ${styling} ${styles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </Link>
  ) : (
    <button
      className={`${styles.btn} ${styling} ${styles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
