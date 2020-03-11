const isProd = process.env.NODE_ENV === 'production';

console.log('[D] isProd: ', isProd);

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/tab/api': { page: '/tab/[tab]' },
      '/tab/bot': { page: '/tab/[tab]' },
    };
  },
  assetPrefix: isProd ? '/neurojam' : '',
};
