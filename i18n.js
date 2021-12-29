const path = require('path');

const NextI18Next = require('next-i18next').default;
const {localeSubpaths} = require('next/config').default().publicRuntimeConfig;

module.exports = new NextI18Next({
  defaultLocale: 'en',
  defaultLanguage: 'en',
  otherLanguages: ['en', 'ru'],
  localeSubpaths,
  localePath: path.resolve('./public/locales'),
});
