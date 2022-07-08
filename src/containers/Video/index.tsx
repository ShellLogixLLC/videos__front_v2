import React from 'react';

import {LeftArrowIcon} from '~/assets';
import {
  Link,
  Comments,
  Typography,
  DatePicker,
  FilterBySort,
} from '~/components';
import {filteredMass} from '~/utils';

import styles from './Video.module.scss';
import VideoWrapper from './VideoWrapper';
import VideoLikeThis from './VideoLikeThis';

const VideoContainer: React.FC = () => (
  <article>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link to="/" className={styles.content__back}>
          <LeftArrowIcon />
          <Typography className={styles.content__back_text}>Back</Typography>
        </Link>
        <VideoWrapper />
        <Comments />
      </div>
      <aside className={styles.filter_block}>
        <DatePicker />
        <FilterBySort options={filteredMass} />
      </aside>
    </div>
    <VideoLikeThis />
  </article>
);

export default VideoContainer;
