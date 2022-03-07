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
  RightIcon,
  disabled,
  className = '',
  size = 'medium',
  type = 'button',
  variant = 'primary',
  containerLeftClasses = '',
  containerRightClasses = '',
}) => {
  const buttonClasses = classNames(
    styles.container,
    styles[`container_${size}`],
    styles[`container_${variant}`],

    {
      [className]: className,
      [containerLeftClasses]: !!LeftIcon,
      [containerRightClasses]: !!RightIcon,
    },
  );

  return (
    <button
      name={name}
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}>
      {!!LeftIcon && <LeftIcon />}
      {children}
      {!!RightIcon && <RightIcon />}
    </button>
  );
};

export default Button;
