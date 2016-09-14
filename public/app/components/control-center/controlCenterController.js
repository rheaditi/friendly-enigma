app.controller('ControlCenterCtrl', ['$scope', '$http', 'sessionService',
	function($scope, $http, sessionService){
	
	$scope.showButton = true;
	$scope.showLoading = false;
	$scope.showDone = false;

	$scope.switchMode = function(mode) {
		$scope.showLoading = true;
		$scope.showButton = false;

		$http({
			url: '/change_mode',
			method: 'POST',
			data: {
				mode: mode,
				token: sessionService.getJwt()
			}
		}).then(function success(response){
			$scope.showLoading = false;
			$scope.showDone = true;
			console.log(response.data);
		}, function error(error){
			$scope.error = true;
		})
	}

	$scope.$watch("setMode", function (newValue) {
		$scope.showButton = true;
		$scope.showDone = false;
	});

	$scope.populatePage = function() {
		$http({
			url: '/mode',
			method: 'GET'
		}).then(function(response){
			$scope.setMode = response.data.mode;

			$http({
				url: '/nominee_list',
				params: {
					token: sessionService.getJwt()
				}
			}).then(function success(response){

				$scope.nominees = response.data.nominees;
				console.log($scope.nominees);

			}, function error(error){
				console.log(error);
			})

		}, function(error){
			console.log(error);
		})
	}


}]);