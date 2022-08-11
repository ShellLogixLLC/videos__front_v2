import React from 'react';

import Typography from '../Typography';

import styles from './Comments.module.scss';
import {IComment} from './types';

const Comment: React.FC<IComment> = ({comment}) => {
  const {user, message} = comment;
  const userName = user?.username as string;

  const toUpperCaseUsername = userName?.slice(0, 1).toUpperCase();

  return (
    <div className={styles.block__wrapper__comment}>
      <div className={styles.block__wrapper__comment__head}>
        <div className={styles.block__wrapper__comment__head__image}>
          {toUpperCaseUsername}
        </div>
        <Typography className={styles.block__wrapper__comment__head__name}>
          {userName}
        </Typography>
      </div>
      <p className={styles.block__wrapper__comment__description}>{message}</p>
    </div>
  );
};

export default Comment;
