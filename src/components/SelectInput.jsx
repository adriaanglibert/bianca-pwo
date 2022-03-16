import Label from "./Label";
import React from "react";
import Select from "react-select";
import styles from "./SelectInput.module.scss";
import { useTranslation } from "react-i18next";

const setBackgroundColor = (data, isFocused, isSelected) => {
    if (isSelected) {
        return "#4856F4";
    }

    if (isFocused) {
        return "#DEE4FF";
    }

    if (data?.highlight) {
        if (data.value > 0) {
            return "#e6e6e6";
        }

        return "#f0f0f0";
    }
}

export const customSelectStyles = {
  container: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
    cursor: "pointer"
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (styles,{data, isFocused, isSelected}) => {
    return {
      ...styles,
      borderBottom: "1px solid #CECECE",
      backgroundColor: setBackgroundColor(data, isFocused, isSelected),
      cursor: "pointer",
      borderRadius: 0,
    };
  },
  control: () => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    borderBottom: "1px solid #CECECE",
  }),
  indicatorSeparator: () => ({
    display: "none",
    opacity: 0,
  }),
};

const SelectInput = ({ value, children, options, handleInput }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Label>{children}</Label>

      <Select
        value={options.find((option) => option.value === value)}
        noOptionsMessage={t("no_options")}
        styles={customSelectStyles}
        options={options}
        onChange={(e) => handleInput(e)}
      />
    </div>
  );
};

export default SelectInput;
