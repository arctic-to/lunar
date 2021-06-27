const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  // https://github.com/vercel/next.js/issues/8454#issuecomment-560432659
  pageExtensions: ['page.tsx'],
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.target = 'electron-renderer'

    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
    )
    return config
  },
}
