app

.controller('MainController', function($scope, $location, storage, session) {
	// Initial load data
	if(!storage.getList("users")){
		storage.init("users", "./assets/json/users.json");
		storage.init("comics", "./assets/json/comics.json");
	}

	// Logout function
	$scope.logout = function(){
		session.destroy();
		$location.path('/');
	};

	// Return username if name doesn't exist
	$scope.getNameUser = function(){
		return session.getParam("name") || session.getParam("username") ;
	};

	// Check if actual session is admin, used in views
	$scope.isAdmin = function(){
		return session.isAdmin();
	};

	// Check if can show header and footer
	$scope.canShowHeaderFooter = function(){
		return session.isLoggedIn() && $location.path() != "/404";
	};

	// Return the reviews average (user stars)
	$scope.getStarsAverage = function(reviews, rounding){
		average = 0;

		if(!reviews.length) return average;

		for (var i = 0; i < reviews.length; i++) {
			average += reviews[i].stars;
		};

		if(rounding){
			// return integer number 
			return Math.round(average / reviews.length);
		}
		// return floating number 
		return Math.round((average / reviews.length) * 10) / 10;
	};

})

.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.split(' ').map(function(wrd){return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase();}).join(' ') : '';
    }
})

;
