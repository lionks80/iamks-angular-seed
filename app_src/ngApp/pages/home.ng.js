ngApp.controller('HomeController', ['$scope', '$rootScope', '$location', '$cookies', '$http', 'authService',
function($scope, $rootScope, $location, $cookies, $http, authService) {

	$scope.authService = authService;

	$scope.logout = function() {
		authService.logout();
	};

	$scope.test1 = function() {
		$http.get(API_PATH + '/unauthorized')
		//
		.success(function(data) {
			alert('success');
		})
		//
		.error(function(data) {
			alert(data.message);
		});
	};

	$scope.test2 = function() {
		$http.get(API_PATH + '/forbidden')
		//
		.success(function(data) {
			alert('success');
		})
		//
		.error(function(data) {
			alert(data.message);
		});
	};
}]);
