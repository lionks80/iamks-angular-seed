ngApp.factory('sessionManager', [
function() {

	var localStorageKey = "loginData";

	return {
		set : function(data) {
			localStorage.setItem(localStorageKey, angular.toJson(data, false));
		},
		get : function() {
			return angular.fromJson(localStorage.getItem(localStorageKey));
		},
		clear : function() {
			localStorage.removeItem(localStorageKey);
		}
	};

}]);
