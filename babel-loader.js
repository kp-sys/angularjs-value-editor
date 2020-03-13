module.exports.babelLoaderOptions = {
    plugins: [
        'angularjs-annotate'
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: 'last 2 versions, not ie < 11',
                // modules: 'umd'
            }
        ]
    ]
};
