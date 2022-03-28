import React, {useRef, useState, useEffect, useContext} from 'react';
import classNames from 'classnames';

import {ToggleContext} from '~/context';
import {SearchBackArrowIcon, SearchIcon} from '~/assets';
import {useOnClickOutside, useWindowSize} from '~/hooks';

import Input from '../Input';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const {expanded, toggleExpanded} = useContext(ToggleContext);

  const searchChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const {isDesktop} = useWindowSize();

  const labelClassName = classNames(styles.wrapper, {
    [styles.wrapper_expanded]: expanded,
  });

  const inputClasses = classNames(styles.wrapper__container__search, {
    [styles.wrapper__container__search_expanded]: expanded,
  });

  const backArrowClassName = classNames(styles.wrapper__container__back, {
    [styles.wrapper__container__back_expand]: expanded,
  });

  useOnClickOutside(filterRef, () => toggleExpanded(false));

  useEffect(() => {
    setSearchValue('');
  }, [expanded]);

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
        toggleHandle={toggleExpanded}
        rightIconStyle={styles.wrapper__container__right_icon}
        labelClassName={labelClassName}
        innerClassName={styles.wrapper__container}
      />
    </>
  );
};

export default Search;
