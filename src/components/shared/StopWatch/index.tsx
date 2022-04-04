import React, {useEffect} from 'react';
import classNames from 'classnames';

import {removeCookie, setCookie} from '~/libraries';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Button from '../Button';
import Typography from '../Typography';

import {ITimer} from './types';
import styles from './Timer.module.scss';

const Timer: React.FC<ITimer> = ({
  timer,
  setTimer,
  isNotValid,
  setIsNotValid,
}) => {
  const dispatch = useAppDispatch();
  const {emailVerify} = useAppSelector(authSelect);

  const wrapperClasses = classNames(styles.container__wrapper, {
    [styles.container__wrapper_disable]: !isNotValid,
  });

  const resendClasses = classNames(styles.container__resend, {
    [styles.container__resend_not_valid]: !isNotValid,
  });

  const formatTime = () => {
    const seconds = Math.floor(timer % 60);
    const getSeconds = seconds <= 9 ? `0${seconds}` : seconds;
    const minutes: number | bigint | any = `0${Math.floor(timer / 60)}`;

    return `${minutes}:${getSeconds}`;
  };

  useEffect(() => {
    if (!isNotValid) {
      const intervalId = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isNotValid]);

  const resendHandler = () => {
    const d = new Date().getTime();

    setCookie('timer', String(d + 120000));
    setIsNotValid(false);
    dispatch(authActions.userSentVerifyAgain({email: emailVerify}));

    setTimeout(() => {
      removeCookie('timer');
    }, 120000);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={resendHandler}
        disabled={!isNotValid}
        className={resendClasses}>
        Resend OTP
      </Button>
      <div className={styles.timer_block}>
        <Typography className={wrapperClasses}>{formatTime()}</Typography>
        <Typography tagName="span" className={wrapperClasses}>
          m
        </Typography>
      </div>
    </div>
  );
};

export default Timer;
