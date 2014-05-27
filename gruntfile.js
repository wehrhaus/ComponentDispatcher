'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // stylus options
    var pkg = grunt.file.readJSON('package.json'),
        pkgName = pkg.name;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                nospawn: false
            },
            jshint: {
                files: [
                    '*.js'
                ],
                tasks: [ 'jshint' ]
            },
            dev: {
                files: [
                    '**/*.html',
                    '**/*.js'
                ],
                tasks: [ 'jshint' ],
                options: { livereload: true }
            }
        },

        jshint: {
            options: {
                jshintrc: 'config/.jshintrc'
            },
            all: [
                '*.js'
            ]
        }

    });

    /*
     * Default task override
     * Use one of the tasks below
     */
    grunt.registerTask('default', function () {
        console.log('\nPlease run one of the following tasks:\n');
        console.log('//***** grunt dev *****//\nWatch JavaScript Files for changes\nOn javascript changes, run jshint\nOn any changes, including html, reload the page on save\n');
        console.log('//***** grunt jsdev *****//\nRun jshint on javascript files\n');
    });

    /*
     * Watch Stylus and JavaScript Files for changes
     * - On stylus changes, compile to css then run csslint
     * - On javascript changes, run jshint
     */
    grunt.registerTask('dev', function () {
        console.log('for ' + pkgName + '.');
        grunt.task.run([ 'watch:dev' ]);
    });

    /*
     * Run jshint on javascript files
     */
    grunt.registerTask('jsdev', function () {
        console.log('for ' + pkgName + '.');
        grunt.task.run([ 'watch:jshint' ]);
    });

};
