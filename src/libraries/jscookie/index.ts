import cookie from 'js-cookie';
import {GetServerSidePropsContext} from 'next';

import {Route} from '~/constants';

import {IProcess} from './types';

declare const process: IProcess;

export const setCookie = (key: string, value: string): void => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: Route.Home,
    });
  }
};

export const removeCookie = (key: string): void => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookieFromBrowser = (key: string): string => {
  return cookie.get(key) as string;
};

export const getCookieFromContext = (
  ctx: GetServerSidePropsContext<any>,
): string | undefined =>
  ctx.req.headers.cookie
    ?.split(';')
    .find((cookie) => cookie.includes('token'))
    ?.replace('token=', '');
