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
                'public/css/map.css': 'public/css/map.less',
                'public/css/contacts.css': 'public/css/contacts.less',
                'public/css/navbar.css': 'public/css/navbar.less',
                'public/css/intro.css': 'public/css/intro.less'
            }
        }
    };
};
