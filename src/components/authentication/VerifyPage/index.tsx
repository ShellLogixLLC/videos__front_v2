import React, {useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';

import {LogoIcon} from '~/assets';
import {RouterService} from '~/services';
import {verifyPageState} from '~/utils';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';
import {getCookieFromBrowser, removeCookie} from '~/libraries';
import {INITIAL_TIME, INITIAL_TIME_MILLISECONDS, Route} from '~/constants';

import Typography from '../../shared/Typography';
import Link from '../../shared/Link';
import Timer from '../../shared/StopWatch';
import Input from '../../shared/Input';
import Button from '../../shared/Button';

import {CodesProps, VerifyProps} from './types';
import styles from './VerifyPage.module.scss';

const ContractSign: React.FC<VerifyProps> = ({
  my_account = 'my_account@gmail.com',
}) => {
  const dispatch = useAppDispatch();
  const {emailVerify, isVerified} = useAppSelector(authSelect);

  const date = new Date().getTime();
  const cookieTimer = Number(getCookieFromBrowser('timer')) - date;
  const time = cookieTimer ? cookieTimer / 1000 : INITIAL_TIME;

  const [timer, setTimer] = useState<number>(time);
  const [codes, setCodes] = useState<CodesProps>(verifyPageState);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isNotValid, setIsNotValid] = useState<boolean>(true);

  const ref1 = useRef<HTMLInputElement | null>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);
  const ref3 = useRef<HTMLInputElement | null>(null);
  const ref4 = useRef<HTMLInputElement | null>(null);
  const ref5 = useRef<HTMLInputElement | null>(null);
  const ref6 = useRef<HTMLInputElement | null>(null);
  const ref7 = useRef<HTMLInputElement | null>(null);

  const areInputsEmpty = Object.values(codes).join('') === '';

  const footerClasses = classNames(styles.container__footer, {
    [styles.container__footer_valid]: isVerified,
  });

  const isProceedClasses = classNames(styles.container_proceed, {
    [styles.container_proceed_valid]: isValid,
  });

  const isClearClasses = classNames(styles.container_proceed_clear, {
    [styles.container_proceed_clear_valid]: isValid,
  });

  const spanClasses = classNames(styles.container_wrong_otp, {
    [styles.container_resent_text]: isNotValid,
  });

  const handleClear = () => {
    setCodes(verifyPageState);
    setIsValid(false);
  };

  useEffect(() => {
    if (cookieTimer) {
      if (cookieTimer >= INITIAL_TIME_MILLISECONDS) {
        setIsNotValid(true);
        removeCookie('timer');
        setTimer(INITIAL_TIME);
      } else {
        setTimeout(() => {
          setIsNotValid(true);
          removeCookie('timer');
          setTimer(INITIAL_TIME);
        }, cookieTimer);
      }
      setIsNotValid(false);
    }
  }, [isNotValid]);

  const proceedHandler = () => {
    const code = Object.values(codes).join('');
    const requestData = {
      code,
      email: emailVerify,
    };

    dispatch(authActions.userVerify(requestData));
    RouterService.push(Route.SignIn);
  };

  const handleInput =
    (number: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();

      switch (number) {
        case 1:
          if (value.length === 1) {
            ref2?.current?.focus();
          }
          if (value.length === 1 || value.length === 0) {
            setCodes((prev) => ({...prev, 1: value}));
          } else {
            ref2?.current?.focus();
          }
          break;
        case 2:
          if (value.length === 1) {
            ref3?.current?.focus();
          }
          if (value.length === 1 || value.length === 0) {
            setCodes((prev) => ({...prev, 2: value}));
          } else {
            ref3?.current?.focus();
          }
          break;
        case 3:
          if (value.length === 1) {
            ref4?.current?.focus();
          }
          if (value.length === 1 || value.length === 0) {
            setCodes((prev) => ({...prev, 3: value}));
          } else {
            ref4?.current?.focus();
          }
          break;
        case 4:
          if (value.length === 1) {
            ref5?.current?.focus();
          }
          if (value.length === 1 || value.length === 0) {
            setCodes((prev) => ({...prev, 4: value}));
          } else {
            ref5?.current?.focus();
          }
          break;
        case 5:
          if (value.length === 1) {
            ref6?.current?.focus();
          }
          if (value.length === 1 || value.length === 0) {
            setCodes((prev) => ({...prev, 5: value}));
          } else {
            ref6?.current?.focus();
          }
          break;
        case 6:
          if (value.length === 1) {
            ref7?.current?.focus();
          }
          if (value.length === 1 || value.length === 0) {
            setCodes((prev) => ({...prev, 6: value}));
          } else {
            ref7?.current?.focus();
          }
          break;
      }
    };

  const onKeyDown =
    (number: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        event.key === ' ' ||
        event.key === ',' ||
        event.key === '.' ||
        event.key === '-' ||
        event.key === '+' ||
        event.key === 'e' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown'
      ) {
        event.preventDefault();
      } else if (event.code === 'Backspace') {
        switch (number) {
          case 2:
            setTimeout(() => {
              ref1?.current?.focus();
            });
            break;
          case 3:
            setTimeout(() => {
              ref2?.current?.focus();
            });
            break;
          case 4:
            setTimeout(() => {
              ref3?.current?.focus();
            });
            break;
          case 5:
            setTimeout(() => {
              ref4?.current?.focus();
            });
            break;
          case 6:
            setTimeout(() => {
              ref5?.current?.focus();
            });
            break;
          case 7:
            setTimeout(() => {
              ref6?.current?.focus();
            });
            break;
        }
      } else if (codes[number].length) {
        event.currentTarget.value = event.key;
        event.preventDefault();
      }
    };

  const inputRows = useMemo(
    () => [
      {ref: ref1, name: 'code1', id: 1},
      {ref: ref2, name: 'code2', id: 2},
      {ref: ref3, name: 'code3', id: 3},
      {ref: ref4, name: 'code4', id: 4},
      {ref: ref5, name: 'code5', id: 5},
      {ref: ref6, name: 'code6', id: 6},
    ],
    [],
  );

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const codes = event.clipboardData.getData('Text').split('');
    setCodes({
      1: codes[0],
      2: codes[1],
      3: codes[2],
      4: codes[3],
      5: codes[4],
      6: codes[5],
      7: codes[6],
    });
  };

  useEffect(() => {
    if (
      codes[0] !== '' &&
      codes[1] !== '' &&
      codes[2] !== '' &&
      codes[3] !== '' &&
      codes[5] !== '' &&
      codes[6] !== ''
    ) {
      setIsValid(true);
    }
  }, [codes]);

  const inputClasses = classNames(
    styles.container__top__number_verification__item__inp,
    {
      [styles.container__top__number_verification__item__inp_valid]: isValid,
    },
  );

  const renderVerificationIsMail = inputRows.map(({ref, id, name}) => (
    <Input
      key={id}
      ref={ref}
      name={name}
      type="number"
      placeholder="*"
      value={codes[id]}
      disabled={isValid}
      labelClassName={styles.container__top__number_verification__item}
      className={inputClasses}
      onChange={handleInput(id)}
      {...{onKeyDown: onKeyDown(id), onPaste: onPaste}}
    />
  ));

  const InformMessages = areInputsEmpty && (
    <Typography tagName="span" className={spanClasses}>
      {cookieTimer ? 'wrongOtpTryAgain' : 'youCanResendOpt'}
    </Typography>
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.container__cancel}>
        <Typography>cancelOtpRegistration</Typography>
      </Link>
      <div className={styles.container__top}>
        <LogoIcon className={styles.container__top__img} />
        <Typography className={styles.container__top__title}>
          enterOneTimePassword
        </Typography>
        <div className={styles.container__top__number_verification}>
          {renderVerificationIsMail}
        </div>
      </div>
      <div className={isProceedClasses}>
        {!areInputsEmpty ? (
          <>
            {isValid && (
              <Button
                title="Are you sure the password is correct"
                onClick={proceedHandler}
                className={styles.container_proceed_allow}>
                <Typography>proceed</Typography>
              </Button>
            )}
            <Button onClick={handleClear} className={isClearClasses}>
              <Typography>clear</Typography>
            </Button>
          </>
        ) : (
          <Timer
            timer={timer}
            setTimer={setTimer}
            isNotValid={isNotValid}
            setIsNotValid={setIsNotValid}
          />
        )}
      </div>
      {InformMessages}
      <div className={footerClasses}>
        <Typography tagName="span" className={styles.container__footer__name}>
          weHaveSentAnEmail
        </Typography>
        <Link
          blank
          to="https://gmail.com/"
          className={styles.container__footer__my_account}>
          {emailVerify || my_account}
        </Link>
      </div>
    </div>
  );
};

export default ContractSign;
