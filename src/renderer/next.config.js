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

    // Allow accessing ts enums that is defined outside the root dir of Next.js
    // https://github.com/vercel/next.js/issues/13045#issuecomment-736194943
    fixEnums(config)
    return config
  },
}

function fixEnums(config) {
  config.module.rules.forEach(({ use }, i) => {
    if (!use) return
    const isBabelLoader = Array.isArray(use)
      ? use.findIndex(
          (item) => item && item.loader && item.loader === 'next-babel-loader',
        ) !== -1
      : use.loader === 'next-babel-loader'
    if (isBabelLoader) {
      delete config.module.rules[i].include
    }
  })
}
