import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import Label from './Label';
import styles from './SelectInput.module.scss';
import { components } from "react-select";
import { customSelectStyles } from 'components/SelectInput';

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
      <label class="container">
          {props.label}
          <input type="checkbox" checked="checked">
          <span class="checkmark"></span>
      </label>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const SelectCheckbox = ({value, children, options, handleInput}) => {
    const {t} = useTranslation();

    const handleSelect = (values) => {
        handleInput({
            type: 'days',
            value: values
        });
    }

    return (
        <div className={styles.container}>
            <Label>
                {children}
            </Label>

            <Select
                noOptionsMessage={t('no_options')}
                styles={customSelectStyles}
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                    Option
                }}
                onChange={handleSelect}
                allowSelectAll={true}
                />
        </div>
    )
}

export default SelectCheckbox
