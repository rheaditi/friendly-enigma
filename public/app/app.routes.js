// app.config(function($routeProvider){
// 	$routeProvider
// 		.when('/',{
// 			templateUrl: 'app/components/landing/landingView.html',
// 			controller: 'LandingCtrl'
// 		})
// 		// .when('/about',{
// 		// 	templateUrl: './views/about.html',
// 		// 	controller: 'AboutCtrl'
// 		// })
// });

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	
}]);