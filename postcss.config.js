module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 8192, name: 'img/[name].[ext]' }));
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
