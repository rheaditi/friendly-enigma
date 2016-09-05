app.service('adminService', ['$http', function($http){
	this.authenticate = function(username, password){
		return $http({
			method: 'POST',
			url: '/auth_admin',
			data: {
				username: username,
				password: password
			}
		});
	}
}]);