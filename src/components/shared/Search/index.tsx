import React from 'react';

import {SearchIcon} from '~/assets';

import Input from '../Input';

import {SearchProps} from './types';
import styles from './Search.module.scss';

const Search: React.FC<SearchProps> = ({searchValue, searchChange}) => (
  <Input
    type="text"
    name="globalSearch"
    placeholder="Search"
    value={searchValue}
    onChange={searchChange}
    RightIcon={SearchIcon}
    className={styles.search}
    rightIconStyle={styles.right_icon}
  />
);

export default Search;
