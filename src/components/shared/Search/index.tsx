import React, {useRef, useState, useContext} from 'react';
import classNames from 'classnames';

import {ToggleContext} from '~/context';
import {useOnClickOutside} from '~/hooks';
import {SearchBackArrowIcon, SearchIcon} from '~/assets';

import Input from '../Input';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {expanded, toggleExpanded} = useContext(ToggleContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.length) {
      // TODO connect it with back end in the future
      // eslint-disable-next-line no-console
      console.log('searchValue =', searchValue);
      setSearchValue('');
      toggleExpanded(false);
    } else {
      toggleExpanded(true);
    }
  };

  const searchChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const labelClassName = classNames(styles.wrapper, {
    [styles.wrapper_expanded]: expanded,
  });

  const inputClasses = classNames(styles.wrapper__container__search, {
    [styles.wrapper__container__search_expanded]: expanded,
  });

  const backArrowClassName = classNames(styles.wrapper__container__back, {
    [styles.wrapper__container__back_expand]: expanded,
  });

  useOnClickOutside(filterRef, () => {
    setSearchValue('');
    toggleExpanded(false);
    inputRef?.current?.blur();
  });

  return (
    <>
      <SearchBackArrowIcon className={backArrowClassName} />
      <form
        action="submit"
        onSubmit={onSearchSubmit}
        className={labelClassName}>
        <Input
          ref={inputRef}
          type="text"
          name="globalSearch"
          value={searchValue}
          onChange={searchChangeHandle}
          className={inputClasses}
          RightIcon={SearchIcon}
          wrapperRef={filterRef}
          placeholder="Search"
          toggleHandle={onSearchSubmit}
          rightIconStyle={styles.wrapper__container__right_icon}
          innerClassName={styles.wrapper__container}
        />
      </form>
    </>
  );
};

export default Search;
