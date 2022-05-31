import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {ICategory} from './types';

const useCategoryById = (activeVCategoryId?: string | string[]): ICategory => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.CategoryService.getCategoryById(activeVCategoryId),
  });

  useEffect(() => {
    if (error) {
      RouterService.pushError();
    }
  }, [error]);

  return {
    isError: !!error,
    data,
    mutate,
    isLoading: !error && !data,
  };
};

export default useCategoryById;
