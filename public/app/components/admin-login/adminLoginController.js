app.controller('AdminLoginCtrl', ['$scope', '$http', '$state', 'adminService', 'sessionService',
	function($scope, $http, $state, adminService, sessionService){
	

	$scope.adminAuthenticate = function(username, password){
		adminService.authenticate(username, password)
		.then(function success(response){
		 	$scope.jwt = response.data;
		 	if(response.data.token){
		 		sessionService.setJwt(response.data.token);
		 		$state.go('control-center')
		 	}
		 	else {
		 		console.error('No token received.')
		 	}
		}, function error(error){
		 	console.error(error);
		});
	};
}]);
