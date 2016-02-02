	var gulp = require('gulp')
		, fs = require('fs-extra')
		, inject = require('gulp-inject')
		, sass = require('gulp-ruby-sass')
		, cssmin = require('gulp-minify-css')
		, sequence = require('run-sequence')
		, wiredep = require('wiredep').stream
		, open = require('gulp-open')
		, connect = require('gulp-connect')
		, concat = require('gulp-concat')
		, uglify = require('gulp-uglify')
		, rename = require('gulp-rename')
		, angularFilesort = require('gulp-angular-filesort')
		, jshint = require('gulp-jshint')
		, stylish = require('jshint-stylish')
		, util = require('util')
		, shell = require('gulp-shell')
		, plugins = require('gulp-load-plugins')();;

	var filesToInject = [
		'./app/**/*.js', 
		'./app/**/*.css'
	];

	gulp.task('default', function(){
		console.log('ROSETTA BOILERPLATE'.red.bold);
	});

	/*gulp.task('wiredep', function(cb){
	  gulp.src('./index.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('.'));
	    //console.log('done running wire'.green.bold)
	});*/

	//custom JavaScript and CSS
	/*gulp.task('inject', function (){
	  var target = gulp.src('./index.html');
	  var sources = gulp.src(filesToInject, {read: false});
	  return target.pipe(inject(sources))
	    .pipe(gulp.dest('.'));
	});
	*/
	/*gulp.task('wire',  function(callback){
		sequence('wiredep', 'inject', callback);
	});*/


	gulp.task('wire', function(){
	  gulp.src('./index.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('.'));
	});

	var filesToInject = ['./app/**/*.js', './app/**/*.css'];
	//i've replaced this task with angularFilesort below
	//I think that the syntax is much clearer
	//TODO remove this and fix the wire-inject task to use `sort`
	gulp.task('inject', function (){
	  var target = gulp.src('./index.html');
	  var sources = gulp.src(filesToInject, {read: false});
	  return target.pipe(inject(sources))
	    .pipe(gulp.dest('.'));
	});

	gulp.task('wire-inject',  function(callback){
	    sequence('wire', 'inject', callback);
	});

	gulp.task('sort', function(){
		gulp.src('./index.html')
	  	.pipe(inject(
	    	gulp.src(['./app/**/*.js']).pipe(angularFilesort())
	  	))
	  	.pipe(gulp.dest('.'));
	});


	gulp.task('sass', function() {
	    return sass('./app/styles/sass/**/*.scss', { style: 'expanded' })
	        .pipe(gulp.dest('./app/styles/css/'));
	});

	gulp.task('watch-sass', function () {
	    gulp.watch('./app/styles/sass/*.scss', ['sass']);
	});


	gulp.task('start-server', false, function(callback){
		exec('node server.js', function(){
			callback();
		});
	});

	/* opens the chrome browser to the location of the static server */

/*	gulp.task('open', function(){
	  gulp.src('http://0.0.0.0:8888/')
	  .pipe(open());
		gulp.src('')
		.pipe(open({app: 'google-chrome', uri: './index.html'}));	  
	});*/
gulp.task('open', function(){
  gulp.src('')
  .pipe(open({app: 'google chrome', uri:'http://0.0.0.0:8888/'}));
});



	gulp.task('connect', function () {
	    return connect.server({
	        root: ".server.js",
	        port: '8888'
	    });
	});

	gulp.task('launch', function(callback){
		sequence('connect', 'browser-open', callback);
	});

gulp.task('hint', function(){
  return gulp.src('./app/**/*.js')
    .pipe(jshint({laxcomma: true}))
    .pipe(jshint.reporter(stylish));
});











