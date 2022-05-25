import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IUseUsersReturn, ICategory, IVideoByCategory} from './types';

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

const useCategoryById = (
  activeVCategoryId?: string | string[] | undefined,
): ICategory => {
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

const useVideosByCategoryId = (
  limit: number,
  offset: number,
  activeVCategoryId: string | string[] | undefined,
): IVideoByCategory => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.CategoryService.getVideoByCategoryId(),
    params: {
      limit,
      offset,
      categoryIds: [activeVCategoryId],
    },
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

const CategoryService = {
  useCategories,
  useCategoryById,
  useVideosByCategoryId,
};

export default CategoryService;
