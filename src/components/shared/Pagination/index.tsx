import React, {useRef} from 'react';
import ReactPaginate from 'react-paginate';

import {LeftArrow, RightArrow} from '~/assets';

import ShowItem from './showItem';
import {Pagination} from './types';
//
import styles from './Pagination.module.scss';

const PaginationIndex: React.FC<Pagination> = ({
  rowsPerPage = 5,
  setRowsPerPage = (e) => e,
  rowsPerPageArray = [5, 10, 15, 20],
  activePage = 0,
  setActivePage = (e) => e,
  dataLength = 1,
}) => {
  const pagination = useRef<any>();

  const setPage = ({selected}: any) => setActivePage(selected);

  const setPerPage = (perPage: number) => {
    if (activePage * perPage > dataLength) {
      setActivePage(0);
      setRowsPerPage(perPage);
    } else {
      setRowsPerPage(perPage);
    }
  };

  return (
    <>
      <div className={styles.container__wrapper__show}>
        <ShowItem
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setPerPage}
          rowsPerPageArray={rowsPerPageArray}
        />
      </div>
      <div className={styles.container__wrapper}>
        <div>
          <ReactPaginate
            ref={pagination}
            onPageChange={setPage}
            forcePage={activePage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            nextLabel={<RightArrow />}
            previousLabel={<LeftArrow />}
            disabledClassName={styles.disabled}
            containerClassName={styles.container}
            pageClassName={styles.container__break}
            breakClassName={styles.container__break}
            activeClassName={styles.container_active}
            nextLinkClassName={styles.container__tick}
            previousLinkClassName={styles.container__tick}
            pageCount={Math.ceil(dataLength / rowsPerPage)}
          />
        </div>
      </div>
    </>
  );
};

export default PaginationIndex;
