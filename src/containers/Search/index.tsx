import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {BackButton, CategoryNav, DatePicker, Typography} from '~/components';
import {LeftArrowIcon} from '~/assets';
import {CategoryFilters} from '~/constants';
import {useLocales} from '~/hooks';

import SearchContent from './SearchContent';
import RandomSearchContent from './RandomSearchContent';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {query} = useRouter();

  const isResultWithParams = query?.endDate;

  const [activeCategory, setActiveCategory] = useState<CategoryFilters>(
    CategoryFilters.All,
  );

  const queryActiveCategory = query?.activeCategory;

  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    if (queryActiveCategory) {
      setActiveCategory(queryActiveCategory as CategoryFilters);
    }
  }, [queryActiveCategory]);

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
            <RandomSearchContent setTotalCount={setTotalCount} />
          ) : (
            <SearchContent setTotalCount={setTotalCount} />
          )}
        </div>
        <aside className={styles.filter_block}>
          {(!!isResultWithParams || totalCount > 0) && <DatePicker />}
        </aside>
      </div>
    </article>
  );
};

export default Search;
