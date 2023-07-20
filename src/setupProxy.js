const { createProxyMiddleware } = require('http-proxy-middleware');

function target() {
  switch (process.env.REACT_APP_BACKEND) {
    case 'staging':
      return 'https://courseup.vikelabs.dev/';
    case 'production':
      return 'https://courseup.vikelabs.ca/';
    case 'local':
      return 'http://localhost:3001';
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
        process.env.REACT_APP_BACKEND === 'local'
          ? {
              [`^/api`]: '',
            }
          : undefined,
    })
  );

  app.use(
    '/rmp',
    createProxyMiddleware({
      target: 'https://www.ratemyprofessors.com/graphql/',
      changeOrigin: true,
      headers: {
        Authorization: `Bearer dGVzdDp0ZXN0`,
        'Content-Type': 'application/json',
      },
    })
  );
};
