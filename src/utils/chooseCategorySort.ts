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
    if (CategoryFilters.TopRated === nameCategory) {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: -1,
        viewsSort: '',
        dateSort: '',
        durationSort: '',
      });
    } else if (CategoryFilters.TopViews === nameCategory) {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: '',
        viewsSort: -1,
        dateSort: '',
        durationSort: '',
      });
    } else if (CategoryFilters.Duration === nameCategory) {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: '',
        viewsSort: '',
        dateSort: '',
        durationSort: -1,
      });
    } else if (CategoryFilters.New === nameCategory) {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: '',
        viewsSort: '',
        durationSort: '',
        dateSort: -1,
      });
    } else {
      setQueryParams({
        ...query,
        activeCategory: nameCategory,
        page: 0,
        likesSort: '',
        viewsSort: '',
        durationSort: '',
        dateSort: '',
      });
    }
  }
};

export default chooseCategory;
