ngApp.factory('httpAuthInterceptor', ['$q', '$rootScope', '$location', 'sessionManager',
function($q, $rootScope, $location, sessionManager) {

	var LOGIN_PATH = "/login";

	return {
		'responseError' : function(rejection) {

			if (rejection.status == 401) {

				sessionManager.clear();
				$location.path(LOGIN_PATH);

			} else if (rejection.status == 403) {

				if (sessionManager.get() === null) {
					$location.path(LOGIN_PATH);
					return;
				}

				if (confirm("현재 요청한 명령을 수행할 권한이 없습니다. 로그인 페이지로 이동하시겠습니까?")) {
					$location.path(LOGIN_PATH);
				} else {
					return $q.reject(rejection);
				}

			} else {

				return $q.reject(rejection);

			}

		}
	};
}]);
