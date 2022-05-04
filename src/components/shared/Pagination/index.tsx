import React, {useEffect} from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

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
  isCategory,
  dataLength,
  activePage = INITIAL_PAGINATION_ACTIVE_PAGE,
  rowsPerPage = INITIAL_PAGINATION_ROWS_PER_PAGE,
  isMoreButtonNeeded = true,
  isPerPageNeeded = true,
  setActivePage = (e) => e,
  setRowsPerPage = (e) => e,
  handleClickLeftArrow,
  handleClickRightArrow,
  transformXValue,
  transformMaxWeight,
}) => {
  const pageCount = Math.ceil(dataLength / rowsPerPage);
  const rightArrowClasses = classNames(styles.right_block__arrow, {
    [styles.disabled]: transformXValue === transformMaxWeight,
  });

  const leftArrowClasses = classNames(styles.right_block__arrow, {
    [styles.disabled]: transformXValue === 0,
  });

  const containerClasses = classNames(styles.container, {
    [styles.container__display]: isMoreButtonNeeded,
  });

  const setPage = (selectedItem: {selected: number}) =>
    setActivePage(selectedItem.selected);

  const handleClickMore = () =>
    setRowsPerPage(rowsPerPage + INITIAL_PAGINATION_MORE_COUNT);

  useEffect(() => {
    if (activePage * rowsPerPage > dataLength) {
      setActivePage(pageCount - 1);
    }

    if (rowsPerPage >= dataLength) {
      setRowsPerPage(dataLength);
    } else if (rowsPerPage <= INITIAL_PAGINATION_ROWS_PER_PAGE) {
      setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage]);

  const moreBtn =
    !(rowsPerPage >= dataLength) && !isCategory ? (
      <Button
        className={styles.container__wrapper__more_btn}
        onClick={handleClickMore}>
        More
      </Button>
    ) : null;

  const paginationPerPage = isPerPageNeeded && !isRight && (
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
      containerClassName={containerClasses}
      marginPagesDisplayed={INITIAL_PAGINATION_MARGIN_DISPLAYED}
      previousLinkClassName={styles.container__tick}
    />
  );

  return (
    <>
      {paginationPerPage}
      <div className={styles.container__wrapper}>
        {isMoreButtonNeeded && moreBtn}
        {activePagination}
      </div>
    </>
  );
};

export default PaginationIndex;
