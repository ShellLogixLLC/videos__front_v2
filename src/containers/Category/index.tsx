import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {LeftArrow} from '~/assets';
import {queryParamsTypes} from '~/types';
import {filteredMass, setQueryParams} from '~/utils';
import {
  Link,
  Typography,
  DatePicker,
  Pagination,
  FilterBySort,
} from '~/components';

import styles from './Category.module.scss';
import CategoryTitle from './CategoryTitle';
import CategoryContent from './CategoryContent';

const Category: React.FC = () => {
  const {query} = useRouter();

  useEffect(() => {
    if (query?.page) {
      setActivePage(Number(query.page));
    }
  }, [query.page]);

  const setNewQueryParams = (newQueryParams: queryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const [activePage, setActivePage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

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
          <Link to="/" className={styles.content__back}>
            <LeftArrow />
            <Typography className={styles.content__back_text}>Back</Typography>
          </Link>
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
