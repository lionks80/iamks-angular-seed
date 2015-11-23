module.exports = function(grunt) {

	var userBuildConfig = require('./Grunt_build_config.js');

	grunt.initConfig({
		ubc : userBuildConfig,
		pkg : grunt.file.readJSON('package.json'),
		meta : {
			banner : "'use strict';\n" + '/**\n' + ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + ' */\n'
		},
		clean : {
			// 개발 디렉토리 삭제
			dev : ['<%= ubc.path_dev %>'],
			// 빌드 디렉토리 삭제
			build : ['<%= ubc.path_build %>']
		},
		jshint : {
			options : {
				curly : true,
				immed : true,
				newcap : true,
				noarg : true,
				sub : true,
				boss : true,
				eqnull : true,
				force : true,
				reporter : require('jshint-stylish')
			},
			src : ['<%= ubc.path_src %>/**/*.js'],
			gruntfile : ['Gruntfile.js'],
			globals : {
				"$" : false,
				"jquery" : false,
				"angular" : false
				// other explicit global names to exclude
			}
		},
		copy : {
			// index.html 과 angularjs 하위 폴더 및 파일을 제외한 나머지 파일들을 복사
			dev_files : {
				files : [{
					expand : true,
					cwd : '<%= ubc.path_src %>/',
					src : ['**/*', '!index.html', '!ngApp/**', '!js/**/*.js', '!css/**/*.css'],
					dest : '<%= ubc.path_dev %>/',
					filter : 'isFile'
				}]
			},
			dev_js : {
				files : [{
					expand : true,
					cwd : '<%= ubc.path_src %>/',
					src : ['js/**/*.js'],
					dest : '<%= ubc.path_dev %>/',
					filter : 'isFile'
				}]
			},
			dev_css : {
				files : [{
					expand : true,
					cwd : '<%= ubc.path_src %>/',
					src : ['css/**/*.css'],
					dest : '<%= ubc.path_dev %>/',
					filter : 'isFile'
				}]
			},
			// dev index.html 생성
			dev_index : {
				src : '<%= ubc.path_src %>/index.html',
				dest : '<%= ubc.path_dev %>/index.html',
				options : {
					process : function(content, srcpath) {
						return grunt.template.process(content, {
							data : userBuildConfig.index_dev
						});
					},
				}
			},
			// index.html 과 angularjs 하위 폴더 및 파일 그리고 js안의 모든 js, css 안에 모든 css 파일을 제외한 모든 파일 복사
			build_files : {
				files : [{
					expand : true,
					cwd : '<%= ubc.path_src %>/',
					src : ['**/*', '!index.html', '!ngApp/**', '!js/**/*.js', '!css/**/*.css'],
					dest : '<%= ubc.path_build %>/',
					filter : 'isFile'
				}]
			},
			// build index.html 생성
			build_index : {
				src : '<%= ubc.path_src %>/index.html',
				dest : '<%= ubc.path_build %>/index.html',
				options : {
					process : function(content, srcpath) {
						return grunt.template.process(content, {
							data : userBuildConfig.index_build
						});
					},
				}
			}
		},
		html2js : {
			// angularjs html 를 템플릿으로 생성
			dev_templates : {
				options : {
					module : 'templates-app',
					base : '<%= ubc.path_src %>/ngApp'
				},
				src : ['<%= ubc.path_src %>/ngApp/**/*.html'],
				dest : '<%= ubc.path_dev %>/templates-app.js'
			}
		},
		concat : {
			// angularjs app 파일을 1개로 합침
			dev_ngApp : {
				src : ['<%= ubc.path_src %>/ngApp/**/*.js'],
				dest : '<%= ubc.path_dev %>/ngApp.js'
			}
		},
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			build_js : {
				// 개발 디렉토리에서 js 디렉토리 안의 모든 js 파일을  빌드 폴더에 uglify 한다.
				files : [{
					expand : true, // Enable dynamic expansion.
					cwd : '<%= ubc.path_dev %>/', // Src matches are relative to this path.
					src : ['js/**/*.js'], // Actual pattern(s) to match.
					dest : '<%= ubc.path_build %>/', // Destination path prefix.
					ext : '.min.js', // Dest filepaths will have this extension.
					extDot : 'last' // Extensions in filenames begin after the first dot
				}]
			},
			build_angularjs : {
				// 개발디렉토리의 ngApp.js 과 templates-app.js 빌드 디렉토리에 uglify 한다.
				files : [{
					expand : true, // Enable dynamic expansion.
					cwd : '<%= ubc.path_dev %>/', // Src matches are relative to this path.
					src : ['ngApp.js', 'templates-app.js'], // Actual pattern(s) to match.
					dest : '<%= ubc.path_build %>/', // Destination path prefix.
					ext : '.min.js', // Dest filepaths will have this extension.
					extDot : 'last' // Extensions in filenames begin after the first dot
				}]
			}
		},
		cssmin : {
			// 개발 디렉토리 중 css 디렉토리 안의 모든css 파일을  빌드 폴더에 uglify 한다.
			build_css : {
				files : [{
					expand : true,
					cwd : '<%= ubc.path_dev %>/',
					src : ['css/**/*.css'],
					dest : '<%= ubc.path_build %>/',
					ext : '.min.css', // Dest filepaths will have this extension.
					extDot : 'last'
				}]
			}
		},
		connect : {
			server : {
				options : {
					port : 8000,
					hostname : '*',
					onCreateServer : function(server, connect, options) {
						console.log(server + ': ' + server + ': ' + connect + ': ' + options);
					}
				}
			}
		},
		watch : {
			options : {
				livereload : true,
			},
			watch_files : {
				files : [
					'<%= ubc.path_src %>/**/*', 
					'!<%= ubc.path_src %>/index.html', 
					'!<%= ubc.path_src %>/ngApp/**/*', 
					'!<%= ubc.path_src %>/js/**/*.js', 
					'!<%= ubc.path_src %>/css/**/*.css'
				],
				// files : ['<%= ubc.path_src %>/**/*', '<%= ubc.path_src %>/!index.html', '!<%= ubc.path_src %>/ngApp/*', '!<%= ubc.path_src %>/ngApp/**/*', '!<%= ubc.path_src %>/js/**.js', '<%= ubc.path_src %>/!**/*.css'],
				tasks : ['copy:dev_files', 'copy:build_files'],
			},
			watch_index : {
				files : ['<%= ubc.path_src %>/index.html'],
				tasks : ['copy:dev_index', 'copy:build_index'],
			},
			watch_js : {
				files : ['<%= ubc.path_src %>/js/**/*.js'],
				tasks : ['copy:dev_js', 'uglify:build_js'],
			},
			watch_css : {
				files : ['<%= ubc.path_src %>/css/**/*.css'],
				tasks : ['copy:dev_css', 'cssmin:build_css'],
			},
			ngApp_html : {
				files : ['<%= ubc.path_src %>/ngApp/**/*.html'],
				tasks : ['html2js', 'uglify:build_angularjs'],
			},
			ngApp_js : {
				files : ['<%= ubc.path_src %>/ngApp/**/*.js'],
				tasks : ['concat', 'uglify:build_angularjs'],
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-html2js');

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'jshint', 'copy', 'html2js', 'concat', 'uglify', 'cssmin']);
	grunt.registerTask('build-watch', ['build', 'watch']);
	grunt.registerTask('build-server', ['build', 'connect', 'watch']);

	// grunt.registerTask('watch-server', ['build', 'connect', 'watch']);

};
