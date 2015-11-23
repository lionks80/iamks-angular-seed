module.exports = {
	"path_src" : "app_src",
	"path_dev" : "app_dev",
	"path_build" : "app_build",
	"index_dev" : {
		"styles" : [
			"assets/bootstrap/css/bootstrap.css",
			"assets/bootstrap/css/bootstrap-theme.css",
			"assets/font-awesome/css/font-awesome.css",
			"css/style.css"
		],
		"scripts" : [
			"assets/jquery/jquery.js",
			"assets/bootstrap/js/bootstrap.js",
			"js/ie10-viewport-bug-workaround.js",
			"assets/angular/angular.js",
			"assets/angular-route/angular-route.js",
			"assets/angular-cookies/angular-cookies.js",		
			"ngApp.js", 
			"templates-app.js", 
			"//localhost:35729/livereload.js"
		]
	},
	"index_build" : {
		"styles" : [
			"assets/bootstrap/css/bootstrap.min.css",
			"assets/bootstrap/css/bootstrap-theme.min.css",
			"assets/font-awesome/css/font-awesome.min.css",
			"css/style.min.css"
		],
		"scripts" : [
			"assets/jquery/jquery.min.js",
			"assets/bootstrap/js/bootstrap.min.js",
			"js/ie10-viewport-bug-workaround.min.js",
			"assets/angular/angular.min.js",
			"assets/angular-route/angular-route.min.js",
			"assets/angular-cookies/angular-cookies.min.js",
			"ngApp.min.js", 
			"templates-app.min.js"
		]
	}
};
		