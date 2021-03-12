import * as path from 'path';

import {babelLoader, tsLoaderFactory} from './webpack-loaders';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as pkg from './package.json';

module.exports = (env, {mode}) => ({
    mode: 'none',

    entry: mode === 'production' ? {
        'angularjs-value-editor.min': ['./src/value-editor/value-editor.module.ts']
    } : {
        'angularjs-value-editor': ['./src/value-editor/value-editor.module.ts']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
            name: pkg.name,
            type: 'umd'
        },
    },

    externals: {
        angular: 'angular',
        '@kpsys/angularjs-register': '@kpsys/angularjs-register',
        'angular-ui-ace': 'angular-ui-ace',
        'luxon': 'luxon',
        '@kpsys/angular-ui-bootstrap': '@kpsys/angular-ui-bootstrap',
        '@kpsys/angularjs-date-parser': '@kpsys/angularjs-date-parser',
        '@kpsys/angularjs-bootstrap-datetimepicker': '@kpsys/angularjs-bootstrap-datetimepicker',
        'angular-sanitize': 'angular-sanitize',
        'ui-select': 'ui-select',
        '@kpsys/angularjs-histogram-slider': '@kpsys/angularjs-histogram-slider'
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
                include: [/src/, /test/],
                use: [
                    babelLoader,
                    tsLoaderFactory('tsconfig.frontend.json')
                ]
            },
            {
                test: /(\.less$)|(\.css$)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
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
                ]
            },
            {
                test: /(\.sass$)|(\.scss$)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.tpl.pug$/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, 'src')
                        }
                    },
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader'
                    }
                ]
            },
            {
                test: /\.tpl.html$/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, 'src')
                        }
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.woff/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                templates: {
                    test: isTemplate,
                    name: `angularjs-value-editor.templates${mode === 'production' ? '.min' : ''}`,
                    chunks: 'all'
                }
            }
        }
    },

    devtool: 'source-map',

    plugins: (() => {
        const plugins = [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new CleanWebpackPlugin({
                verbose: true,
                cleanStaleWebpackAssets: false
            })];
       /* TODO: UnminifiedWebpackPlugin has a bug...
        if (mode === 'production') {
            plugins.push(new UnminifiedWebpackPlugin());
        }*/

        return plugins;
    })()
});

function isTemplate({resource}) {
    return resource &&
        resource.match(/((\.tpl\.(pug|html))|(\.svg))$/);
}
