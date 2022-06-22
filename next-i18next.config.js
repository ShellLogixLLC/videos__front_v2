const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;

const EXPIRATION = process.env.REACT_APP_EXPIRATION_DATE;

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
