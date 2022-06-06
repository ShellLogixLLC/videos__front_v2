import axios from 'axios';

import {ApiServiceOptionsTypes, ApiServiceParamsTypes} from '~/types';

import {defaultOptions} from '../client';

const axiosInstance = axios.create({
  baseURL: defaultOptions.baseURL,
});

const ApiService = {
  get: async <T>(
    path: string,
    params?: ApiServiceParamsTypes,
    options?: ApiServiceOptionsTypes,
  ): Promise<T> => {
    const {data} = await axiosInstance.get<T>(path, {
      params,
      ...options,
    });
    return data;
  },
};

export default ApiService;
