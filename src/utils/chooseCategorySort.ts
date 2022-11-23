import React from 'react';

import {CategoryFilters} from '~/constants';
import {QueryParamsTypes} from '~/types';

import setQueryParams from './setQueryParams';

const chooseCategory = (
  nameCategory: string,
  query: QueryParamsTypes,
  activeCategory: string | string[],
  setActiveCategory: React.Dispatch<React.SetStateAction<string | string[]>>,
) => {
  if (nameCategory !== activeCategory) {
    setActiveCategory(nameCategory);
    if ((nameCategory = CategoryFilters.TopRated)) {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: -1,
        viewsSort: '',
        durationSort: '',
      });
    } else if (nameCategory === CategoryFilters.TopViews) {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: '',
        viewsSort: -1,
        durationSort: '',
      });
    } else if (nameCategory === CategoryFilters.Duration) {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: '',
        viewsSort: '',
        durationSort: -1,
      });
    } else {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: '',
        viewsSort: '',
        durationSort: '',
      });
    }
  }
};

export default chooseCategory;
