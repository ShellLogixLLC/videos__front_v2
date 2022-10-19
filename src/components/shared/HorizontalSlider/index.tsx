import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';

import {useWindowSize} from '~/hooks';
import {
  PAGINATION_TRANSFORM_VALUE,
  INITIAL_PAGINATION_MORE_COUNT,
  PAGINATION_SMALL_TRANSFORM_VALUE,
} from '~/constants';
import {
  FilmCard,
  Pagination,
  CategoryCard,
  HorizontalSliderSkeleton,
} from '~/components';

import {HorizontalSliderProps} from './types';
import styles from './HorizontalSlider.module.scss';

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  dataList,
  wishlist,
  isLoading,
  isScrollable = false,
  className = '',
  isCategory = false,
}) => {
  const {isMaxTablet} = useWindowSize();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const paginationValue = isCategory
    ? PAGINATION_SMALL_TRANSFORM_VALUE
    : PAGINATION_TRANSFORM_VALUE;

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_PAGINATION_MORE_COUNT,
  );
  const [transformXValue, setTransformXValue] = useState<number>(0);
  const [isTransformMadeWithButton, setIsTransformMadeWithButton] =
    useState<boolean>(false);

  const [transformMaxWeight, setTransformMaxWeight] = useState<number>(0);

  const wrapperClasses = classNames(styles.wrapper, className);

  const contentClasses = classNames(styles.wrapper__content, {
    [styles.wrapper__content__category]: isCategory,
    [styles.wrapper__content__category__isScrollable]: isScrollable,
  });

  const data = !isMaxTablet ? dataList?.slice(0, rowsPerPage) : dataList;

  const renderVideoList = data?.map((item) =>
    isCategory ? (
      <CategoryCard key={item.id} item={item} isLoading={isLoading} />
    ) : (
      <FilmCard
        key={item.id}
        cardClasses={styles.wrapper__item}
        item={item}
        wishlist={wishlist}
      />
    ),
  );

  const handleClickRightArrow = () => {
    if (transformMaxWeight !== null)
      transformXValue < transformMaxWeight - paginationValue
        ? setTransformXValue(transformXValue + paginationValue)
        : setTransformXValue(transformMaxWeight);

    isScrollable && setIsTransformMadeWithButton(true);
  };

  const handleClickLeftArrow = () => {
    transformXValue > 0
      ? setTransformXValue(transformXValue - paginationValue)
      : setTransformXValue(0);
    isScrollable && setIsTransformMadeWithButton(true);
  };

  const handleScroll = (e: any) => {
    if (isScrollable) {
      const scrollLeft = contentRef.current?.scrollLeft;
      setTransformXValue(Number(scrollLeft));
      setIsTransformMadeWithButton(false);
    }
  };

  useEffect(() => {
    if (contentRef?.current) {
      const {offsetWidth, scrollWidth} = contentRef?.current;
      setTransformMaxWeight(Number(scrollWidth) - Number(offsetWidth));
    }

    if (!isMaxTablet && transformXValue !== 0) {
      setTransformXValue(0);
    }
  }, [isMaxTablet, dataList, transformXValue, transformMaxWeight, isLoading]);

  useEffect(() => {
    if (isScrollable && isTransformMadeWithButton) {
      contentRef.current?.scroll({left: transformXValue});
    }
  }, [transformXValue]);

  return isLoading ? (
    <HorizontalSliderSkeleton
      isCategory={isCategory}
      wrapperClasses={wrapperClasses}
      contentClasses={contentClasses}
    />
  ) : (
    <div className={wrapperClasses}>
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className={contentClasses}
        style={
          !isScrollable
            ? {
                transform: `translate3d(-${transformXValue}px, 0px, 0px)`,
              }
            : {}
        }>
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
