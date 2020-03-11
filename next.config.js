const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/tab/api': { page: '/tab/[tab]' },
      '/tab/bot': { page: '/tab/[tab]' },
    };
  },
  distDir: 'build',
};
