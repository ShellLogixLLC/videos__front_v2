import React from 'react';

import {LeftArrow} from '~/assets';
import {Link, Comments, Typography, DatePicker} from '~/components';

import styles from './Video.module.scss';
import VideoWrapper from './VideoWrapper';
import VideoLikeThis from './VideoLikeThis';

const VideoContainer: React.FC = () => (
  <article>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link to="/" className={styles.content__back}>
          <LeftArrow />
          <Typography className={styles.content__back_text}>Back</Typography>
        </Link>
        <VideoWrapper />
        <Comments />
      </div>
      <aside className={styles.filters}>
        <DatePicker />
      </aside>
    </div>
    <VideoLikeThis />
  </article>
);

export default VideoContainer;
