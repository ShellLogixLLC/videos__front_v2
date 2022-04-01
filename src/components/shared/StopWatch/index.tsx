import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';

import Button from '../Button';

import {ITimer} from './types';
import styles from './Timer.module.scss';

const Timer: React.FC<ITimer> = ({
  timer,
  setTimer,
  isNotValid,
  setIsNotValid,
}) => {
  const countRef = useRef<any | null>(null);

  const formatTime = (timer: number) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes: number | bigint | any = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  };

  useEffect(() => {
    clearInterval(countRef.current);
  }, []);

  useEffect(() => {
    if (!isNotValid)
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
  }, [isNotValid]);

  const resendHandler = () => {
    const d = new Date().getTime();
    localStorage.setItem('timer', String(d));
    setIsNotValid(false);
  };

  const resendClasses = classNames(styles.container__resend, {
    [styles.container__resend_not_valid]: !isNotValid,
  });

  return (
    <div className={styles.container}>
      <Button
        onClick={resendHandler}
        disabled={!isNotValid}
        className={resendClasses}>
        Resend OTP
      </Button>

      <div className={styles.container__wrapper}>
        <p>{formatTime(timer)}</p>
        <span>m</span>
      </div>
    </div>
  );
};

export default Timer;
