import React, {useEffect, useRef, useState} from 'react';
import usePortal from 'react-useportal';
import classNames from 'classnames';

import {Route} from '~/constants';
import {authSelect} from '~/store/auth';
import {PopupProps} from '~/types';
import {Button, Input, Link, Typography} from '~/components';
import {
  useAppDispatch,
  useAppSelector,
  useLocales,
  useLockBodyScroll,
  useOnClickOutside,
} from '~/hooks';
import {
  LockIcon,
  EmailIcon,
  MessageIcon,
  EditPenIcon,
  UserRoundIcon,
  SaveChangesIcon,
  ExitRedIcon,
} from '~/assets';
import {updateUser} from '~/store/auth/thunks';

import styles from './ProfileModal.module.scss';

const ProfileModal: React.FC<PopupProps> = ({expanded, setExpanded}) => {
  const {Portal} = usePortal();
  const {userInfo} = useAppSelector(authSelect);

  const dispatch = useAppDispatch();

  const isVerified = userInfo && userInfo.isVerified;

  const [isUsernameEdited, setUsernameEdited] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    userInfo?.username || '',
  );

  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {translatedTypo: translatedPlaceholder} = useLocales(
    'enterYourNewUsername',
  );

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper__open]: expanded,
  });

  const mailSenderClassName = classNames(
    styles.wrapper__content__messageIcon__button,
    {
      [styles.wrapper__content__messageIcon__button__disabled]: isVerified,
    },
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [isUsernameEdited]);

  const handleClose = () => setExpanded(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEditUsername = (): void => {
    setUsernameEdited(true);
  };

  const handleSaveChanges = (): void => {
    if (inputValue.length < 6 || inputValue.length > 18) {
      return;
    }
    dispatch(updateUser({username: inputValue}));
    setUsernameEdited(false);
  };

  const handleDeleteChanges = () => {
    setUsernameEdited(false);
  };

  const handleSendEmail = (): void => {};

  useOnClickOutside(modalRef, handleClose);

  useLockBodyScroll(expanded);

  return (
    <Portal>
      <div className={wrapperClasses}>
        <div ref={modalRef} className={styles.wrapper__content}>
          <div className={styles.wrapper__content__child}>
            <div className={styles.wrapper__content__block}>
              <UserRoundIcon className={styles.wrapper__content__userIcon} />
              <div
                className={styles.wrapper__content__title__wrapper}
                role="button"
                onClick={handleEditUsername}>
                {isUsernameEdited ? (
                  <Input
                    ref={inputRef}
                    placeholder={translatedPlaceholder || ''}
                    className={styles.wrapper__content__input}
                    value={inputValue as string}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography
                    tagName="span"
                    className={styles.wrapper__content__title}>
                    {userInfo?.username}
                  </Typography>
                )}
              </div>

              {isUsernameEdited ? (
                <div className={styles.wrapper__content__icons}>
                  <div role="button" onClick={handleSaveChanges}>
                    <SaveChangesIcon
                      className={styles.wrapper__content__saveIcon}
                    />
                  </div>
                  <div role="button" onClick={handleDeleteChanges}>
                    <ExitRedIcon
                      className={styles.wrapper__content__deleteIcon}
                    />
                  </div>
                </div>
              ) : (
                <EditPenIcon
                  onClick={handleEditUsername}
                  className={styles.wrapper__content__editIcon}
                />
              )}
            </div>
            <div className={styles.wrapper__content__block}>
              <EmailIcon className={styles.wrapper__content__emailIcon} />
              <div className={styles.wrapper__content__block__text__wrapper}>
                <Typography
                  tagName="span"
                  className={styles.wrapper__content__block__text}>
                  {userInfo?.email}
                </Typography>
              </div>
              <Button
                onClick={handleSendEmail}
                className={mailSenderClassName}
                disabled={isVerified || false}>
                <MessageIcon className={styles.wrapper__content__messageIcon} />
              </Button>
            </div>
            <div className={styles.wrapper__content__block}>
              <LockIcon className={styles.wrapper__content__lockIcon} />
              <div className={styles.wrapper__content__block__star__wrapper}>
                <Typography
                  className={styles.wrapper__content__block__star}
                  tagName="span">
                  ********
                </Typography>
              </div>
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
