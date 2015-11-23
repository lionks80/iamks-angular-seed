var ngApp = angular.module('ngApp', ['templates-app', 'ngRoute', 'ngCookies'])
// CONFIG
.config(['$routeProvider', '$httpProvider', '$locationProvider',
function($routeProvider, $httpProvider, $locationProvider) {
	// HTML5 mode False
	$locationProvider.html5Mode(false);
	$routeProvider
	//등록 안된 주소는 404 에러
	.otherwise({
		redirectTo : '/404-error'
	})
	// ROOT Redirect
	.when('/', {
		redirectTo : '/home'
	})
	// HOME
	.when('/home', {
		templateUrl : 'pages/home.tpl.html',
		controller : 'HomeController',
		data : {
			public : true
		}
	})
	// LOGIN
	.when('/login', {
		templateUrl : 'pages/login.tpl.html',
		controller : 'LoginController',
		data : {
			public : true
		}
	})
	//
	.when('/test/test1', {
		templateUrl : 'pages/test/test1.tpl.html',
		controller : 'Test1Controller',
		data : {
			public : true
		}
	})
	//
	.when('/test/test2', {
		templateUrl : 'pages/test/test2.tpl.html',
		controller : 'Test2Controller',
		data : {
			public : true
		}
	})
	//
	.when('/test/test401', {
		templateUrl : 'pages/test/test401.tpl.html',
		controller : 'Test401Controller',
		data : {
			public : false,
			authority : 'USER'
		}
	})
	//
	.when('/test/test405', {
		templateUrl : 'pages/test/test405.tpl.html',
		controller : 'Test405Controller',
		data : {
			public : false,
			authority : 'ADMIN'
		}
	})
	// 404
	.when('/404-error', {
		templateUrl : '404.tpl.html',
		data : {
			public : true,
		}
	});

	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.interceptors.push('httpAuthInterceptor');
}])

// RUN
.run(['$rootScope', '$templateCache', '$location', '$route', '$routeParams', '$anchorScroll', '$cookies', 'authService',
function($rootScope, $templateCache, $location, $route, $routeParams, $anchorScroll, $cookies, authService) {

	$rootScope.$on('$routeChangeStart', function(angularEvent, next, current) {

		$rootScope.authService = authService;

		// 리다이렉트는 패스
		if (next.redirectTo) {
			return;
		}
		// 라우팅 데이터
		var rd = {};
		if (next.data) {
			rd = next.data;
		}
		// 접근 권한이 없다면 무조건 허용안함
		if (rd.public === undefined) {
			rd.public = false;
		}
		if (rd.public !== true) {
			if (authService.isLoggedIn() === false) {
				authService.moveToLogin();
				return;
			}
		}
		// 없으면 무조건 허용 있으면 권한 검사
		if (rd.authority !== undefined) {
			if (authService.hasRole(rd.authority) == false) {
				authService.roleError();
				return;
			}
		}
	});
}]);
