const path = require('path');

const {i18n} = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src/styles')],
    prependData: `@import "resources.scss";`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: {and: [/\.(js|ts|md)x?$/]},
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {plugins: [{removeViewBox: false}]},
          },
        },
      ],
    });

    return config;
  },
};
