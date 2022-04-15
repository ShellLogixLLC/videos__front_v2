import React from 'react';

import {Love} from '~/assets';
import {CommentSkeleton} from '~/components';
import {commentBlock} from '~/utils';

import Typography from '../Typography';

import styles from './Comments.module.scss';
import {ICommentBlock} from './types';

const CommentBlock: React.FC<ICommentBlock> = ({dataIsLoading}) => {
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

  return <>{dataIsLoading ? <CommentSkeleton /> : renderComments}</>;
};

export default CommentBlock;
