import React, {useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';

import {Logo} from '~/assets';
import {AuthService} from '~/api';
import {verifyPageState} from '~/utils';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Link from '../../shared/Link';
import Timer from '../../shared/StopWatch';
import Input from '../../shared/Input';
import Button from '../../shared/Button';

import {VerifyProps} from './types';
import styles from './VerifyPage.module.scss';

const ContractSign: React.FC<VerifyProps> = ({
  my_account = 'my_account@gmail.com',
}) => {
  const dispatch = useAppDispatch();
  const {emailVerify, isVerify} = useAppSelector(authSelect);

  const [timer, setTimer] = useState<number>(0);
  const [codes, setCodes] = useState<{[key: number]: string}>(verifyPageState);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [isNotValid, setIsNotValid] = useState<boolean>(true);

  // console.log(timer, isNotValid, '5555555');

  const ref1 = useRef<HTMLInputElement | null>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);
  const ref3 = useRef<HTMLInputElement | null>(null);
  const ref4 = useRef<HTMLInputElement | null>(null);
  const ref5 = useRef<HTMLInputElement | null>(null);
  const ref6 = useRef<HTMLInputElement | null>(null);
  const ref7 = useRef<HTMLInputElement | null>(null);

  const isInputsEmpty = Object.values(codes).join('') === '';

  const footerClasses = classNames(styles.container__footer, {
    [styles.container__footer_valid]: isVerify,
  });

  const isProceedClasses = classNames(styles.container_proceed, {
    [styles.container_proceed_valid]: isValid,
  });

  const isClearClasses = classNames(styles.container_proceed_clear, {
    [styles.container_proceed_clear_valid]: isValid,
  });

  const {
    categories: {categories},
  } = AuthService.useCategories();

  // eslint-disable-next-line no-console
  console.log(categories);

  const handleClear = () => {
    setCodes(verifyPageState);
    setIsValid(false);
  };

  useEffect(() => {
    const date = new Date().getTime();
    const isTime = localStorage.getItem('timer');
    const time = !isTime ? Number(isTime) : 0;
    const allTime = !!isTime ? date - Number(isTime) : 0;
    console.log(allTime, time, !!isTime, 'localStorage.getItem');

    setTimer(allTime);
    if (!isTime) {
      date - Number(time) >= 120000
        ? setIsNotValid(true)
        : setTimeout(() => {
            setIsNotValid(true);
          }, date - Number(time));
    } else {
      setIsNotValid(false);
    }

    if (isNotValid) localStorage.removeItem('timer');
  }, []);

  const proceedHandler = () => {
    if (isResend) {
      dispatch(authActions.userSentVerifyAgain({email: emailVerify}));
    } else {
      setIsResend(true);

      const code = Object.values(codes).join('');
      const requestData = {
        code,
        email: emailVerify,
      };

      dispatch(authActions.userVerify(requestData));
    }
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

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.container__cancel}>
        Cancel OTP Registration
      </Link>
      <div className={styles.container__top}>
        <Logo className={styles.container__top__img} />
        <p className={styles.container__top__title}>Enter: One Time Password</p>
        <div className={styles.container__top__number_verification}>
          {renderVerificationIsMail}
        </div>
      </div>
      <div className={isProceedClasses}>
        {!isInputsEmpty ? (
          <>
            {isValid && (
              <Button
                title="Are you sure the password is correct"
                onClick={proceedHandler}
                className={styles.container_proceed_allow}>
                Proceed
              </Button>
            )}
            <Button onClick={handleClear} className={isClearClasses}>
              Clear
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
      {!isVerify && isResend && (
        <span className={styles.container_wrong_otp}>
          Wrong OTP try again in 2 minutes.
        </span>
      )}
      {isInputsEmpty && timer === 0 && (
        <span className={styles.container_resent_text}>
          You can resend OPT now !
        </span>
      )}
      <div className={footerClasses}>
        <span className={styles.container__footer__name}>
          We’ve sent an e-mail to
        </span>
        <Link
          blank
          to="https://gmail.com/"
          className={styles.container__footer__my_account}>
          {my_account}
        </Link>
      </div>
    </div>
  );
};

export default ContractSign;
