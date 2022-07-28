import React from 'react';

import {Route} from '~/constants';
import {PopupProps} from '~/types';
import {Button, Link, Popup, Typography} from '~/components';

import styles from './CommentPopup.module.scss';

const CommentPopup: React.FC<PopupProps> = ({expanded, setExpanded}) => {
  const handleCancel = () => setExpanded(false);

  return (
    <Popup
      isClose={false}
      expanded={expanded}
      setExpanded={setExpanded}
      className={styles.wrapper}>
      <Typography className={styles.wrapper__title} tagName="h2">
        To comment, you have to be signed in
      </Typography>
      <div className={styles.wrapper__content}>
        <Button className={styles.wrapper__content__btn} onClick={handleCancel}>
          Cancel
        </Button>
        <Link to={Route.SignIn} className={styles.wrapper__content__link}>
          Sign In
        </Link>
      </div>
    </Popup>
  );
};

export default CommentPopup;
