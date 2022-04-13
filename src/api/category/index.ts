import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IUseUsersReturn} from './types';

const useCategories = (): IUseUsersReturn => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.CategoryService.getCategories(),
  });

  useEffect(() => {
    if (error) {
      RouterService.pushError();
    }
  }, [error]);

  return {
    isError: !!error,
    data,
    mutateCategories: mutate,
    isLoading: !error && !data,
  };
};

const CategoryService = {
  useCategories,
};

export default CategoryService;
