var app = angular.module('votrApp', ['ui.router', 'angular-storage', 'angular-jwt']);

app.run(['$rootScope', '$state', '$stateParams', 'sessionService', function($rootScope, $state, $stateParams, sessionService){

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;

	$rootScope.$on('$stateChangeStart', function(event, toState, fromState, fromParams, options) {
		console.log('Transitioning from ' + fromState.name + ' to ' + toState.name);
		if(!sessionService.getJwt() || sessionService.isExpired()){
    		event.preventDefault();
			$state.go('/login');
		}

    	if(toState.data && toState.data.requiresAdmin === true){
    		event.preventDefault();
    		if(sessionService.isUserAdmin() === false){
    			$state.go('/404', { status: 403, message: 'Forbidden: You Shall Not Pass'});
    		}
    	}
	});
}]);