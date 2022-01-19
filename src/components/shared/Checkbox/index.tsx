import React, {forwardRef} from 'react';

import {ICheckboxProps} from './types';
import styles from './Checkbox.module.scss';

const Checkbox = forwardRef<any, ICheckboxProps>(
  ({name, value, children, useCustomOnChange, onChange = () => null}, ref) => (
    <label htmlFor={name} className={styles.container}>
      <input
        id={name}
        name={name}
        ref={ref}
        type="checkbox"
        checked={value}
        className={styles.container__input}
        onChange={(event) =>
          onChange(useCustomOnChange ? event : event.target.checked)
        }
      />
      <span className={styles.container__after} />
      {children}
    </label>
  ),
);

export default Checkbox;
