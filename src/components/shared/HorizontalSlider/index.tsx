import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';

import {useWindowSize} from '~/hooks';
import {sliderDataList} from '~/utils';
import {HorizontalSliderProps} from './types';
import {PAGINATION_TRANSFORM_VALUE} from '~/constants';
import {INITIAL_PAGINATION_MORE_COUNT} from '~/constants';
import {CategoryCard, FilmCard, Pagination} from '~/components';

import styles from './HorizontalSlider.module.scss';

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  dataList,
  className = '',
  isCategory,
}) => {
  const {isMaxTablet, windowWidth} = useWindowSize();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_PAGINATION_MORE_COUNT,
  );
  const [isOffsetWidth, setIsOffsetWidth] = useState<boolean>(false);
  const [transformXValue, setTransformXValue] = useState<number>(0);
  const [transformMaxWeight, setTransformMaxWeight] = useState<number | null>(
    null,
  );

  const wrapperClasses = classNames(styles.wrapper, className);

  const contentClasses = classNames(styles.wrapper__content, {
    [styles.wrapper__content__category]: isCategory,
  });

  // // it's code operating temporarily.
  const currentData = dataList || sliderDataList;

  const data = !isMaxTablet ? currentData.slice(0, rowsPerPage) : currentData;

  const renderVideoList = data.map((item: any, index: number) =>
    isCategory ? (
      <CategoryCard key={item.id || index} item={item} />
    ) : (
      <FilmCard key={index} />
    ),
  );

  const handleClickRightArrow = () => {
    if (transformMaxWeight !== null)
      transformXValue < transformMaxWeight - PAGINATION_TRANSFORM_VALUE
        ? setTransformXValue(transformXValue + PAGINATION_TRANSFORM_VALUE)
        : setTransformXValue(transformMaxWeight);
  };

  const handleClickLeftArrow = () =>
    transformXValue > 0
      ? setTransformXValue(transformXValue - PAGINATION_TRANSFORM_VALUE)
      : setTransformXValue(0);

  useEffect(() => {
    if (contentRef.current && isMaxTablet) {
      const {offsetWidth, scrollWidth} = contentRef.current;
      setTransformMaxWeight(Number(scrollWidth) - Number(offsetWidth));

      offsetWidth >= scrollWidth
        ? setIsOffsetWidth(false)
        : setIsOffsetWidth(true);
    }

    if (!isMaxTablet && transformXValue !== 0) {
      setTransformXValue(0);
    }
  }, [isMaxTablet, transformXValue, transformMaxWeight, windowWidth]);

  return (
    <div className={wrapperClasses}>
      <div
        ref={contentRef}
        className={contentClasses}
        style={{
          transform: `translate3d(-${transformXValue}px, 0px, 0px)`,
        }}>
        {renderVideoList}
      </div>
      <Pagination
        isRight
        isCategory={isCategory}
        rowsPerPage={rowsPerPage}
        isOffsetWidth={isOffsetWidth}
        setRowsPerPage={setRowsPerPage}
        dataLength={sliderDataList.length}
        handleClickLeftArrow={handleClickLeftArrow}
        handleClickRightArrow={handleClickRightArrow}
        transformXValue={transformXValue}
        transformMaxWeight={transformMaxWeight}
      />
    </div>
  );
};

export default HorizontalSlider;
