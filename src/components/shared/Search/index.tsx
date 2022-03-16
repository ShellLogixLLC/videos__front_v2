import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {SearchBackArrowIcon, SearchIcon} from '~/assets';
import {useOnClickOutside, useWindowSize} from '~/hooks';

import Input from '../Input';

import {SearchProps} from './types';
import styles from './Search.module.scss';

const Search: React.FC<SearchProps> = ({expanded, setExpanded}) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const searchChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const {isDesktop} = useWindowSize();

  const handleClick = () => setExpanded(!expanded);

  const labelClassName = classNames(styles.wrapper, {
    [styles.wrapper_expanded]: expanded,
  });

  const inputClasses = classNames(styles.wrapper__container__search, {
    [styles.wrapper__container__search_expanded]: expanded,
  });

  useOnClickOutside(filterRef, () => setExpanded(false));

  const backArrowClassName = classNames(styles.wrapper__container__back, {
    [styles.wrapper__container__back_expand]: expanded,
  });

  return (
    <>
      {!isDesktop && <SearchBackArrowIcon className={backArrowClassName} />}
      <Input
        type="text"
        name="globalSearch"
        value={searchValue}
        onChange={searchChangeHandle}
        className={inputClasses}
        RightIcon={SearchIcon}
        wrapperRef={filterRef}
        placeholder="Search"
        toggleHandle={handleClick}
        rightIconStyle={styles.wrapper__container__right_icon}
        labelClassName={labelClassName}
        innerClassName={styles.wrapper__container}
      />
    </>
  );
};

export default Search;
