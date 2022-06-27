const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;

const path = require('path');

// const EXPIRATION = process.env.REACT_APP_EXPIRATION_DATE;

module.exports = {
  strict: true,
  backend: {
    // backendOptions: [{expirationTime: +EXPIRATION}], // 1 hour
    backends: typeof window !== 'undefined' ? [HttpBackend] : [],
  },
  react: {useSuspense: false},
  interpolation: {
    prefix: '{{',
    suffix: '}}',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: false,
    localePath: path.resolve('./public/static/locales'),
  },
  serializeConfig: false,
  use: typeof window !== 'undefined' ? [ChainedBackend] : [],
  localePath: path.resolve('./public/static/locales'),
};
