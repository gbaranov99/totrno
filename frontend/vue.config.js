module.exports = {
  chainWebpack: config => {
    config.plugins
      .delete('split-manifest')
      .delete('inline-manifest')
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
