import React, {useRef, useState, useContext} from 'react';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import {values} from 'lodash';

import {ToggleContext} from '~/context';
import {useOnClickOutside} from '~/hooks';
import {SearchBackArrowIcon, SearchIcon} from '~/assets';
import {useLocales} from '~/hooks';

import Input from '../Input';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {expanded, toggleExpanded} = useContext(ToggleContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.length) {
      setSearchValue('');
      toggleExpanded(false);
      router.push({
        pathname: `/search/${searchValue}`,
      });
    } else {
      toggleExpanded(true);
      setTimeout(() => inputRef?.current?.focus(), 100);
    }
  };

  const searchChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchValue.length < 1) {
      setSearchValue(e.target.value.trim());
    } else {
      setSearchValue(e.target.value);
    }
  };

  const {translatedTypo: translatedPlaceholder} = useLocales('search');

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
    setTimeout(() => inputRef?.current?.blur(), 100);
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
          // setValue={values}
          onChange={searchChangeHandle}
          className={inputClasses}
          RightIcon={SearchIcon}
          wrapperRef={filterRef}
          placeholder={translatedPlaceholder || ''}
          toggleHandle={onSearchSubmit}
          rightIconStyle={styles.wrapper__container__right_icon}
          innerClassName={styles.wrapper__container}
        />
      </form>
    </>
  );
};

export default Search;
