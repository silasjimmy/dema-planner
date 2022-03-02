module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Dema',
    themeColor: '#4CAF50',
    // msTileColor: '#000000',
    // appleMobileWebAppCapable: 'yes',
    // appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
  }
}
