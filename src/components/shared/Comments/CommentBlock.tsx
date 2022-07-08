import React, {useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {COMMENTS_LIMIT} from '~/constants';
import {CommentSkeleton} from '~/components';

import Comment from './Comment';
import {ICommentBlock} from './types';
import styles from './Comments.module.scss';

const CommentBlock: React.FC<ICommentBlock> = ({
  limit,
  setLimit,
  comments,
  totalCount,
  boolInverse,
}) => {
  // this ref belongs to the package, and I didn't find the correct type.
  const scrollRef = useRef<any | null>(null);

  useEffect(() => {
    if (scrollRef?.current && boolInverse) {
      scrollRef?.current?.el.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [boolInverse]);

  const getMoreData = () => {
    const nextLimit =
      limit + COMMENTS_LIMIT <= totalCount
        ? limit + COMMENTS_LIMIT
        : totalCount;
    setTimeout(() => {
      setLimit(nextLimit);
    }, 1500);
  };

  const renderComments = comments?.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  const renderLoader = limit !== totalCount && totalCount !== 0 && (
    <CommentSkeleton dataLength={COMMENTS_LIMIT} />
  );

  return (
    <div id="scrollableDiv" className={styles.block__wrapper}>
      <InfiniteScroll
        ref={scrollRef}
        dataLength={comments.length}
        next={getMoreData}
        hasMore={true}
        loader={renderLoader}
        scrollableTarget="scrollableDiv">
        {renderComments}
      </InfiniteScroll>
    </div>
  );
};

export default CommentBlock;
