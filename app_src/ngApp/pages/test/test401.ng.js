ngApp.controller('Test401Controller', ['$scope', '$rootScope', '$location', '$cookies', '$http', 'authService',
function($scope, $rootScope, $location, $cookies, $http) {
	
	console.log('Test401Controller');

	$scope.items = [{
		"code" : 1,
		"name" : "name-1",
		"price" : 100
	}, {
		"code" : 2,
		"name" : "name-2",
		"price" : 200
	}, {
		"code" : 3,
		"name" : "name-3",
		"price" : 300
	}, {
		"code" : 4,
		"name" : "name-4",
		"price" : 400
	}, {
		"code" : 5,
		"name" : "name-5",
		"price" : 500
	}];

}]);
