import axios, {AxiosRequestConfig} from 'axios';

import {getCookieFromBrowser} from '~/libraries';

export const defaultOptions = {
  baseURL: 'https://obscure-harbor-76716.herokuapp.com/api',
};

const api = axios.create(defaultOptions);

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const lng = getCookieFromBrowser('activeLang');
  const token = getCookieFromBrowser('token');

  config.params = {lng, ...config.params};
  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default api;
