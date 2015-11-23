ngApp.factory('loginApiService', ['$http',
function($http) {

	var BASE_URL = 'js/test-api';
	var API_PATH = {
		login : BASE_URL + '/login',
		logout : BASE_URL + '/logout'
	};

	var apiService = {};
	apiService.login = function(data) {

		return $http({
			method : 'GET',
			url : API_PATH.login
		});
	};
	apiService.logout = function(data) {

		return $http({
			method : 'GET',
			url : API_PATH.logout
		});
	};
	return apiService;

}]);

// ngApp.factory('apiService', ['$http',
// function($http) {
//
// var BASE_URL = 'js/test';
// var API_PATH = {
// login : BASE_URL + '/login',
// logout : BASE_URL + '/logout'
// };
//
// var apiService = {};
// apiService.loginByForm = function(data) {
//
// return $http({
// method : 'GET',
// url : API_PATH + '/login'
// });
// // //
// // .success(function(data) {
// // $scope.data = data;
// // })
// // //
// // .error(function(data) {
// // alert('file load failed');
// // init();
// // });
//
// // return $http({
// // method : 'POST',
// // url : PATH_API.login,
// // data : $.param(data),
// // headers : {
// // 'Content-Type' : 'application/x-www-form-urlencoded'
// // }
// // })
// // //
// // .success(function(data) {
// // sessionManager.set(data);
// // $location.path("/");
// // })
// // //
// // .error(function(data) {
// // alert(data.message);
// // });
// };
//
// }]);
