var app = angular.module('votrApp', ['ui.router']);

app.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;

}]);