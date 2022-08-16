import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {useWindowSize} from '~/hooks';
import {SearchBackArrowIcon} from '~/assets';
import {getCookieFromBrowser} from '~/libraries';
import {CategoryFilters, INITIAL_SUB_CATEGORY_TRANSFORM} from '~/constants';

import Link from '../Link';

import {SubCategoriesProps} from './types';
import styles from './SubCategories.module.scss';

const SubCategories: React.FC<SubCategoriesProps> = ({
  wrapperClass,
  subCategoriesList,
}) => {
  const lng = (getCookieFromBrowser('activeLang') as string) || 'en';

  const router = useRouter();
  const {query} = router;
  const {isDesktop, windowWidth} = useWindowSize();

  const contentRef = useRef<HTMLDivElement | null>(null);

  const [transform, setTransform] = useState<number>(0);
  const [maxScroll, setMaxScroll] = useState<number>(0);

  const setPrevValue =
    transform > INITIAL_SUB_CATEGORY_TRANSFORM
      ? transform - INITIAL_SUB_CATEGORY_TRANSFORM
      : 0;

  const nextValue = INITIAL_SUB_CATEGORY_TRANSFORM + transform;
  const setNextValue =
    maxScroll < nextValue
      ? maxScroll
      : transform + INITIAL_SUB_CATEGORY_TRANSFORM;
  const isHiddenLeftIcon = maxScroll === 0 || transform === 0;
  const isHiddenRightIcon = maxScroll === 0 || maxScroll === transform;

  const leftArrowIconClasses = classNames(styles.wrapper__left_icon, {
    [styles.wrapper__icon_hidden]: isHiddenLeftIcon,
  });

  const rightArrowIconClasses = classNames(styles.wrapper__right_icon, {
    [styles.wrapper__icon_hidden]: isHiddenRightIcon,
  });

  const wrapperClasses = classNames(styles.wrapper, wrapperClass);

  const handleClickIcon = (nextValue: number) => {
    setTransform(nextValue);
  };

  useEffect(() => {
    if (contentRef.current) {
      const {offsetWidth, scrollWidth} = contentRef.current;
      setMaxScroll(Number(scrollWidth) - Number(offsetWidth));
    }
  }, [isDesktop, contentRef, subCategoriesList, windowWidth]);

  useEffect(() => {
    setTransform(0);
  }, [windowWidth]);

  const renderSubCategoriesList = subCategoriesList?.map(({name, id}) => {
    const isActiveItem = query.name === id;

    const itemClasses = classNames(styles.wrapper__content__item, {
      [styles.wrapper__content__item__active]: isActiveItem,
    });

    return (
      <Link
        key={id}
        to={{
          pathname: '/category/[name]',
          query: {
            activeCategory: CategoryFilters.All,
            likesSort: '',
            viewsSort: '',
            durationSort: '',
          },
        }}
        as={`/category/${id}`}
        className={itemClasses}>
        {name[lng]}
      </Link>
    );
  });

  return (
    <div className={wrapperClasses}>
      <div className={leftArrowIconClasses}>
        <SearchBackArrowIcon onClick={() => handleClickIcon(setPrevValue)} />
      </div>
      <div className={styles.wrapper__content}>
        <div
          ref={contentRef}
          className={styles.wrapper__content__inner}
          style={{
            transform: `translate3d(-${transform}px, 0px, 0px)`,
          }}>
          {renderSubCategoriesList}
        </div>
      </div>
      <div className={rightArrowIconClasses}>
        <SearchBackArrowIcon onClick={() => handleClickIcon(setNextValue)} />
      </div>
    </div>
  );
};

export default SubCategories;
