import React, {forwardRef} from 'react';

import {ICheckboxProps} from './types';
import styles from './Checkbox.module.scss';

const Checkbox = forwardRef<any, ICheckboxProps>(
  ({name, value, children, useCustomOnChange, onChange = () => null}, ref) => (
    <label htmlFor={name} className={styles.container}>
      <div className={styles.container__wrapper}>
        <input
          id={name}
          ref={ref}
          name={name}
          type="checkbox"
          checked={value}
          autoComplete="off"
          className={styles.container__input}
          onChange={(event) =>
            onChange(useCustomOnChange ? event : event.target.checked)
          }
        />
        <span className={styles.container__after} />
      </div>

      {children}
    </label>
  ),
);

export default Checkbox;
