import React from 'react';

import {LeftArrowIcon, RightArrow} from '~/assets';

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

  const moreBtn = !isCategory && (
    <div className={styles.more_btn}>
      <p />
    </div>
  );

  const renderVideoList = commentsArray.map((item, index) =>
    isCategory ? (
      <React.Fragment key={index}>
        <CategoryCardSkeleton />
      </React.Fragment>
    ) : (
      <React.Fragment key={index}>
        <FilmCardSkeleton />
      </React.Fragment>
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
              <LeftArrowIcon className={styles.right_block__arrow} />
            </div>
          </div>
        </div>
      </div>
      {moreBtn}
    </>
  );
};

export default HorizontalSliderSkeleton;
