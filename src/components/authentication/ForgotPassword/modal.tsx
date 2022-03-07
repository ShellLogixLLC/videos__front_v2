import React from 'react';

import Link from '../../shared/Link';
import Button from '../../shared/Button';

import styles from './ForgotPassword.module.scss';

const Modal: React.FC = () => {
  return (
    <div className={styles.forgot_modal}>
      <h3 className={styles.forgot_modal__title}>Resetting password!🔐</h3>
      <p className={styles.forgot_modal__reset_pass}>
        To reset your password go through a link below.
      </p>
      <Button className={styles.forgot_modal__reset}>Reset password</Button>
      <p className={styles.forgot_modal__reset_problem}>
        If the above button is not working, please copy and paste this link into
        your browser:
      </p>
      <Link target="_blank" className={styles.forgot_modal__url} to="/">
        http://ide.com/8P7SW5XQhJMka
      </Link>
      <span>If you did not sign up for ide, please ignore this message.</span>
    </div>
  );
};

export default Modal;
