import Label from "components/Label";
import React from "react";
import styles from './CheckboxContainer.module.scss';

const CheckboxContainer = ({ title, children }) => {
  return (
    <fieldset className={styles.container}>
      <legend>
        <Label tag={false}>{title}</Label>
      </legend>

      {children}
    </fieldset>
  );
};

export default CheckboxContainer;
