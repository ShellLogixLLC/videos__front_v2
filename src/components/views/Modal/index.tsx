import React, {useContext, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import {ModalContext} from '~/context';
import {useOnClickOutside} from '~/hooks';

import {ModalProps} from './types';
import styles from './Modal.module.scss';

const Modal: React.FC<ModalProps> = (
  {animation = 'reveal'},
  contentStyles = '',
  containerStyles = '',
  backgroundClasses = '',
) => {
  const contentRef = useRef(null);
  const [isOut, setIsOut] = useState(false);
  const {modal, modalContent, closeModal} = useContext(ModalContext);

  const animationKey = `container__${animation}`;

  const containerClasses = useMemo(
    () =>
      classNames(styles.container, {
        [`${animationKey}_out`]: isOut,
        [styles[animationKey]]: modal,
        [containerStyles]: containerStyles,
      }),
    [animationKey, containerStyles, isOut, modal],
  );

  const containerBackgroundClasses = useMemo(
    () =>
      classNames(
        styles[`${animationKey}__background`],
        styles.container__background,
        {
          [backgroundClasses]: backgroundClasses,
        },
      ),
    [animationKey, backgroundClasses],
  );

  const contentClasses = useMemo(
    () =>
      classNames(
        'container',
        styles[`${animationKey}__background__content`],
        styles.container__content,
        {
          [contentStyles]: contentStyles,
        },
      ),
    [animationKey, contentStyles],
  );

  useOnClickOutside(contentRef, () => {
    setIsOut(true);
    closeModal();
  });

  if (!modal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={containerClasses}>
      <div className={containerBackgroundClasses}>
        <div ref={contentRef} className={contentClasses}>
          {modalContent}
        </div>
      </div>
    </div>,
    document.querySelector('#modal-root') as Element,
  );
};

export default Modal;
