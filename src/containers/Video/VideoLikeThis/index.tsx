import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {VideosProps} from '~/types';
import {VideosService} from '~/api';
import {VIDEOS_LIMIT, SIMILAR_VIDEOS_COUNT} from '~/constants';
import {Typography, FilmCard, FilmCardSkeletons} from '~/components';

import styles from '../Video.module.scss';

const VideoLikeThis: React.FC = () => {
  const [limit, setLimit] = useState<number>(VIDEOS_LIMIT);
  const [likeThisList, setLikeThisList] = useState<VideosProps[]>([]);

  const {data} = VideosService.useVideoSimilar(limit, 0);
  const skeletonsArray = new Array(VIDEOS_LIMIT).fill({});

  const getMoreData = () => {
    const nextLimit =
      limit + VIDEOS_LIMIT <= SIMILAR_VIDEOS_COUNT
        ? limit + VIDEOS_LIMIT
        : SIMILAR_VIDEOS_COUNT;
    setTimeout(() => {
      setLimit(nextLimit);
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      setLikeThisList(data);
    }
  }, [data]);

  const renderSimilarVideosList = likeThisList.map(
    (similar: VideosProps): React.ReactNode => (
      <FilmCard
        key={similar.id}
        item={similar}
        cardClasses={styles.similar__wrapper_card}
      />
    ),
  );

  const renderLoader =
    limit < SIMILAR_VIDEOS_COUNT &&
    skeletonsArray.map((_item, index) => (
      <React.Fragment key={`skeleton${index}`}>
        <FilmCardSkeletons
          cardClasses={styles.similar__wrapper__skeleton_item}
        />
      </React.Fragment>
    ));

  return (
    <div className={styles.similar}>
      <Typography tagName="h3" className={styles.similar__title}>
        videosLikeThis
      </Typography>
      <InfiniteScroll
        dataLength={likeThisList.length}
        next={getMoreData}
        className={styles.similar__wrapper}
        hasMore={true}
        loader={renderLoader}>
        {renderSimilarVideosList}
      </InfiniteScroll>
    </div>
  );
};

export default VideoLikeThis;
