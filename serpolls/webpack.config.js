const path = require('path')

const config = {
    entry: './surveys/static/js/app.js',
    output: {
        path: path.resolve('./surveys/static/js/dist'),
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'app'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}

module.exports = config