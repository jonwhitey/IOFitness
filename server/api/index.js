const publicApi = require('./public');
const customerApi = require('./customer');
const adminApi = require('./admin');
const authRoutesApi = require('./authRoutes');

function api(server) {
  server.use('/api/v1/public', publicApi);
  server.use('/api/v1/customer', customerApi);
  server.use('/api/v1/admin', adminApi);
  server.use('/api/v1/auth', authRoutesApi);
}

module.exports = api;
