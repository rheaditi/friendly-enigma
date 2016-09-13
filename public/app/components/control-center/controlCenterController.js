app.controller('ControlCenterCtrl', ['$scope', '$http', 'sessionService',
	function($scope, $http, sessionService){
	
	$scope.jwt = sessionService.getTranslatedJwt();
	$scope.mode = $scope.jwt.mode;

}]);