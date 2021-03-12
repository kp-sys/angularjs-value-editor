import * as path from 'path';

export const babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        plugins: [
            'angularjs-annotate',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime'
        ],
        presets: ['@babel/preset-env']
    }
};

export const tsLoaderFactory = (configFile: string) => ({
    loader: 'ts-loader',
    options: {
        configFile: path.resolve(__dirname, configFile)
    }
});
