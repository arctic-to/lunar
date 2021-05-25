module.exports = {
  // https://github.com/vercel/next.js/issues/8454#issuecomment-560432659
  pageExtensions: ['page.tsx'],
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.target = 'electron-renderer'
    return config
  },
  images: {
    domains: ['p1.music.126.net', 'p2.music.126.net'],
  },
}
