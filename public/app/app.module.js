var app = angular.module('votrApp', ['ui.router', 'angular-storage', 'angular-jwt']);

app.run(['$rootScope', '$state', '$stateParams', 'sessionService', '$location',
	function($rootScope, $state, $stateParams, sessionService, $location){

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;

	$rootScope.$on('$stateChangeStart', function(event, toState, fromState, fromParams, options) {
		console.log('Transitioning to ' + toState.name);
		
		
	});
}]);