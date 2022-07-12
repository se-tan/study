const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '',
  devServer: {
    port: 5000,
  },
  transpileDependencies: [
    'vuetify'
  ]
})
