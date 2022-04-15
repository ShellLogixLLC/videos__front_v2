import classNames from 'classnames';
import React from 'react';

import {LeftArrow, RightArrow} from '~/assets';

import CategoryCardSkeleton from '../CategoryCard';
import FilmCardSkeleton from '../FilmCard';
import {ISkeletonDataTypes} from '../types';

import styles from './HorizontalSlider.module.scss';

const HorizontalSliderSkeleton: React.FC<ISkeletonDataTypes> = ({
  dataLength = 4,
  isCategory = false,
  className = '',
}) => {
  const commentsArray = new Array(dataLength).fill({});
  const wrapperClasses = classNames(styles.wrapper, className);

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
