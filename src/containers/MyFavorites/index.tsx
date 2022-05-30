import React from 'react';

import {BackButton, Link, Typography, Video} from '~/components';
import {VIDEO_SRC, POSTER_SRC, VIDEO_LENGTH, Route} from '~/constants';
import {LeftArrow} from '~/assets';

import styles from './MyFavorites.module.scss';

const MyFavorites: React.FC = () => {
  return (
    <div className={styles.favorites}>
      <Link
        className={styles.favorites__link}
        activeClassName={styles.favorites__link_active}
        to={Route.Home}>
        <div className={styles.favorites__backRoute}>
          <BackButton
            text="Back"
            LeftIcon={LeftArrow}
            className={styles.favorites__backRoute__button}
          />
        </div>
      </Link>

      <Typography tagName="h1" className={styles.favorites__title}>
        WishList
      </Typography>
      <div className={styles.favorites__content}>
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
        <Video
          videoSrc={VIDEO_SRC}
          posterSrc={POSTER_SRC}
          videoDuration={VIDEO_LENGTH}
        />
      </div>
      <div className={styles.favorites__pagination}></div>
    </div>
  );
};

export default MyFavorites;
