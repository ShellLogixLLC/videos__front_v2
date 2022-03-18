import React, {useRef, useState, useEffect} from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

import {useWindowSize} from '~/hooks/index';
import {LeftArrow, RightArrow} from '~/assets';

import ShowItem from './showItem';
import {Pagination} from './types';

import Button from '../Button';

import styles from './Pagination.module.scss';

const PaginationIndex: React.FC<Pagination> = ({
  isRigh,
  activePage = 0,
  dataLength = 30,
  setActivePage = (e) => e,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const pagination = useRef<any>(null);

  const {isMaxTablet} = useWindowSize();

  const moreCount = 4;

  const setPage = (selectedItem: {selected: number}) =>
    setActivePage(selectedItem.selected);

  const pageCount = Math.ceil(dataLength / rowsPerPage);

  const rightArrowClasses = classNames(styles.right_block__arrow, {
    [styles.disabled]: rowsPerPage === dataLength,
  });

  const leftArrowClasses = classNames(styles.right_block__arrow, {
    [styles.disabled]: rowsPerPage === 5,
  });

  const handleClickMore = () => setRowsPerPage(rowsPerPage + moreCount);

  const handleClickLeftArrow = () => setRowsPerPage(rowsPerPage - moreCount);

  useEffect(() => {
    if (activePage * rowsPerPage > pageCount) {
      setActivePage(pageCount - 1);
    }

    if (rowsPerPage >= dataLength) {
      setRowsPerPage(dataLength);
    } else if (rowsPerPage <= 5) {
      setRowsPerPage(5);
    }
  }, [rowsPerPage]);

  const moreBtn = !(rowsPerPage >= dataLength) ? (
    <Button onClick={handleClickMore}>More</Button>
  ) : null;

  const paginationPerPage = !isRigh && isMaxTablet && (
    <div className={styles.container__wrapper__show}>
      <ShowItem rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
    </div>
  );

  const activePagination = isRigh ? (
    <div className={styles.right_block}>
      <RightArrow onClick={handleClickMore} className={rightArrowClasses} />
      <LeftArrow onClick={handleClickLeftArrow} className={leftArrowClasses} />
    </div>
  ) : (
    <ReactPaginate
      ref={pagination}
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
      pageRangeDisplayed={2}
      containerClassName={styles.container}
      marginPagesDisplayed={1}
      previousLinkClassName={styles.container__tick}
    />
  );

  return (
    <>
      {paginationPerPage}
      <div className={styles.container__wrapper}>
        {!isMaxTablet ? moreBtn : <div>{activePagination}</div>}
      </div>
    </>
  );
};

export default PaginationIndex;
