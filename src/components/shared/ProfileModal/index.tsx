import React, {useRef, useState} from 'react';
import usePortal from 'react-useportal';
import classNames from 'classnames';

import {Route} from '~/constants';
import {authSelect} from '~/store/auth';
import {PopupProps} from '~/types';
import {Input, Link, Typography} from '~/components';
import {useAppSelector, useLockBodyScroll, useOnClickOutside} from '~/hooks';
import {
  LockIcon,
  EmailIcon,
  MessageIcon,
  EditPenIcon,
  UserRoundIcon,
} from '~/assets';

import styles from './ProfileModal.module.scss';

const ProfileModal: React.FC<PopupProps> = ({expanded, setExpanded}) => {
  const {Portal} = usePortal();
  const {userInfo} = useAppSelector(authSelect);

  const [isUsernameEdited, setUsernameEdited] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string | string[]>(
    (userInfo && userInfo?.username) || 'Username',
  );

  const modalRef = useRef<HTMLDivElement | null>(null);

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper__open]: expanded,
  });

  const handleClose = () => setExpanded(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEditUsername = () => {
    setUsernameEdited(!isUsernameEdited);
  };

  useOnClickOutside(modalRef, handleClose);

  useLockBodyScroll(expanded);

  return (
    <Portal>
      <div className={wrapperClasses}>
        <div ref={modalRef} className={styles.wrapper__content}>
          <div className={styles.wrapper__content__child}>
            <div className={styles.wrapper__content__block}>
              <UserRoundIcon className={styles.wrapper__content__userIcon} />
              <div role="button" onClick={handleEditUsername}>
                <Typography
                  tagName="span"
                  className={styles.wrapper__content__title}>
                  {userInfo?.username}
                </Typography>
                {userInfo && userInfo.isVerified ? (
                  <Typography tagName="span">Verifiedd</Typography>
                ) : (
                  <Typography tagName="span">Unverified</Typography>
                )}
              </div>

              {isUsernameEdited ? (
                <EditPenIcon className={styles.wrapper__content__editIcon} />
              ) : (
                <Input
                  value={inputValue as string}
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div className={styles.wrapper__content__block}>
              <EmailIcon className={styles.wrapper__content__emailIcon} />
              <Typography
                tagName="span"
                className={styles.wrapper__content__block__text}>
                {userInfo?.email}
              </Typography>

              <MessageIcon className={styles.wrapper__content__messageIcon} />
            </div>
            <div className={styles.wrapper__content__block}>
              <LockIcon className={styles.wrapper__content__lockIcon} />
              <Typography
                className={styles.wrapper__content__block__star}
                tagName="span">
                ********
              </Typography>
              <Link to={Route.RegistrationSetupPassword}>
                <EditPenIcon className={styles.wrapper__content__messageIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ProfileModal;
