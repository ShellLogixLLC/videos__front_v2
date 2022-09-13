import React, {forwardRef, useMemo, useState, useCallback} from 'react';
import classNames from 'classnames';

import {useLocales} from '~/hooks';

import Typography from '../Typography';

import {InputProps} from './types';
import styles from './Input.module.scss';

const Input = forwardRef<any, InputProps>(
  (
    {
      type = 'text',
      name,
      label,
      error,
      value,
      onFocus,
      onClick,
      onKeyUp,
      disabled,
      onChange,
      setValue,
      readOnly,
      labelText = '',
      className = '',
      RightIcon,
      maxLength,
      autoFocus,
      onKeyDown,
      smallLabel,
      wrapperRef,
      placeholder,
      warningText,
      onMouseOver,
      toggleHandle,
      rightIconStyle = '',
      innerClassName = '',
      labelClassName = '',
      RightToggledIcon,
      ...rest
    },
    ref,
  ) => {
    const [isToggledIcon, setIsToggledIcon] = useState<boolean>(false);

    const inputClasses = classNames(styles.container, {
      [className]: className,
      [styles.container_right_icon]: RightIcon,
      [styles.container__error]: !!error,
    });

    const inputInnerClasses = classNames(styles.container__inner, {
      [innerClassName]: innerClassName,
      [styles.container__inner__error]: !!error,
      [styles.container__inner_disabled]: disabled,
    });

    const labelClasses = classNames(styles.container__label, {
      [labelClassName]: labelClassName,
    });

    const labelTextClasses = classNames({[labelText]: labelText});

    const rightIconCLasses = classNames(styles.container__right_icon, {
      [rightIconStyle]: rightIconStyle,
    });

    const togglePasswordVisibility = useCallback(() => {
      if (RightToggledIcon) {
        setIsToggledIcon(!isToggledIcon);
      }
    }, [RightToggledIcon, isToggledIcon]);

    const RightIconComponent = useMemo(
      () =>
        (RightIcon && RightToggledIcon
          ? isToggledIcon
            ? RightToggledIcon
            : RightIcon
          : RightIcon) as React.FC<React.SVGProps<SVGSVGElement>>,
      [RightIcon, RightToggledIcon, isToggledIcon],
    );

    const {translatedTypo: translatedLabel} = useLocales(label);
    const {translatedTypo: translatedPlaceholder} = useLocales(placeholder);
    const {translatedTypo: translatedSmallLabel} = useLocales(smallLabel);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (name) {
        setValue(name, val.trim(), {shouldValidate: true});
      }
      onChange;
    };

    return (
      <label htmlFor={name} className={labelClasses}>
        <div className={styles.container__fields}>
          <span className={labelTextClasses}>{translatedLabel || label}</span>
          {smallLabel && (
            <span className={styles.container__label__small}>
              {translatedSmallLabel || label}
            </span>
          )}
        </div>

        <div ref={wrapperRef} className={inputInnerClasses}>
          <input
            {...rest}
            id={name}
            ref={ref}
            name={name}
            value={value}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            autoComplete="off"
            readOnly={readOnly}
            onChange={handleChange}
            disabled={disabled}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            maxLength={maxLength}
            className={inputClasses}
            onMouseOver={onMouseOver}
            placeholder={translatedPlaceholder || placeholder}
            type={isToggledIcon ? 'text' : type}
            pattern={type === 'number' ? '[0-9]*' : undefined}
            inputMode={type === 'number' ? 'numeric' : 'text'}
            data-dt-idx="1"
          />
          {RightIcon && (
            <RightIconComponent
              role="button"
              className={rightIconCLasses}
              onClick={
                type === 'text' ? toggleHandle : togglePasswordVisibility
              }
              style={{
                cursor: RightToggledIcon ? 'pointer' : 'auto',
              }}
            />
          )}
        </div>
        {warningText && !error && (
          <Typography type="Small" className={styles.container__warning_text}>
            {warningText}
          </Typography>
        )}
        {error && (
          <Typography type="Small" className={styles.container__error__text}>
            {error}
          </Typography>
        )}
      </label>
    );
  },
);

export default Input;
