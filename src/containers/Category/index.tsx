import React, {useEffect, useState} from 'react';
import {isEqual} from 'lodash';
import {useRouter} from 'next/router';

import {LeftArrowIcon} from '~/assets';
import {setQueryParams} from '~/utils';
import {QueryParamsTypes} from '~/types';
import {useLocales, useWindowSize} from '~/hooks';
import {BackButton, DatePicker, Pagination} from '~/components';
import {CategoryFilters, INITIAL_PAGINATION_ROWS_PER_PAGE} from '~/constants';

import styles from './Category.module.scss';
import CategoryTitle from './CategoryTitle';
import CategoryContent from './CategoryContent';
import RandomCategoryContent from './RandomCategoryContent';

const Category: React.FC = () => {
  const {query, asPath} = useRouter();
  const {isMinTablet} = useWindowSize();

  const queryPage = query?.page;
  const queryActiveCategory = query?.activeCategory;
  const currentPage =
    asPath.includes('page=0') || !queryPage ? 0 : Number(queryPage);

  const [activePage, setActivePage] = useState<number>(currentPage);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState(CategoryFilters.All);

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_PAGINATION_ROWS_PER_PAGE,
  );
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);

  useEffect(() => {
    if (!isEqual(INITIAL_PAGINATION_ROWS_PER_PAGE, rowsPerPage)) {
      setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
    }

    setActivePage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  useEffect(() => {
    if (isMinTablet) {
      setActivePage(0);
    }
    setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
  }, [isMinTablet]);

  useEffect(() => {
    if (queryActiveCategory) {
      setActiveCategory(queryActiveCategory as CategoryFilters);
    }
  }, [queryActiveCategory]);

  const changeActivePage = (page: number): void => {
    setActivePage(page);
    setNewQueryParams({page});
  };

  const {translatedTypo: translatedBackText} = useLocales('back');

  return (
    <article>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.content__backRoute}>
            <BackButton
              text={translatedBackText || ''}
              LeftIcon={LeftArrowIcon}
              className={styles.content__backRoute__button}
            />
          </div>
          <CategoryTitle
            setSubCategoryLoading={setSubCategoryLoading}
            categoryId={query?.name}
          />
          {activeCategory === CategoryFilters.All ? (
            <RandomCategoryContent
              activePage={activePage}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
              setTotalCount={setTotalCount}
              subCategoryLoading={subCategoryLoading}
            />
          ) : (
            <CategoryContent
              subCategoryLoading={subCategoryLoading}
              activePage={activePage}
              setTotalCount={setTotalCount}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
            />
          )}

          {totalCount > rowsPerPage && (
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
