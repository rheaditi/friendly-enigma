app.service('sessionService', ['store', 'jwtHelper', function(store, jwtHelper){
	var JWT_STORE_KEY = 'votr-jwt';
	this.setJwt = function(jwt){
		store.set(JWT_STORE_KEY, jwt);
	};

	this.getJwt = function(){
		return store.get(JWT_STORE_KEY);
	};

	this.annihilate = function(){
		store.remove(JWT_STORE_KEY);
	};

	this.getTranslatedJwt = function(){
		var rawJwt = store.get(JWT_STORE_KEY);
		var decoded = jwtHelper.decodeToken(rawJwt);
		return decoded;
	};

	this.isExpired = function(){
		var jwt = store.get(JWT_STORE_KEY);
		return jwtHelper.isTokenExpired(jwt);
	};

	this.isUserAdmin = function(){
		var rawJwt = store.get(JWT_STORE_KEY);
		var decoded = jwtHelper.decodeToken(rawJwt);
		return decoded.admin;
	};

}]);