import axios from 'axios';

import {getCookieFromBrowser} from '~/libraries';

export const defaultOptions = {
  baseURL: 'https://obscure-harbor-76716.herokuapp.com/api',
  // baseURL: 'https://localhost:5000/api/',
};

const api = axios.create(defaultOptions);

api.interceptors.request.use((config) => {
  const token = getCookieFromBrowser('token');

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default api;
