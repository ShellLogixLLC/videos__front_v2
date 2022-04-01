import cookie from 'js-cookie';

import {Route} from '~/constants';

import {Process} from './types';

declare const process: Process;

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: Route.Home,
    });
  }
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};
