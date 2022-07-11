import React, {useRef} from 'react';
import usePortal from 'react-useportal';
import classNames from 'classnames';

import {CloseIcon} from '~/assets';
import {PopupProps} from '~/types';
import {useLockBodyScroll, useOnClickOutside} from '~/hooks';

import styles from './Popup.module.scss';

const Popup: React.FC<PopupProps> = ({expanded, setExpanded, children}) => {
  const {Portal} = usePortal();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper__open]: expanded,
  });

  const handleClose = () => setExpanded(false);

  useOnClickOutside(modalRef, handleClose);

  useLockBodyScroll(expanded);

  return (
    <Portal>
      <div className={wrapperClasses}>
        <div ref={modalRef} className={styles.wrapper__content}>
          <CloseIcon
            className={styles.wrapper__content__close_icon}
            onClick={handleClose}
          />
          <div className={styles.wrapper__content__child}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Popup;
