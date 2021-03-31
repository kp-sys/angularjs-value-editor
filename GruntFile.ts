import semanticRelease from 'semantic-release';

module.exports = (grunt) => {
    const pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        'extract-comments': {
            'docs/comments.js': ['src/**/*.ts']
        },
        copy: {
            source: {
                expand: true,
                cwd: 'dist',
                src: ['angularjs-value-editor.min.js', 'angularjs-value-editor.min.css'],
                dest: 'docs'
            },
            demo: {
                expand: true,
                cwd: 'src/docs',
                src: ['demo.html'],
                dest: 'docs'
            }
        },
        watch: {
            files: ['src/**/*.ts', 'src/**/*.ngdoc'],
            tasks: ['docs:build'],
            options: {
                atBegin: true,
                interrupt: true
            }
        },
        'dgeni-alive': {
            options: {
                packages: [
                    'dgeni-packages/jsdoc',
                    'dgeni-packages/ngdoc',
                    'dgeni-packages/links',
                    'dgeni-packages/examples',
                    './packages/jsdoc-ext',
                    './packages/ngdoc-ext',
                    './packages/links-ext',
                    './packages/examples-ext',
                    require('./src/dgeni/packages/ng-constants')
                ],
                deployments: [{
                    name: 'default',
                    examples: {
                        commonFiles: {
                            scripts: [
                                'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.8.7/polyfill.min.js',
                                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.1/angular.js',
                                'https://unpkg.com/@kpsys/angularjs-register/dist/register.js',
                                'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.2/ace.js',
                                'https://unpkg.com/angular-ui-ace/src/ui-ace.js',
                                'https://unpkg.com/luxon/build/global/luxon.min.js',
                                'https://unpkg.com/@kpsys/angularjs-date-parser/dist/angularjs-date-parser.js',
                                'https://unpkg.com/@kpsys/angularjs-bootstrap-datetimepicker/dist/angularjs-bootstrap-datetimepicker.js',
                                'https://unpkg.com/@kpsys/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                                'https://unpkg.com/@kpsys/angularjs-histogram-slider',
                                'https://unpkg.com/angular-sanitize/angular-sanitize.js',
                                'https://unpkg.com/ui-select/dist/select.js',
                                'https://unpkg.com/regenerator-runtime/runtime.js',
                                `${process.env.EXAMPLES_SCRIPTS_URL_PREFIX || ''}/angularjs-value-editor.min.js`
                            ],
                            stylesheets: [
                                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                                'https://unpkg.com/@kpsys/angular-ui-bootstrap@2.5.5/dist/ui-bootstrap-csp.css',
                                'https://unpkg.com/@kpsys/angularjs-bootstrap-datetimepicker/dist/angularjs-bootstrap-datetimepicker.css',
                                'https://unpkg.com/@kpsys/angularjs-histogram-slider/dist/slider.css',
                                'https://unpkg.com/ui-select/dist/select.css',
                                `${process.env.EXAMPLES_SCRIPTS_URL_PREFIX || ''}/angularjs-value-editor.min.css`
                            ]
                        }
                    }
                }],
                deploymentTarget: 'default'
            },
            api: {
                title: 'AngularJS Value Editor Doc',
                version: pkg.version,
                expand: false,
                dest: 'docs',
                src: [
                    'docs/comments.js',
                    'src/**/*.ngdoc'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-extract-comments');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('dgeni-alive');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('get-version', async function getVersion() {
        if (process.env.RELEASE && process.env.RELEASE.toUpperCase() === 'TRUE') {
            const done = this.async();

            try {
                const releaseVersion = await getReleaseVersion(grunt);
                grunt.config.set('dgeni-alive.api.version', releaseVersion);
            } finally {
                done();
            }
        } else {
            grunt.log.writeln('Skipping, to enable version resolving set env variable `RELEASE` to `true`. Also need to be set `GH_TOKEN` env variable.');
        }
    });

    grunt.registerTask('docs:build', ['get-version', 'extract-comments', 'copy', 'dgeni-alive']);
    grunt.registerTask('docs:watch', ['watch']);
};

async function getReleaseVersion(grunt) {
    try {
        // @ts-ignore
        const {nextRelease: {name}} = await semanticRelease({
            branches: [
                'master'
            ],
            dryRun: true
        });

        return name;
    } catch (e) {
        grunt.log.error(`Error in semVer: ${e}`);
    }
}
