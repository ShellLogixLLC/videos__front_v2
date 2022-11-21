import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';

import {VideosService} from '~/api';
import {authState} from '~/store/auth';
import {LanguageArrowTop} from '~/assets';
import {COMMENTS_LIMIT} from '~/constants';
import {CommentType} from '~/api/videos/types';
import {getCookieFromBrowser} from '~/libraries';
import {CommentsBlockSkeleton} from '~/components';

import Typography from '../Typography';

import CommentForm from './CommentForm';
import CommentBlock from './CommentBlock';
import styles from './Comments.module.scss';

const Comments: React.FC = () => {
  const router = useRouter();
  const {userInfo} = useSelector(authState);
  const {isCommentVisible} = router.query;
  const commentBlockRef = React.useRef<HTMLInputElement>(null);

  const token = getCookieFromBrowser('token');

  const [expanded, toggleExpanded] = useToggle(false);
  const [isEmojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(COMMENTS_LIMIT);
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);

  const {data, isLoading} = VideosService.useVideoComments(limit, 0);
  const boolInverse = totalCount > data?.totalCount;

  const containerClassNames = classNames(styles.container, {
    [styles.container_open]: expanded,
  });

  const blockClassNames = classNames(styles.block, {
    [styles.block_hidden]: !expanded,
    [styles.block_emojiOpen]: isEmojiOpen && token,
  });

  const arrowIconClasses = classNames(styles.container__content__icon, {
    [styles.container__content__icon__open]: expanded,
  });

  const handleScroll = () => {
    commentBlockRef.current?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!isLoading && data?.comments) {
      setCommentsList(data?.comments);
      setTotalCount(data?.totalCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.comments]);

  useEffect(() => {
    if (isCommentVisible) {
      setTimeout(() => {
        handleScroll();
      }, 1000);
    }
  });

  if (!commentsList.length && isLoading) {
    return <CommentsBlockSkeleton />;
  }

  const addNewComment = (newComment: CommentType): void => {
    setCommentsList([{...newComment, user: userInfo}, ...commentsList]);
    setTotalCount(totalCount + 1);
  };

  return (
    <div className={containerClassNames} ref={commentBlockRef}>
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
        <div className={styles.block__form}>
          <CommentForm
            setEmojiOpen={setEmojiOpen}
            addNewComment={addNewComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
