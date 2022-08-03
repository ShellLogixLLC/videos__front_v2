import React, {forwardRef, useRef, useState} from 'react';
import {Picker} from 'emoji-mart';
import emojiList from 'emojis-list';
import classNames from 'classnames';
import usePortal from 'react-useportal';

import {UnRegisterPopup} from '~/components';
import {getCookieFromBrowser} from '~/libraries';
import {useLocales, useOnClickOutside} from '~/hooks';

import Typography from '../Typography';
import inputStyles from '../Input/Input.module.scss';

import {InputProps} from './types';
import styles from './EmojisInput.module.scss';

const EmojisInput = forwardRef<any, InputProps>(
  (
    {
      name,
      label,
      error,
      disabled,
      placeholder,
      onMouseOver,
      className = '',
      innerClassName = '',
      labelClassName = '',
      addEmoji,
      ...rest
    },
    ref,
  ) => {
    const modalRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const token = getCookieFromBrowser('token');

    const [expanded, setExpanded] = useState<boolean>(false);

    const {Portal, openPortal, closePortal, isOpen} = usePortal(
      modalRef.current
        ? {
            bindTo: modalRef.current,
          }
        : {},
    );

    const [currentEmoji, setCurrentEmoji] = useState(emojiList[0]);

    const inputClasses = classNames(styles.container, inputStyles.container, {
      [className]: className,
      [inputStyles.container__error]: !!error,
    });

    const inputInnerClasses = classNames(
      inputStyles.container__inner,
      styles.emojis,
      {
        [innerClassName]: innerClassName,
        [inputStyles.container__inner__error]: !!error,
        [inputStyles.container__inner_disabled]: disabled,
      },
    );

    const labelClasses = classNames(inputStyles.container__label, {
      [labelClassName]: labelClassName,
    });

    useOnClickOutside(emojiPickerRef, closePortal);

    const mouseOver = () => {
      setCurrentEmoji(emojiList[Math.floor(Math.random() * emojiList.length)]);
    };

    const handleFocus = () => {
      if (!token) {
        setExpanded(true);
      }
    };

    const {translatedTypo: translatedPlaceholder} = useLocales(placeholder);

    return (
      <>
        <label htmlFor={name} className={labelClasses}>
          {label}
          <div className={inputInnerClasses}>
            <input
              {...rest}
              id={name}
              ref={ref}
              type="text"
              name={name}
              onFocus={handleFocus}
              autoComplete="off"
              disabled={disabled}
              className={inputClasses}
              placeholder={translatedPlaceholder || placeholder}
              onMouseOver={onMouseOver}
            />
            <div
              onClick={openPortal}
              onMouseOver={mouseOver}
              className={styles.random_emojis}>
              {currentEmoji}
            </div>

            <div ref={modalRef} className={styles.container__modal}>
              <Portal>
                {isOpen && (
                  <div
                    className={styles.container__modal__picker}
                    ref={emojiPickerRef}>
                    <Picker
                      set="apple"
                      onSelect={addEmoji}
                      theme="light"
                      title="Heart <3"
                      emoji="green_heart"
                    />
                  </div>
                )}
              </Portal>
            </div>
          </div>
          {error && (
            <Typography
              type="Small"
              className={inputStyles.container__error__text}>
              {error}
            </Typography>
          )}
        </label>
        <UnRegisterPopup
          title="toCommentYouHaveToBeSignedIn"
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </>
    );
  },
);

export default EmojisInput;
