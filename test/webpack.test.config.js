const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = ({
    mode: 'development',

    externals: {
        angular: 'angular',

        '@kpsys/angular-ui-bootstrap': {
            commonjs: '@kpsys/angular-ui-bootstrap',
            commonjs2: '@kpsys/angular-ui-bootstrap',
            amd: '@kpsys/angular-ui-bootstrap',
            root: '@kpsys/angular-ui-bootstrap'
        }
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                include: [/src/],
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                include: [/(src)|(test)/],
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
                            onlyCompileBundledFiles: true
                        }
                    }
                ]
            },
            {
                test: /\.(js|ts)$/,
                enforce: 'post',
                loader: 'istanbul-instrumenter-loader',
                exclude: [/(test|node_modules)/],
                query: {
                    esModules: true
                }
            },
            {
                test: /(\.less$)|(\.css$)/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
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

    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            utils: path.resolve(__dirname, 'utils')
        }
    },

    devtool: 'inline-source-map'
});