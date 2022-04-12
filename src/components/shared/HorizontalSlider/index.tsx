import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';

import {useWindowSize} from '~/hooks';
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
  const {isMaxTablet} = useWindowSize();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_PAGINATION_MORE_COUNT,
  );
  const [transformXValue, setTransformXValue] = useState<number>(0);
  const [transformMaxWeight, setTransformMaxWeight] = useState<number>(0);

  const wrapperClasses = classNames(styles.wrapper, className);

  const contentClasses = classNames(styles.wrapper__content, {
    [styles.wrapper__content__category]: isCategory,
  });

  const data = !isMaxTablet ? dataList?.slice(0, rowsPerPage) : dataList;

  const renderVideoList = data?.map((item: any, index: number) =>
    isCategory ? (
      <CategoryCard key={index} item={item} />
    ) : (
      <FilmCard key={index} item={item} />
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
    if (contentRef?.current) {
      const {offsetWidth, scrollWidth} = contentRef?.current;
      setTransformMaxWeight(Number(scrollWidth) - Number(offsetWidth));
    }

    if (!isMaxTablet && transformXValue !== 0) {
      setTransformXValue(0);
    }
  }, [isMaxTablet, dataList, transformXValue, transformMaxWeight]);

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
        setRowsPerPage={setRowsPerPage}
        dataLength={dataList?.length}
        handleClickLeftArrow={handleClickLeftArrow}
        handleClickRightArrow={handleClickRightArrow}
        transformXValue={transformXValue}
        transformMaxWeight={transformMaxWeight}
      />
    </div>
  );
};

export default HorizontalSlider;
