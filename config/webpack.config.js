const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');


const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template : "./src/client/index.html",
    filename : "./index.html"
});

module.exports = {
    entry : ['babel-polyfill',"./src/client/index.js"],
    output : {
        path : path.resolve('dist'),
        filename : '[name].js'
    },
    module : {
        rules: [
            {
                test: /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader"
                }
            },
            {
                test : /\.css$/,
                use : ["style-loader","css-loader"]
            }
        ]
    },
    plugins : [htmlWebPackPlugin]
};