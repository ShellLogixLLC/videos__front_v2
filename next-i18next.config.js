const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;

// const path = require('path');

// const LocalStorageBackend = require('i18next-localstorage-backend').default;

// const EXPIRATION = process.env.REACT_APP_EXPIRATION_DATE;

module.exports = {
  backend: {
    // backendOptions: [{expirationTime: +EXPIRATION}], // 1 hour
    backends: typeof window !== 'undefined' ? [HttpBackend] : [],
  },
  react: {/*wait: true,*/ useSuspense: false},
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
  serializeConfig: false,
  use: typeof window !== 'undefined' ? [ChainedBackend] : [],
  // localePath: path.resolve('./src/assets/locales'),
};
