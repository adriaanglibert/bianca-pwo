import Label from './Label';
import React from 'react';
import Select from 'react-select';
import checkboxStyles from './SelectCheckbox.module.scss';
import { components } from "react-select";
import { customSelectStyles } from 'components/SelectInput';
import styles from './SelectInput.module.scss';
import { useTranslation } from 'react-i18next';

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <label className={checkboxStyles.container}>
            {props.label}
            <input className={checkboxStyles.input} type="checkbox" checked={props.isSelected}  onChange={() => null}/>
            <span className={checkboxStyles.checkmark}></span>
        </label>
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
