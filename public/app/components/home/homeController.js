app.controller('HomeCtrl', ['$scope', '$http', 'sessionService', '$state',
	function($scope, $http, sessionService, $state){

	$scope.jwt = sessionService.getTranslatedJwt();
	$scope.mode = $scope.jwt.mode;
}]);