import React, {useEffect, useRef, useState} from 'react';
import usePortal from 'react-useportal';
import classNames from 'classnames';

import {Route} from '~/constants';
import {authSelect} from '~/store/auth';
import {PopupProps} from '~/types';
import {Button, Input, Typography} from '~/components';
import {
  useAppDispatch,
  useAppSelector,
  useLocales,
  useLockBodyScroll,
  useOnClickOutside,
} from '~/hooks';
import {
  EditPenIcon,
  EmailIcon,
  ExitRedIcon,
  LockIcon,
  MessageIcon,
  SaveChangesIcon,
  UnverifiedIcon,
  UserRoundIcon,
  VerifiedIcon,
} from '~/assets';
import {updateUser, userSentVerifyAgain} from '~/store/auth/thunks';
import {LoadingStates} from '~/store/types';
import HorizontalLoader from '~/components/shared/Loader/HorizontalLoader';
import {RouterService} from '~/services';

import styles from './ProfileModal.module.scss';

const ProfileModal: React.FC<PopupProps> = ({expanded, setExpanded}) => {
  const {Portal} = usePortal();
  const {userInfo, loading} = useAppSelector(authSelect);

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

  const firstBlockClassName = classNames(
    styles.wrapper__content__title__wrapper,
    {
      [styles.wrapper__content__title__wrapper__edited]: isUsernameEdited,
    },
  );

  const mailSenderButtonClassName = classNames(
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
    if (inputValue.length) dispatch(updateUser({username: inputValue}));
    setUsernameEdited(false);
  };

  const handleDeleteChanges = () => {
    setUsernameEdited(false);
  };

  const handleSendEmail = (): void => {
    if (userInfo && userInfo.email) {
      dispatch(userSentVerifyAgain({email: userInfo.email}));
      RouterService.push(Route.RegistrationSetupPassword);
    }
  };

  const handleChangePasswordRoute = (): void => {
    RouterService.push(Route.RegistrationContactInformation);
  };

  useOnClickOutside(modalRef, handleClose);

  useLockBodyScroll(expanded);

  return (
    <Portal>
      <div className={wrapperClasses}>
        {loading === LoadingStates.LOADING ? (
          <HorizontalLoader />
        ) : (
          <div ref={modalRef} className={styles.wrapper__content}>
            <div className={styles.wrapper__content__child}>
              <div className={styles.wrapper__content__block}>
                <div className={styles.wrapper__content__userIcon__wrapper}>
                  <UserRoundIcon
                    className={styles.wrapper__content__userIcon}
                  />
                  <div className={styles.wrapper__content__userIcon__child}>
                    {isVerified ? (
                      <VerifiedIcon
                        className={
                          styles.wrapper__content__userIcon__verifyIcon
                        }
                      />
                    ) : (
                      <UnverifiedIcon
                        className={
                          styles.wrapper__content__userIcon__verifyIcon
                        }
                      />
                    )}
                  </div>
                </div>
                <div
                  className={firstBlockClassName}
                  role="button"
                  onClick={handleEditUsername}>
                  {isUsernameEdited ? (
                    <>
                      <form onSubmit={handleSaveChanges}>
                        <Input
                          ref={inputRef}
                          placeholder={translatedPlaceholder || ''}
                          className={styles.wrapper__content__input}
                          value={inputValue as string}
                          onChange={handleInputChange}
                        />
                      </form>
                    </>
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
                  className={mailSenderButtonClassName}
                  disabled={isVerified || false}>
                  <MessageIcon
                    className={styles.wrapper__content__messageIcon}
                  />
                </Button>
              </div>
              <div className={styles.wrapper__content__block}>
                <LockIcon className={styles.wrapper__content__lockIcon} />
                <div className={styles.wrapper__content__block__star__wrapper}>
                  <Typography
                    className={styles.wrapper__content__block__star}
                    tagName="span">
                    **************
                  </Typography>
                </div>
                <Button
                  className={mailSenderButtonClassName}
                  onClick={handleChangePasswordRoute}
                  disabled={isVerified || false}>
                  <EditPenIcon
                    className={styles.wrapper__content__messageIcon}
                  />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Portal>
  );
};

export default ProfileModal;
