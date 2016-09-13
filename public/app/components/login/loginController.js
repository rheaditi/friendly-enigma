app.controller('LoginCtrl', ['$scope', '$http', 'sessionService', '$state',
	function($scope, $http, sessionService, $state){
	
	$scope.signInUser = function(user) {
		$http({
			url: 'http://localhost:1337/user',
			method: 'POST',
			data: {
				user: user
			}
		}).then(function success(response) {
			sessionService.setJwt(response.data.token);
			$state.go('home')
		}, function error(error) {
			console.log(error.data);
		})
	}

}]);