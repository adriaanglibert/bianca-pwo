import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import Label from './Label';
import styles from './SelectInput.module.scss';

const customStyles = {
    container: (provided) => ({
        ...provided,
        padding: 0,
        margin: 0,
        cursor: 'pointer'
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #CECECE',
      backgroundColor: state.isSelected ? '#4856F4' : state.isFocused ? '#DEE4FF' : '#FFF',
      cursor: 'pointer'
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      borderBottom: '1px solid #CECECE',
    }),
    indicatorSeparator: () => ({
        display: 'none',
        opacity: 0
    })
  }

const SelectInput = ({value, children, options, handleInput}) => {
    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <Label>
                {children}
            </Label>

            <Select
                value={options.find(option => option.value === value)}
                noOptionsMessage={t('no_options')}
                styles={customStyles}
                options={options}
                onChange={e => handleInput(e)}
            />
        </div>
    )
}

export default SelectInput
