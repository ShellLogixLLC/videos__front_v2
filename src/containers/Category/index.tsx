import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {LeftArrowIcon} from '~/assets';
import {useWindowSize} from '~/hooks';
import {setQueryParams} from '~/utils';
import {QueryParamsTypes} from '~/types';
import {DatePicker, Pagination, BackButton} from '~/components';
import {
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';

import styles from './Category.module.scss';
import CategoryTitle from './CategoryTitle';
import CategoryContent from './CategoryContent';

const Category: React.FC = () => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();
  const currentPerPageCount = !isMinTablet
    ? INITIAL_PAGINATION_ROWS_PER_PAGE
    : INITIAL_PAGINATION_MORE_COUNT;

  const [activePage, setActivePage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(currentPerPageCount);

  useEffect(() => {
    if (query?.page) {
      setActivePage(Number(query.page));

      if (!isMinTablet) {
        window.scrollTo({
          top: 220,
          behavior: 'smooth',
        });
      }
    }
  }, [query.page]);

  useEffect(() => {
    if (query.name) {
      setActivePage(0);
      setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
    }
  }, [query.name]);

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  useEffect(() => {
    setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
    setActivePage(0);
  }, [isMinTablet]);

  const changeActivePage = (page: number): void => {
    setActivePage(page);
    setNewQueryParams({page});
  };

  return (
    <article>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.content__backRoute}>
            <BackButton
              text="Back"
              LeftIcon={LeftArrowIcon}
              className={styles.content__backRoute__button}
            />
          </div>
          <CategoryTitle
            categoryId={query?.name}
            setActivePage={setActivePage}
          />
          <CategoryContent
            activePage={activePage}
            categoryId={query?.name}
            setTotalCount={setTotalCount}
            totalCount={totalCount}
            rowsPerPage={rowsPerPage}
          />
          {!!totalCount && (
            <div className={styles.content__pagination}>
              <Pagination
                dataLength={totalCount}
                rowsPerPage={rowsPerPage}
                activePage={activePage}
                setRowsPerPage={setRowsPerPage}
                setActivePage={changeActivePage}
                isPerPageNeeded={false}
              />
            </div>
          )}
        </div>
        <div className={styles.filters}>
          <DatePicker />
        </div>
      </div>
    </article>
  );
};

export default Category;
