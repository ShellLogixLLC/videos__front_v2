import React from 'react';

import {LeftArrow, RightArrow} from '~/assets';

import FilmCardSkeleton from '../FilmCard';
import {ISkeletonDataTypes} from '../types';

import styles from './HorizontalSlider.module.scss';

const HorizontalSliderSkeleton: React.FC<ISkeletonDataTypes> = ({
  dataLength = 4,
}) => {
  const commentsArray = new Array(dataLength).fill({});

  const renderVideoList = commentsArray.map((item, index) => (
    <FilmCardSkeleton key={index} />
  ));

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__content}>{renderVideoList}</div>
        <div className={styles.pagination}>
          <div className={styles.pagination__wrapper}>
            <div className={styles.right_block}>
              <RightArrow className={styles.right_block__arrow} />
              <LeftArrow className={styles.right_block__arrow} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.more_btn}>
        <p />
      </div>
    </>
  );
};

export default HorizontalSliderSkeleton;
