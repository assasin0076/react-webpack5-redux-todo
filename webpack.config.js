const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let path = require('path');
const isProd = process.env.NODE_ENV === 'production';



let conf = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        //main.js
        filename: 'main.js',
        publicPath: '/dist/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
            },
            {
                test: /(\w)*\.module\.(sa|sc|c)ss$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]',
                            },

                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /^((?!\.module).)*(sa|sc|c)ss$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader']
            },

        ]
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 name: 'chunk-vendors',
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10,
    //                 chunks: 'initial'
    //             },
    //             common: {
    //                 name: 'chunk-common',
    //                 minChunks: 2,
    //                 priority: -20,
    //                 chunks: 'initial',
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // }
};
module.exports = (env, options) => {
    conf.devtool = isProd ? 'source-map' : 'eval-cheap-module-source-map';
    conf.target = isProd ? 'browserslist' : 'web';
    const plugins = [];
    if (!isProd) {
        // enable in production only
        plugins.push(new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }));
    }
    conf.plugins = plugins;


    return conf;
};