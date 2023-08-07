const getServerConfig = require('./tools/webpack/server.config');
const getClientConfig = require('./tools/webpack/client.config');

const params = {
    mode: 'development',
    publicPath: '/assets/',
};

module.exports = [getServerConfig(params), getClientConfig(params)];
