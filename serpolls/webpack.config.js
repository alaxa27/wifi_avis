const path = require('path')

const config = {
    entry: ['babel-polyfill', './surveys/static/js/app.js'],
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
                    presets: ['es2015'],
                    plugins: [
                        ["transform-custom-element-classes"],
                    ],
                }
            }
        ]
    }
}

module.exports = config