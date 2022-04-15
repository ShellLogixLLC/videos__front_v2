import axios from 'axios';

import {defaultOptions} from '../client';

const axiosInstance = axios.create({
  baseURL: defaultOptions.baseURL,
});

const ApiService = {
  get: async <T>(path: string): Promise<T> => {
    const {data} = await axiosInstance.get<T>(path);

    return data;
  },
};

export default ApiService;
