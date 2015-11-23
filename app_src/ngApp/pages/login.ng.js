ngApp.controller('LoginController', ['$scope', '$rootScope', '$location', '$cookies', '$http', 'authService',
function($scope, $rootScope, $location, $cookies, $http, authService) {

	// 아이디 저장 플래그 설정
	$scope.chkSaveId = $cookies.get("LOGIN_ID") ? true : false;
	$scope.user = {
		username : $cookies.get("LOGIN_ID")
	};

	$scope.login = function() {

		// 아이디 저장 플래그 동작
		if ($scope.chkSaveId) {
			$cookies.put("LOGIN_ID", $scope.user.username);
		} else {
			$cookies.remove("LOGIN_ID");
		};

		$scope.user.CLIENT_TYPE = $cookies.get("CLIENT_TYPE");
		$scope.user.CLIENT_ID = $cookies.get("CLIENT_ID");
		authService.login($scope.user);
	};

}]);
