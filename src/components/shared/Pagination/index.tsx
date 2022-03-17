import React, {useRef, useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

import {useWindowSize} from '~/hooks/index';
import {LeftArrow, RightArrow} from '~/assets';

import ShowItem from './showItem';
import {Pagination} from './types';
import styles from './Pagination.module.scss';

const PaginationIndex: React.FC<Pagination> = ({
  activePage = 0,
  setActivePage = (e) => e,
  dataLength = 30,
}) => {
  const pagination = useRef<any>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const {isMaxTablet} = useWindowSize();

  const setPage = ({selected}: any) => setActivePage(selected);
  const pageCount = Math.ceil(dataLength / rowsPerPage);

  useEffect(() => {
    if (activePage * rowsPerPage > pageCount) {
      setActivePage(pageCount - 1);
    }
  }, [rowsPerPage]);

  return (
    <>
      <div className={styles.container__wrapper__show}>
        <ShowItem rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
      </div>
      <div className={styles.container__wrapper}>
        <div>
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
        </div>
      </div>
    </>
  );
};

export default PaginationIndex;
