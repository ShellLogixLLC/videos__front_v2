import React from 'react';

import {LeftArrow, RightArrow} from '~/assets';

import CategoryCardSkeleton from '../CategoryCard';
import FilmCardSkeleton from '../FilmCard';
import {ISkeletonDataTypes} from '../types';

import styles from './HorizontalSlider.module.scss';

const HorizontalSliderSkeleton: React.FC<ISkeletonDataTypes> = ({
  isCategory = false,
  wrapperClasses,
  contentClasses,
}) => {
  const commentsArray = new Array(isCategory ? 8 : 4).fill({});

  const moreBtn = !isCategory ? (
    <div className={styles.more_btn}>
      <p />
    </div>
  ) : null;

  const renderVideoList = commentsArray.map((item, index) =>
    isCategory ? (
      <CategoryCardSkeleton key={index} />
    ) : (
      <FilmCardSkeleton key={index} />
    ),
  );

  return (
    <>
      <div className={wrapperClasses}>
        <div className={contentClasses}>{renderVideoList}</div>
        <div className={styles.pagination}>
          <div className={styles.pagination__wrapper}>
            <div className={styles.right_block}>
              <RightArrow className={styles.right_block__arrow} />
              <LeftArrow className={styles.right_block__arrow} />
            </div>
          </div>
        </div>
      </div>
      {moreBtn}
    </>
  );
};

export default HorizontalSliderSkeleton;
