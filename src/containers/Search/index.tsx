import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {isEqual} from 'lodash';

import {setQueryParams} from '~/utils';
import {
  BackButton,
  CategoryNav,
  DatePicker,
  Pagination,
  Typography,
} from '~/components';
import {LeftArrowIcon} from '~/assets';
import {
  CategoryFilters,
  INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {QueryParamsTypes} from '~/types';
import {useLocales, useWindowSize} from '~/hooks';

import SearchContent from './SearchContent';
import RandomSearchContent from './RandomSearchContent';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {query, asPath} = useRouter();
  const {isMinTablet} = useWindowSize();

  const [activeCategory, setActiveCategory] = useState<CategoryFilters>(
    CategoryFilters.All,
  );

  const queryPage = query?.page;
  const queryActiveCategory = query?.activeCategory;

  const currentPage =
    asPath.includes('page=0') || !queryPage ? 0 : Number(queryPage);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(currentPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
  );

  useEffect(() => {
    if (queryActiveCategory) {
      setActiveCategory(queryActiveCategory as CategoryFilters);
    }
  }, [queryActiveCategory]);

  useEffect(() => {
    if (!isEqual(INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE, rowsPerPage)) {
      setRowsPerPage(INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE);
    }

    setActivePage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const changeActivePage = (page: number) => {
    setActivePage(page);
    setNewQueryParams({page});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  useEffect(() => {
    if (isMinTablet) {
      setActivePage(0);
    }
  }, [isMinTablet]);

  const {translatedTypo} = useLocales('back');

  return (
    <article>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__content}>
          <section>
            <div className={styles.wrapper__content__header}>
              <BackButton
                text={translatedTypo || ''}
                LeftIcon={LeftArrowIcon}
                className={styles.wrapper__content__header__route}
              />
              <CategoryNav isNotActive={totalCount <= 0} />
              <Typography className={styles.wrapper__content__header__title}>
                searchResults
              </Typography>
            </div>
          </section>
          {activeCategory === CategoryFilters.All ? (
            <RandomSearchContent
              activePage={activePage}
              rowsPerPage={rowsPerPage}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
            />
          ) : (
            <SearchContent
              activePage={activePage}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
              setTotalCount={setTotalCount}
            />
          )}
          <section>
            {totalCount > INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE && (
              <Pagination
                dataLength={totalCount}
                isPerPageNeeded={false}
                setActivePage={changeActivePage}
                activePage={activePage}
                isMoreButtonNeeded={false}
                rowsPerPage={INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE}
              />
            )}
          </section>
        </div>
        <aside className={styles.filter_block}>
          {totalCount !== 0 && totalCount !== undefined && <DatePicker />}
        </aside>
      </div>
    </article>
  );
};

export default Search;
