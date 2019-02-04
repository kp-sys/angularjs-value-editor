const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        'angularjs-value-editor.documentation': ['./docs/angularjs-value-editor.docs.ts']
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'dist', 'docs'),
        library: 'angularjs-value-editor.documentation',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [/src/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                'angularjs-annotate'
                            ],
                            presets: [
                                [
                                    'env',
                                    {
                                        'targets': {
                                            'browsers': [
                                                'last 2 versions',
                                                'not ie < 11 '
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                removeComments: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'null-loader'
            },
            {
                test: /(\.less$)|(\.css$)|(\.sass$)|(\.scss$)/,
                loader: 'null-loader'
            },
            {
                test: /\.html$/,
                loader: 'null-loader'
            },
            {
                test: /\.(gif|png)$/,
                loader: 'null-loader'
            },
            {
                test: /\.(otf|eot|ttf|woff|woff2|svg)$/,
                loader: 'null-loader'
            },
            {
                test: /\.tpl.pug/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, '..', 'src')
                        }
                    },
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader'
                    }
                ]
            }

        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, '..', 'dist', 'docs'),
        historyApiFallback: false,
        port: 3001
    },

    devtool: 'source-map',

    plugins: [
        new WriteFilePlugin(),
        new WebpackShellPlugin({
            onBuildExit: ['npm run docs:grunt']
        })
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: isVendor,
                    name: 'angularjs-value-editor.documentation.vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

function isVendor({resource}) {
    return resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/.js$/);
}