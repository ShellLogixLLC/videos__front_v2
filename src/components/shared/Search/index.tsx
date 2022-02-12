import React, {useState, useRef} from 'react';
import classNames from 'classnames';

import {SearchIcon} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Input from '../Input';

import {SearchProps} from './types';
//
import styles from './Search.module.scss';

const Search: React.FC<SearchProps> = ({searchValue, searchChange}) => {
  const filterRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (!expanded) {
      setExpanded(true);
    }
  };

  const inputClasses = classNames(styles.wrapper__container__search, {
    [styles.wrapper__container__search_expanded]: expanded,
  });

  const iconClasses = classNames(styles.wrapper__container__right_icon, {
    [styles.wrapper__container__right_icon_open]: expanded,
  });

  useOnClickOutside(filterRef, () => setExpanded(false));

  return (
    <Input
      type="text"
      ref={filterRef}
      name="globalSearch"
      value={searchValue}
      placeholder="Search"
      onClick={handleClick}
      onChange={searchChange}
      RightIcon={SearchIcon}
      className={inputClasses}
      labelClassName={styles.wrapper}
      innerClassName={styles.wrapper__container}
      rightIconStyle={iconClasses}
    />
  );
};

export default Search;
