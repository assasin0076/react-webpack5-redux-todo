const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let path = require('path');

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
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]',
                            },

                        }
                    }
                ]
            },
            {
                test: /^((?!\.module).)*css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            //main.css
            filename: 'main.css'
        })
    ],
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
    let isProd = options.mode === 'production';
    conf.devtool = isProd ? 'source-map' : 'eval-cheap-module-source-map';
    conf.target = isProd ? 'browserslist' : 'web';

    return conf;
};