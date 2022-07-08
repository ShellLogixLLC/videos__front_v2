const path = require('path');

const ChainedBackend = require('i18next-chained-backend').default;

const isWindowUndefined = typeof window !== 'undefined';

module.exports = {
  strict: true,
  react: {useSuspense: false},
  interpolation: {
    prefix: '{{',
    suffix: '}}',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
  serializeConfig: false,
  use: isWindowUndefined ? [ChainedBackend] : [],
  localePath: path.resolve('./public/locales'),
};
