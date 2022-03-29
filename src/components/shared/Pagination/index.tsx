import React, {useEffect} from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

import {useWindowSize} from '~/hooks';
import {LeftArrow, RightArrow} from '~/assets';
import {
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_PAGINATION_ACTIVE_PAGE,
  INITIAL_PAGINATION_ROWS_PER_PAGE,
  INITIAL_PAGINATION_RANGE_DISPLAYED,
  INITIAL_PAGINATION_MARGIN_DISPLAYED,
} from '~/constants';

import Button from '../Button';

import PerPage from './PerPage';
import {IPaginationProps} from './types';
import styles from './Pagination.module.scss';

const PaginationIndex: React.FC<IPaginationProps> = ({
  isRight = false,
  dataLength,
  activePage = INITIAL_PAGINATION_ACTIVE_PAGE,
  rowsPerPage = INITIAL_PAGINATION_ROWS_PER_PAGE,
  setActivePage = (e) => e,
  setRowsPerPage = (e) => e,
  handleClickLeftArrow,
  handleClickRightArrow,
  transformXValue,
  transformMaxWeight,
}) => {
  const {isMaxTablet} = useWindowSize();

  const pageCount = Math.ceil(dataLength / rowsPerPage);

  const rightArrowClasses = classNames(styles.right_block__arrow, {
    [styles.disabled]: transformXValue === transformMaxWeight,
  });

  const leftArrowClasses = classNames(styles.right_block__arrow, {
    [styles.disabled]: transformXValue === 0,
  });

  const setPage = (selectedItem: {selected: number}) =>
    setActivePage(selectedItem.selected);

  const handleClickMore = () =>
    setRowsPerPage(rowsPerPage + INITIAL_PAGINATION_MORE_COUNT);

  useEffect(() => {
    if (activePage * rowsPerPage > pageCount) {
      setActivePage(pageCount - 1);
    }

    if (rowsPerPage >= dataLength) {
      setRowsPerPage(dataLength);
    } else if (rowsPerPage <= INITIAL_PAGINATION_ROWS_PER_PAGE) {
      setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
    }
  }, [rowsPerPage]);

  const moreBtn = !(rowsPerPage >= dataLength) ? (
    <Button onClick={handleClickMore}>More</Button>
  ) : null;

  const paginationPerPage = !isRight && isMaxTablet && (
    <div className={styles.container__wrapper__show}>
      <PerPage rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
    </div>
  );

  const activePagination = isRight ? (
    <div className={styles.right_block}>
      <RightArrow
        onClick={handleClickRightArrow}
        className={rightArrowClasses}
      />
      <LeftArrow onClick={handleClickLeftArrow} className={leftArrowClasses} />
    </div>
  ) : (
    <ReactPaginate
      forcePage={activePage}
      nextLabel={<RightArrow />}
      pageCount={pageCount}
      onPageChange={setPage}
      previousLabel={<LeftArrow />}
      pageClassName={styles.container__break}
      breakClassName={styles.container__break}
      activeClassName={styles.container_active}
      disabledClassName={styles.disabled}
      nextLinkClassName={styles.container__tick}
      pageRangeDisplayed={INITIAL_PAGINATION_RANGE_DISPLAYED}
      containerClassName={styles.container}
      marginPagesDisplayed={INITIAL_PAGINATION_MARGIN_DISPLAYED}
      previousLinkClassName={styles.container__tick}
    />
  );

  return (
    <>
      {paginationPerPage}
      <div className={styles.container__wrapper}>
        {!isMaxTablet ? moreBtn : activePagination}
      </div>
    </>
  );
};

export default PaginationIndex;
