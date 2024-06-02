const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: function (config, env) {
    config.entry = {
      main: path.resolve(__dirname, 'src/index.tsx'),
      background: path.resolve(__dirname, 'src/background.ts'),
      login: path.resolve(__dirname, 'src/login.ts'),
    };

    config.output = {
      ...config.output,
      filename: 'static/js/[name].js',
    };

    if (env === 'development') {
      config.plugins = config.plugins.filter(
        (plugin) => !(plugin instanceof webpack.HotModuleReplacementPlugin)
      );
    }

    config.optimization = {
      splitChunks: {
        cacheGroups: {
          default: false,
        },
      },
    };

    return config;
  },
};