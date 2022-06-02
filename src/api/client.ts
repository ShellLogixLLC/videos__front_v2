import axios from 'axios';

import {getCookieFromBrowser} from '~/libraries';
// import * as cookie from 'cookie';
// import * as setCookie from 'set-cookie-parser';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const defaultOptions = {
  baseURL: 'https://obscure-harbor-76716.herokuapp.com/api',
};

const api = axios.create(defaultOptions);

api.interceptors.request.use((config) => {
  const token = getCookieFromBrowser('token');

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default api;
