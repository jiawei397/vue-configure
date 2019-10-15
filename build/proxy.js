// const ip = 'http://192.168.10.226:1662';
// const ip = 'http://192.168.21.34:1642';
const ip = 'http://192.168.1.121:1662';
// const ip = 'http://192.168.21.34:1652';

module.exports = {
  '/dcv-api/': {
    target: ip,
    pathRewrite: {'^/dcv-api': '/tarsier-dcv/dcv'},
  },
  '/tarsier-dcv/': {
    target: ip,
  },
  '/auth/': {
    target: ip,
    pathRewrite: { '^/auth': '/tarsier-dcv/dcvWeb/auth' },
  },
};
