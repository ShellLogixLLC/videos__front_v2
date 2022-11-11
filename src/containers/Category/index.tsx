import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {LeftArrowIcon} from '~/assets';
import {useLocales} from '~/hooks';
import {BackButton, DatePicker} from '~/components';
import {CategoryFilters} from '~/constants';

import styles from './Category.module.scss';
import CategoryTitle from './CategoryTitle';
import CategoryContent from './CategoryContent';
import RandomCategoryContent from './RandomCategoryContent';

const Category: React.FC = () => {
  const {query} = useRouter();

  const isResultWithParams = query?.endDate;

  const [totalCount, setTotalCount] = useState<number>(0);

  const queryActiveCategory = query?.activeCategory;

  const [activeCategory, setActiveCategory] = useState<CategoryFilters>(
    CategoryFilters.All,
  );

  const [subCategoryLoading, setSubCategoryLoading] = useState(false);

  useEffect(() => {
    if (queryActiveCategory) {
      setActiveCategory(queryActiveCategory as CategoryFilters);
    }
  }, [queryActiveCategory]);

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
              setTotalCount={setTotalCount}
              subCategoryLoading={subCategoryLoading}
            />
          ) : (
            <CategoryContent
              setTotalCount={setTotalCount}
              subCategoryLoading={subCategoryLoading}
            />
          )}
        </div>
        <div className={styles.filters}>
          {(!!isResultWithParams || totalCount > 0) && <DatePicker />}
        </div>
      </div>
    </article>
  );
};

export default Category;
