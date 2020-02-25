module.exports = (grunt) => {
    const pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        'extract-comments': {
            'docs/comments.js': ['src/**/*.ts']
        },
        copy: {
            files: {
                expand: true,
                cwd: 'dist',
                src: ['angularjs-value-editor.js', 'angularjs-value-editor.css'],
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
                                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.7/angular.js',
                                'https://unpkg.com/@kpsys/angularjs-register@1.1.4/dist/register.js',
                                'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.2/ace.js',
                                'https://unpkg.com/angular-ui-ace@0.2.3/src/ui-ace.js',
                                'https://unpkg.com/luxon@1.22.0/build/global/luxon.min.js',
                                'https://unpkg.com/@kpsys/angularjs-date-parser@1.1.2/dist/angularjs-date-parser.js',
                                'https://unpkg.com/@kpsys/angularjs-bootstrap-datetimepicker@2.1.1/dist/angularjs-bootstrap-datetimepicker.js',
                                'https://unpkg.com/@kpsys/angular-ui-bootstrap@2.5.5/dist/ui-bootstrap-tpls.js',
                                'https://unpkg.com/angular-sanitize@1.7.9/angular-sanitize.js',
                                'https://unpkg.com/ui-select@0.19.8/dist/select.js',
	                            `${process.env.EXAMPLES_SCRIPTS_URL_PREFIX || ''}/angularjs-value-editor.js`
                            ],
                            stylesheets: [
                                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                                'https://unpkg.com/@kpsys/angular-ui-bootstrap@2.5.5/dist/ui-bootstrap-csp.css',
                                'https://unpkg.com/@kpsys/angularjs-bootstrap-datetimepicker@2.1.1/dist/angularjs-bootstrap-datetimepicker.css',
                                'https://unpkg.com/ui-select@0.19.8/dist/select.css',
                                `${process.env.EXAMPLES_SCRIPTS_URL_PREFIX || ''}/angularjs-value-editor.css`
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

    grunt.registerTask('docs:build', ['extract-comments', 'copy', 'dgeni-alive']);
    grunt.registerTask('docs:watch', ['watch']);
};
