import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useSelector} from 'react-redux';

import {authState} from '~/store/auth';
import {CommentType} from '~/api/videos/types';
import {VideosService} from '~/api';
import {COMMENTS_LIMIT} from '~/constants';
import {LanguageArrowTop} from '~/assets';
import {getCookieFromBrowser} from '~/libraries';
import {CommentsBlockSkeleton} from '~/components';

import Typography from '../Typography';

import styles from './Comments.module.scss';
import CommentForm from './CommentForm';
import CommentBlock from './CommentBlock';

const Comments: React.FC = () => {
  const {userInfo} = useSelector(authState);
  const token = getCookieFromBrowser('token');

  const [limit, setLimit] = useState<number>(COMMENTS_LIMIT);
  const [expanded, toggleExpanded] = useToggle(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);

  const {data, isLoading} = VideosService.useVideoComments(limit, 0);
  const boolInverse = totalCount > data?.totalCount;

  const blockClassNames = classNames(styles.block, {
    [styles.block_small]: !token && expanded,
    [styles.block_hidden]: !expanded,
  });

  const containerClassNames = classNames(styles.container, {
    [styles.container_small]: !token && expanded,
    [styles.container_close]: !expanded,
  });

  const arrowIconClasses = classNames(styles.container__content__icon, {
    [styles.container__content__icon__open]: expanded,
  });

  useEffect(() => {
    if (!isLoading && data?.comments) {
      setCommentsList(data?.comments);
      setTotalCount(data?.totalCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.comments]);

  if (!commentsList.length && isLoading) {
    return <CommentsBlockSkeleton />;
  }

  const addNewComment = (newComment: CommentType): void => {
    setCommentsList([{...newComment, user: userInfo}, ...commentsList]);
    setTotalCount(totalCount + 1);
  };

  return (
    <div className={containerClassNames}>
      <div onClick={toggleExpanded} className={styles.container__content}>
        <div className={styles.container__content__title}>
          <Typography className={styles.container__content__title__text}>
            comments
          </Typography>
          <span className={styles.container__content__title__count}>
            ({totalCount})
          </span>
        </div>
        <LanguageArrowTop className={arrowIconClasses} />
      </div>

      <div className={blockClassNames}>
        <CommentBlock
          comments={commentsList}
          setLimit={setLimit}
          limit={limit}
          boolInverse={boolInverse}
          totalCount={totalCount}
        />
        {token && (
          <div className={styles.block__form}>
            <CommentForm addNewComment={addNewComment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
