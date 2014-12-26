'use strict';


module.exports = function less(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-less');

    // Options
    return {
        build: {
            options: {
                yuicompress: true,
                paths: ['public/css']
            },
            files: {
                'public/css/master.css': 'public/css/master.less',
                'public/css/global.css': 'public/css/global.less',
                'public/css/map.css': 'public/css/map.less',
            }
        }
    };
};
