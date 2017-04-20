'use strict';

var gulp = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');

gulp.task('make-service-worker', function(callback) {
	var rootDir = 'app';

	swPrecache.write(path.join(rootDir, 'serviceworker.js'), {
		staticFileGlobs: [rootDir + '/**/*.{html,css,png,jpg,gif}',rootDir + '/js/*.js'],
    	stripPrefix: rootDir,
    	importScripts: ['config.js', 'sync.js'],
    	runtimeCaching: [
		{
		    urlPattern: /https:\/\/www\.reddit\.com\/r\/\w{1,255}\.json/,
		    handler: 'networkFirst',
		    options: {
                cache: {
                    name: 'titles'
                }
            }
		}],
		navigateFallback: 'message.html',
	});
});