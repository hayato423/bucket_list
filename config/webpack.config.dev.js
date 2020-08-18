const {merge} = require('webpack-merge');
const webpackConfig = require('./webpack.config');


module.exports = merge(webpackConfig, {
    mode : 'development',
    devServer : {
        historyApiFallback : true,
        inline: true,
        open: true,
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            '/api/**': {
                target : 'http://127.0.0.1:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/twitter/auth' : {
                target : 'http://127.0.0.1:3000',
                secure: false,
                logLevel: 'debug'
            }
        },
    }
})