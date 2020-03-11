const prefix = process.env.URL_PREFIX || '';

console.log('[D] prefix: ', prefix);

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
  distDir: 'build',
  assetPrefix: prefix,
  env: {
    PREFIX: prefix,
  },
};
