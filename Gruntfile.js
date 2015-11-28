'use strict';

var path = require('path');

var theme = require('./index.js');

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

exports = module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['Gruntfile.js']
		},

		stylus: {
			compile: {
				options: {
					compress: false,
					// paths: ['path/to/import', 'another/to/import'],
					// urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
					use: theme.dependencies
				},
				files: {
					'dist/app.css': 'css/vizboom.styl'
				}
			}
		},

		clean: {
			build: ['dist']
		},

		connect: {
			server: {
				options: {
					port: 3000,
					middleware: function(connect) {
						return [
							lrSnippet,
							folderMount(connect, 'static'),
							folderMount(connect, 'dist')
						].concat((theme.assetPaths || []).map(function (assetPath) {
							return folderMount(connect, assetPath);
						}));
					}
				}
			}
		},

		open: {
			server: {
				path: 'http://localhost:3000'
			}
		},

		regarde: {
			pub: {
				files: ['static/**/*', 'dist/**/*', 'assets/**/*'],
				tasks: ['livereload']
			},
			stylus: {
				files: 'css/**/*.styl',
				tasks: 'stylus'
			}
			
		},
	});

	// Default task.
	grunt.registerTask('default', ['clean', 'stylus', 'livereload-start', 'connect', 'open', 'regarde']);
};
