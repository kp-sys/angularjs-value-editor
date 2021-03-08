import * as path from 'path';

export const babelLoader = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        plugins: [
            'angularjs-annotate',
            '@babel/plugin-proposal-class-properties'
        ],
        presets: ['@babel/preset-env']
    }
};

export const tsLoader = {
    loader: 'ts-loader',
    options: {
        configFile: path.resolve(__dirname, 'tsconfig.frontend.json')
    }
};
