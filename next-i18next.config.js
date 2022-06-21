// // const path = require('path');
//
// module.exports = {
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en', 'ru'],
//   },
//   react: {useSuspense: false},
//   interpolation: {
//     prefix: '{',
//     suffix: '}',
//   },
//   localeStructure: '{lng}/{ns}',
//   // localePath: path.resolve('./public/locales'),
// };

const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;
const LocalStorageBackend = require('i18next-localstorage-backend').default;

module.exports = {
  backend: {
    backendOptions: [{expirationTime: 365 * 24 * 60 * 60 * 1000}], // 1 hour
    backends:
      typeof window !== 'undefined' ? [LocalStorageBackend, HttpBackend] : [],
  },
  react: {useSuspense: false},
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
  serializeConfig: false,
  use: typeof window !== 'undefined' ? [ChainedBackend] : [],
};
