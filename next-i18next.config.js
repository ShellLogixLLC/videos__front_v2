const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;

const EXPIRATION = process.env.REACT_APP_EXPIRATION_DATE;

// const LocalStorageBackend = require('i18next-localstorage-backend').default;

module.exports = {
  backend: {
    backendOptions: [{expirationTime: +EXPIRATION}], // 1 hour
    backends: typeof window !== 'undefined' ? [HttpBackend] : [],
  },
  react: {useSuspense: false},
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
  serializeConfig: false,
  use: typeof window !== 'undefined' ? [ChainedBackend] : [],
};
