import React, {useCallback, useEffect} from 'react';
import {useToggle} from 'react-use';

import {LogoIcon} from '~/assets';
import {Link, Loader} from '~/components';
import {changePasswordForm, Route} from '~/constants';
import {useAppDispatch, useAppSelector} from '~/hooks';
import {authActions, authSelect} from '~/store/auth';

import Typography from '../../shared/Typography';
import Form from '../../shared/forms/Form';

import styles from './ChangePassword.module.scss';

const ChangePassword: React.FC = () => {
  const {isVerified, error} = useAppSelector(authSelect);
  const [isLoading, toggleIsLoading] = useToggle(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading && (isVerified || error)) toggleIsLoading();
  }, [isLoading, isVerified, error]);

  const handleChangePasswordSubmit = useCallback(
    (values) => {
      dispatch(authActions.changePassword(values));
      toggleIsLoading();
    },
    [dispatch, isLoading],
  );

  return (
    <div className={`container_without-header ${styles.container}`}>
      <Link to={Route.Home}>
        <LogoIcon className={styles.container__top_img} />
      </Link>
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__title}>
        changePassword
      </Typography>
      <Form
        form={changePasswordForm}
        className={styles.change}
        inputClassName={styles.change__block__input__inp}
        labelClassName={styles.change__block}
        innerClassName={styles.change__block__input}
        submitText="confirm"
        onSubmit={handleChangePasswordSubmit}
      />
      {isLoading && <Loader isVertical />}
    </div>
  );
};

export default ChangePassword;
