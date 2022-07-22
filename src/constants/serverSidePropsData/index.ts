import {Redirect} from 'next';

import Route from '../route';
import {LocaleKeys} from '../locales';

export const getProtectedPageRedirect = (
  locale: LocaleKeys,
): {redirect: Redirect} => {
  return {
    redirect: {
      permanent: false,
      destination: `/${locale}${Route.Error}`,
    },
  } as const;
};

export const EmptyProps = {
  props: {},
} as const;

export const NotFound = {
  notFound: true,
} as const;
