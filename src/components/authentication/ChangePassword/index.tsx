import React, {useCallback} from 'react';

import {LogoIcon} from '~/assets';
import {authActions, authSelect} from '~/store/auth';
import {changePasswordForm, Route} from '~/constants';
import {useAppDispatch, useAppSelector} from '~/hooks';
import {LoadingStates} from '~/store/types';

import Link from '../../shared/Link';
import Loader from '../../shared/Loader/';
import Form from '../../shared/forms/Form';
import Typography from '../../shared/Typography';

import styles from './ChangePassword.module.scss';

const ChangePassword: React.FC = () => {
  const {changePasswordLoading} = useAppSelector(authSelect);

  const dispatch = useAppDispatch();

  const handleChangePasswordSubmit = useCallback(
    (values) => {
      dispatch(authActions.changePassword(values));
    },
    [dispatch],
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
      {changePasswordLoading === LoadingStates.LOADING && <Loader isVertical />}
    </div>
  );
};

export default ChangePassword;
