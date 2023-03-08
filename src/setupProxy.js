const { createProxyMiddleware } = require('http-proxy-middleware');

function target() {
  switch (process.env.REACT_APP_BACKEND) {
    case 'staging':
      return 'https://courseup.vikelabs.dev/';
    case 'production':
      return 'https://courseup.vikelabs.ca/';
    case 'local':
      return 'http://localhost:3001';
    case 'nextjs':
      return 'http://localhost:3000/api/v0';
    default:
      return 'https://courseup.vikelabs.dev/';
  }
}

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: target(),
      changeOrigin: true,
      pathRewrite:
        process.env.REACT_APP_BACKEND === 'local' || process.env.REACT_APP_BACKEND === 'nextjs'
          ? {
              [`^/api`]: '',
            }
          : undefined,
    })
  );
};
