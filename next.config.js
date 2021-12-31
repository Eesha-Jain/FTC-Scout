const webpack = require('webpack')

const isProd = (process.env.NODE_ENV || 'production') === 'production'

const publicUrl = isProd ? 'https://ftcscout.everstem.org/' : 'http://localhost:3000'

module.exports = {
  images: {
    loader: 'custom'
  },
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  assetPrefix: '',
  basePath: '',
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(''),
        'process.env.PUBLIC_URL': JSON.stringify(publicUrl)
      }),
    )

    return config
  },
}