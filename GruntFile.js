module.exports = (grunt) => {
    const pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        'extract-comments': {
            'dist/docs/comments.js': ['src/**/*.ts']
        },
        copy: {
            files: {
                expand: true,
                cwd: 'dist',
                src: ['angularjs-value-editor.js', 'angularjs-value-editor.css'],
                dest: 'dist/docs'
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
                    './packages/examples-ext'
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
	                            `${process.env.EXAMPLES_SCRIPTS_URL_PREFIX || ''}/angularjs-value-editor.js`
                            ],
                            stylesheets: [
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
                dest: 'dist/docs',
                src: [
                    'dist/docs/comments.js',
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
