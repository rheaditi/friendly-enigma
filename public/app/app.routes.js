app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider
	.when('/','/home')
	.otherwise('/404');

	$stateProvider
		.state('/signin', {
			url: '/signin',
			templateUrl: 'app/components/signin/signinView.html',
			controller: 'SigninCtrl'
		})
		.state('/admin-signin', {
			url: '/admin-signin', 
			templateUrl: 'app/components/admin-signin/adminSigninView.html',
			controller: 'AdminSigninCtrl'
		})
		.state('/control-panel', {
			url: '/admin/control-panel',
			templateUrl: 'app/components/control-panel/controlPanelView.html',
			controller: 'ControlPanelCtrl',
			data: {
				requiresAdmin: true
			}
		})
}]);