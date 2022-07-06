import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {LeftArrowIcon} from '~/assets';
import {QueryParamsTypes} from '~/types';
import {filteredMass, setQueryParams} from '~/utils';
import {DatePicker, Pagination, FilterBySort, BackButton} from '~/components';

import styles from './Category.module.scss';
import CategoryTitle from './CategoryTitle';
import CategoryContent from './CategoryContent';

const Category: React.FC = () => {
  const {query} = useRouter();
  const [activePage, setActivePage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    if (query?.page) {
      setActivePage(Number(query.page));
    }
  }, [query.page]);

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const changeActivePage = (page: number): void => {
    setActivePage(page);
    setNewQueryParams({page});

    window.scrollTo({
      top: 220,
      behavior: 'smooth',
    });
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
          <CategoryTitle categoryId={query?.name} />
          <CategoryContent
            activePage={activePage}
            categoryId={query?.name}
            setTotalCount={setTotalCount}
          />
          {!!totalCount && (
            <div className={styles.content__pagination}>
              <Pagination
                activePage={activePage}
                dataLength={totalCount}
                rowsPerPage={9}
                setActivePage={changeActivePage}
                isPerPageNeeded={false}
                isMoreButtonNeeded={false}
              />
            </div>
          )}
        </div>
        <div className={styles.filters}>
          <DatePicker />
          <FilterBySort options={filteredMass} />
        </div>
      </div>
    </article>
  );
};

export default Category;
