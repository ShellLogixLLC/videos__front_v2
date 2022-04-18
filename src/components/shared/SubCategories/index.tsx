import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {useWindowSize} from '~/hooks';
import {SearchBackArrowIcon} from '~/assets';
import {INITIAL_SUB_CATEGORY_TRANSFORM} from '~/constants';

import {SubCategoriesProps} from './types';
import styles from './SubCategories.module.scss';
import Link from '../Link';

const SubCategories: React.FC<SubCategoriesProps> = ({
  wrapperClass,
  subCategoriesList,
}) => {
  const router = useRouter();
  console.log(router, 'router');

  const {isDesktop} = useWindowSize();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [transform, setTransform] = useState<number>(0);
  const [maxScroll, setMaxScroll] = useState<number>(0);

  const leftArrowIconClasses = classNames(styles.wrapper__left_icon, {
    [styles.wrapper__icon_hidden]: transform === 0,
  });

  const rightArrowIconClasses = classNames(styles.wrapper__right_icon, {
    [styles.wrapper__icon_hidden]: maxScroll === transform,
  });

  const wrapperClasses = classNames(styles.wrapper, wrapperClass);

  const handleClickLeftIcon = () => {
    const setValue =
      transform > INITIAL_SUB_CATEGORY_TRANSFORM
        ? transform - INITIAL_SUB_CATEGORY_TRANSFORM
        : 0;
    setTransform(setValue);
  };

  const handleClickRightIcon = () => {
    const nextValue = INITIAL_SUB_CATEGORY_TRANSFORM + transform;
    const setValue =
      maxScroll < nextValue
        ? maxScroll
        : transform + INITIAL_SUB_CATEGORY_TRANSFORM;
    setTransform(setValue);
  };

  useEffect(() => {
    if (contentRef.current) {
      const {offsetWidth, scrollWidth} = contentRef.current;

      setMaxScroll(Number(scrollWidth) - Number(offsetWidth));
    }

    if (!isDesktop) {
      setTransform(0);
    }
  }, [subCategoriesList, isDesktop]);

  const renderSubCategoriesList = subCategoriesList?.map(({name, id}, idx) => (
    <Link
      key={idx}
      to={`/category/${name.en}`}
      className={styles.wrapper__content__item}>
      {name.en}
    </Link>
  ));

  return (
    <div className={wrapperClasses}>
      <div className={leftArrowIconClasses}>
        <SearchBackArrowIcon onClick={handleClickLeftIcon} />
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
        <SearchBackArrowIcon onClick={handleClickRightIcon} />
      </div>
    </div>
  );
};

export default SubCategories;
