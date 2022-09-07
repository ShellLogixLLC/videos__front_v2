import React, {forwardRef, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import usePortal from 'react-useportal';

import {PopupProps} from '~/types';
import {authSelect} from '~/store/auth';
import {Route, editUsernameForm} from '~/constants';
import {Button, Form, Typography} from '~/components';
import {
  useAppDispatch,
  useAppSelector,
  useLockBodyScroll,
  useOnClickOutside,
} from '~/hooks';
import {
  EmailIcon,
  LockIcon,
  EditPenIcon,
  ExitRedIcon,
  MessageIcon,
  UserRoundIcon,
  SaveChangesIcon,
} from '~/assets';
import {RouterService} from '~/services';
import {LoadingStates} from '~/store/types';
import {updateUser, userSentVerifyAgain} from '~/store/auth/thunks';
import HorizontalLoader from '~/components/shared/Loader/HorizontalLoader';

import styles from './ProfileModal.module.scss';

const ProfileModal = forwardRef<any, PopupProps>(
  ({expanded, setExpanded}, ref) => {
    const {Portal} = usePortal();
    const {userInfo, updateUserLoading} = useAppSelector(authSelect);

    const dispatch = useAppDispatch();

    const isVerified = userInfo && userInfo.isVerified;

    const [isUsernameEdited, setUsernameEdited] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

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

    const handleEditUsername = (): void => {
      setUsernameEdited(true);
    };

    const handleSaveChanges = (payload: Record<string, string>): void => {
      dispatch(updateUser({username: payload.username}));
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
      RouterService.push(Route.ChangePassword);
    };

    useOnClickOutside(modalRef, handleClose);

    useLockBodyScroll(expanded);

    return (
      <Portal>
        <div ref={ref} className={wrapperClasses}>
          {updateUserLoading === LoadingStates.LOADING ? (
            <HorizontalLoader />
          ) : (
            <div ref={modalRef} className={styles.wrapper__content}>
              <div className={styles.wrapper__content__child}>
                <div className={styles.wrapper__content__block}>
                  <div className={styles.wrapper__content__userIcon__wrapper}>
                    <UserRoundIcon
                      className={styles.wrapper__content__userIcon}
                    />
                  </div>
                  <div
                    className={firstBlockClassName}
                    role="button"
                    onClick={handleEditUsername}>
                    {isUsernameEdited ? (
                      <Form
                        isEditedMode
                        RightIcon={SaveChangesIcon}
                        className={styles.wrapper_content__form}
                        form={editUsernameForm}
                        onSubmit={handleSaveChanges}
                        inputClassName={styles.wrapper__content__input}
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
                {userInfo?.email && (
                  <div className={styles.wrapper__content__block}>
                    <EmailIcon className={styles.wrapper__content__emailIcon} />
                    <div
                      className={styles.wrapper__content__block__text__wrapper}>
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
                )}
                <div className={styles.wrapper__content__block}>
                  <LockIcon className={styles.wrapper__content__lockIcon} />
                  <div
                    className={styles.wrapper__content__block__star__wrapper}>
                    <Typography
                      className={styles.wrapper__content__block__star}
                      tagName="span">
                      **************
                    </Typography>
                  </div>
                  <Button
                    className={styles.wrapper__content__messageIcon__button}
                    onClick={handleChangePasswordRoute}>
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
  },
);

export default ProfileModal;
