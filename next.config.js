const path = require('path');

const {i18n} = require('./next-i18next.config');

module.exports = {
  i18n,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src/styles')],
    prependData: `@import "resources.scss";`,
  },

  experimental: {
    outputFileTracingRoot: path.join(__dirname, '/public/locales'),
    nftTracing: true,
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
