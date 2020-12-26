module.exports = {
  // https://github.com/vercel/next.js/issues/8454#issuecomment-560432659
  pageExtensions: ['page.tsx'],
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    Object.assign(config, {
      target: 'electron-renderer',
    })
    return config
  },
}
