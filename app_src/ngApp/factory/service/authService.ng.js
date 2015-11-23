ngApp.factory('authService', ['$http', '$location', 'sessionManager', 'loginApiService',
function($http, $location, sessionManager, apiService) {

	var authService = {};

	// route 에서 로그인 체크시 사용
	authService.isLoggedIn = function() {
		return sessionManager.get() !== null;
	};

	// route 에서 로그인 페이지 이동시 사용
	authService.moveToLogin = function() {
		$location.path("/login");
	};

	// route 에서 권한 검사시 사용
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

	// route 에서 권한이 없을 시 사용
	authService.roleError = function() {
		alert('해당 리소스에 접근할 권한이 없습니다. 홈으로 이동합니다.');
		$location.path("/");
	};

	authService.login = function(data) {

		apiService.login(data)
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

		apiService.logout()
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

	authService.getData = function() {
		return sessionManager.get();
	};

	return authService;
}]);
