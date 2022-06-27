const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;

const path = require('path');
// const {REACT_PRODUCTION} = process.env;

// const isLocal = REACT_PRODUCTION === 'local';

const EXPIRATION = process.env.REACT_APP_EXPIRATION_DATE;

module.exports = {
  strict: true,
  backend: {
    backendOptions: [{expirationTime: +EXPIRATION}],
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
    localePath: path.resolve('./public/locales'),
  },
  serializeConfig: false,
  use: typeof window !== 'undefined' ? [ChainedBackend] : [],
  localePath: path.resolve('./public/locales'),
};
