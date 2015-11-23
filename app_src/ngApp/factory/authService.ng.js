ngApp.factory('authService', ['$http', '$location', 'sessionManager',
function($http, $location, sessionManager) {

	var authService = {};
	authService.login = function(data) {

		return $http.post(PATH_API.login, data)
		//
		.success(function(data) {
			sessionManager.set(data);
			$location.path("/");
		})
		//
		.error(function(data) {
			alert(data.message);
		});
	};

	authService.loginByForm = function(data) {

		return $http({
			method : 'POST',
			url : PATH_API.login,
			data : $.param(data),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		})
		//
		.success(function(data) {
			sessionManager.set(data);
			$location.path("/");
		})
		//
		.error(function(data) {
			alert(data.message);
		});
	};

	authService.logout = function() {

		$http.get(PATH_API.logout)
		//
		.success(function(data) {
			sessionManager.clear();
			$location.path('/');
		})
		//
		.error(function(data) {
			alert(data.message);
		});

	};
	authService.isLoggedIn = function() {
		return sessionManager.get() !== null;
	};
	authService.getData = function() {
		return sessionManager.get();
	};
	authService.hasRole = function(role) {

		var sessionData = authService.getData();

		if (sessionData === null) {
			return false;
		}
		var result = false;
		angular.forEach(sessionData.authorities, function(authority, idx, authorities) {
			if (authority === role) {
				result = true;
			}
		});
		return result;
	};
	return authService;
}]);
