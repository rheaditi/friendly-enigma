app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtOptionsProvider', 
	function($stateProvider, $urlRouterProvider){

	$urlRouterProvider
	.when('/','/home')
	.otherwise('/404');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'app/components/login/loginView.html',
			controller: 'LoginCtrl'
		})
		.state('admin-login', {
			url: '/admin/login', 
			templateUrl: 'app/components/admin-login/adminLoginView.html',
			controller: 'AdminLoginCtrl'
		})
		.state('control-center', {
			url: '/admin/control-center',
			templateUrl: 'app/components/control-center/controlCenterView.html',
			controller: 'ControlCenterCtrl',
			data: {
				requiresAdmin: true
			}
		})
		.state('home', {
			url: '/home',
			templateUrl: 'app/components/home/homeView.html',
			controller: 'HomeCtrl',
			data: {
				requiresLogin: true
			}
		})
		.state('404', {
			url: '/404',
			templateUrl: 'app/shared/404/404.html',
			controller: '404Ctrl'
		});

}]);


