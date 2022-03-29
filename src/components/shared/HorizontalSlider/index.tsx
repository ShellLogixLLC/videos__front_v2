import React, {useState, useRef, useEffect} from 'react';

import {useWindowSize} from '~/hooks';
import {FilmCard, Pagination} from '~/components';
import {PAGINATION_TRANSFORM_VALUE} from '~/constants';
import {INITIAL_PAGINATION_MORE_COUNT} from '~/constants';

import styles from './HorizontalSlider.module.scss';

const HorizontalSlider: React.FC = () => {
  const {isMaxTablet} = useWindowSize();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_PAGINATION_MORE_COUNT,
  );
  const [transformXValue, setTransformXValue] = useState<number>(0);
  const [transformMaxWeight, setTransformMaxWeight] = useState<number | null>(
    null,
  );

  // it's data operating temporarily.
  const dataList = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  const data = !isMaxTablet ? dataList.slice(0, rowsPerPage) : dataList;
  console.log(data.length);

  const renderAllFim = data.map((item, index) => <FilmCard key={index} />);

  const handleClickRightArrow = () => {
    if (transformMaxWeight !== null)
      if (transformXValue < transformMaxWeight - PAGINATION_TRANSFORM_VALUE) {
        setTransformXValue(transformXValue + PAGINATION_TRANSFORM_VALUE);
      } else {
        setTransformXValue(transformMaxWeight);
      }
  };

  const handleClickLeftArrow = () => {
    if (transformXValue > 0) {
      setTransformXValue(transformXValue - PAGINATION_TRANSFORM_VALUE);
    } else {
      setTransformXValue(0);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      const {offsetWidth, scrollWidth} = contentRef.current;
      setTransformMaxWeight(Number(scrollWidth) - Number(offsetWidth));
    }

    if (!isMaxTablet) {
      setTransformXValue(0);
    }
  }, [isMaxTablet, transformXValue, transformMaxWeight]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={contentRef}
        className={styles.wrapper__content}
        style={{
          transform: `translate3d(-${transformXValue}px, 0px, 0px)`,
        }}>
        {renderAllFim}
      </div>
      <Pagination
        isRight
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        dataLength={dataList.length}
        handleClickLeftArrow={handleClickLeftArrow}
        handleClickRightArrow={handleClickRightArrow}
        transformXValue={transformXValue}
        transformMaxWeight={transformMaxWeight}
      />
    </div>
  );
};

export default HorizontalSlider;
