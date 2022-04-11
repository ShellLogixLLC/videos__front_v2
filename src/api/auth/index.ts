import {useEffect} from 'react';

import {useAppRequest} from '~/hooks';
import {RouterService} from '~/services';

import endpoints from '../endpoints';

import {IUseUsersReturn} from './types';

const useCategories = (): IUseUsersReturn => {
  const {data, mutate, error} = useAppRequest({
    url: endpoints.AuthService.getCategories(),
  });

  useEffect(() => {
    if (error) {
      RouterService.pushError();
    }
  }, [error]);

  return {
    isError: !!error,
    categories: data,
    mutateUsers: mutate,
    isLoading: !error && !data,
  };
};

const AuthService = {
  useCategories,
};

export default AuthService;
