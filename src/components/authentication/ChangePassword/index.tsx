import React, {useEffect} from 'react';
import {useToggle} from 'react-use';

import {LogoIcon} from '~/assets';
import {Link, Loader} from '~/components';
import {changePasswordForm, Route} from '~/constants';
import {useAppSelector} from '~/hooks';
import {authSelect} from '~/store/auth';

import Typography from '../../shared/Typography';
import Form from '../../shared/forms/Form';

import styles from './ChangePassword.module.scss';

const ChangePassword: React.FC = () => {
  const {isVerified, error} = useAppSelector(authSelect);
  const [isLoading, toggleIsLoading] = useToggle(false);

  useEffect(() => {
    if (isLoading && (isVerified || error)) toggleIsLoading();
  }, [isLoading, isVerified, error]);

  const handleChangePasswordSubmit = (): void => {
    console.log('password changed');
  };

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
        className={styles.reset}
        inputClassName={styles.reset__block__input__inp}
        labelClassName={styles.reset__block}
        innerClassName={styles.reset__block__input}
        submitText="confirm"
        onSubmit={handleChangePasswordSubmit}
      />
      {isLoading && <Loader isVertical />}
    </div>
  );
};

export default ChangePassword;
