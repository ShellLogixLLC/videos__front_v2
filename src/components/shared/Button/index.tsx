import React from 'react';
import classNames from 'classnames';

import {IButtonProps} from './types';
//
import styles from './Button.module.scss';

const Button: React.FC<IButtonProps> = ({
  name,
  title,
  onClick,
  children,
  LeftIcon,
  disabled,
  className = '',
  size = 'medium',
  type = 'button',
  variant = 'primary',
  containerLeftClasses = '',
}) => {
  const buttonClasses = classNames(
    styles.container,
    styles[`container_${size}`],
    styles[`container_${variant}`],

    {
      [className]: className,
      [containerLeftClasses]: !!LeftIcon,
    },
  );

  return (
    <button
      name={name}
      title={title}
      type={type}
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}>
      {!!LeftIcon && <LeftIcon />}

      {children}
    </button>
  );
};

export default Button;
