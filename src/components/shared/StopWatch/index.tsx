import React, {useEffect} from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';

import {formatTimer} from '~/utils';
import {removeCookie, setCookie} from '~/libraries';
import {authActions, authSelect} from '~/store/auth';
import {INITIAL_TIME_MILLISECONDS} from '~/constants';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Button from '../Button';
import Typography from '../Typography';

import {ITimerProps} from './types';
import styles from './Timer.module.scss';

const Timer: React.FC<ITimerProps> = ({
  timer,
  setTimer,
  isNotValid,
  setIsNotValid,
}) => {
  const dispatch = useAppDispatch();
  const {emailVerify} = useAppSelector(authSelect);

  const {t} = useTranslation();

  const wrapperClasses = classNames(styles.container__wrapper, {
    [styles.container__wrapper_disable]: !isNotValid,
  });

  const resendClasses = classNames(styles.container__resend, {
    [styles.container__resend_not_valid]: !isNotValid,
  });

  useEffect(() => {
    if (!isNotValid) {
      const intervalId = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isNotValid]);

  const resendHandler = () => {
    const date = new Date().getTime();

    setCookie('timer', String(date + INITIAL_TIME_MILLISECONDS));
    setIsNotValid(false);
    dispatch(authActions.userSentVerifyAgain({email: emailVerify}));

    setTimeout(() => {
      removeCookie('timer');
    }, INITIAL_TIME_MILLISECONDS);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={resendHandler}
        disabled={!isNotValid}
        className={resendClasses}>
        {t('resendOTP')}
      </Button>
      <div className={styles.timer_block}>
        <Typography className={wrapperClasses}>{formatTimer(timer)}</Typography>
        <Typography tagName="span" className={wrapperClasses}>
          m
        </Typography>
      </div>
    </div>
  );
};

export default Timer;
