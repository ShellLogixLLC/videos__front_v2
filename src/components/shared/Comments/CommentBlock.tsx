import React from 'react';

import {Love} from '~/assets';
import {commentBlock} from '~/utils';

import Typography from '../Typography';

import styles from './Comments.module.scss';

const CommentBlock: React.FC = () => {
  const renderComments = commentBlock.map(({id, name, comment}) => (
    <div key={id} className={styles.block__wrapper__comment}>
      <div className={styles.block__wrapper__comment__head}>
        <div className={styles.block__wrapper__comment__head__image}>
          <Love />
        </div>
        <Typography className={styles.block__wrapper__comment__head__name}>
          {name}
        </Typography>
      </div>
      <p className={styles.block__wrapper__comment__description}>{comment}</p>
    </div>
  ));

  return <>{renderComments}</>;
};

export default CommentBlock;
