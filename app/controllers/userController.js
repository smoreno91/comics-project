app

.controller('ListComicsController', function($scope, $rootScope, storage){
	$rootScope.bodyClass = "general-bg"
	$scope.listComics = storage.getList("comics").filter(function(obj){
		obj.stars = $scope.getStarsAverage(obj.reviews, true);
		return true;
	});
	$scope.showAdvancedSearh = false;

	$scope.getGenres = function(){
		toReturn = new Array();
		for (var i = 0; i < $scope.listComics.length; i++) {
			if(toReturn.indexOf($scope.listComics[i].genre) == -1){
				toReturn.push($scope.listComics[i].genre);
			}
		};
		return toReturn.sort();
	};

	$scope.getEditions = function(){
		toReturn = new Array();
		for (var i = 0; i < $scope.listComics.length; i++) {
			if(toReturn.indexOf($scope.listComics[i].edition) == -1){
				toReturn.push($scope.listComics[i].edition);
			}
		};
		return toReturn.sort();
	};

	$scope.getCharacters = function(){
		toReturn = new Array();
		for (var i = 0; i < $scope.listComics.length; i++) {
			if(toReturn.indexOf($scope.listComics[i].character) == -1){
				toReturn.push($scope.listComics[i].character);
			}
		};
		return toReturn.sort();
	};

})

.controller('LoansController', function($scope, session, storage) {
	user = session.isLoggedIn();
	userSearch = storage.getList("users").filter(function(obj){
		return obj.username == user.username;
	});
	$scope.listComics = storage.getList("comics").filter(function(obj){
		for (var i = 0; i < userSearch[0].loans.length; i++) {
			if(userSearch[0].loans[i] == obj.id){
				return true;
			}
		};
		return false;
	});

})

.controller('ReviewsController', function($scope, session, storage) {
	user = session.isLoggedIn();

	$scope.listReviews = [];

	comics = storage.getList("comics").filter(function(obj){
		for (var i = 0; i < obj.reviews.length; i++) {
			if(obj.reviews[i].username == user.username){
				obj.reviews[i]["comic"] = obj.name;
				$scope.listReviews.push(obj.reviews[i]);
			}
		};
		return true;
	});

})

.controller('SeeComicController', function($scope, $routeParams, $location, resource, session, storage){
	// Search comic by id
	var comicSearch = storage.getList("comics").filter(function(obj) {
	  	return obj.id == $routeParams.id;
	});

	// change location to 404 if comicSearch not exists
	if(comicSearch.length == 0){
		$location.path('404')
	}

	// Update comic search for filter and save it
	var comics = storage.getList("comics").filter(function(obj) {
		if(obj.id == $routeParams.id){
			obj.searchs++;
		}
	  	return true;
	});
	storage.save("comics", comics);

	$scope.range = resource.range;
	$scope.comic = comicSearch[0];
	$scope.newReview = {stars: "5"};

	$scope.message = "";
	$scope.alertType = "danger";

	$scope.submitReviewForm = function(isValid, review){
		$scope.message = "";
		$scope.alertType = "danger";

		if(isValid){

			var id = 0;
			for (var i = 0; i < $scope.comic.reviews.length; i++) {
				if(id < $scope.comic.reviews[i].id){
					id = $scope.comic.reviews[i].id;
				}
			};

			user = session.isLoggedIn();

			review.stars = Number(review.stars);

			review["id"] = ++id;
			review["username"] = user.username;

			$scope.comic.reviews.push(review);

			var comics = storage.getList("comics").filter(function(obj) {
				if(obj.id == $scope.comic.id){
					obj.reviews.push(review);
				}
			  	return true;
			});
			storage.save("comics", comics);

			$scope.message = "The new review has been added successfully!";
			$scope.alertType = "success";

			$scope.newReview = {stars: "5"};
		}
	};

	$scope.userCanBorrow = function(){
		user = session.isLoggedIn();
		if(!user) return false;
		
		userSearch = storage.getList("users").filter(function(obj){
			return obj.username == user.username;
		});
		loanSearch = userSearch[0].loans.filter(function(obj){
			return obj == $scope.comic.id;
		});
		return !loanSearch.length ? true : false;
	};

	$scope.borrowComic = function(comic){
		$scope.comic.loans--;

		user = session.isLoggedIn();

		users = storage.getList("users").filter(function(obj){
			if(obj.username == user.username){
				obj.loans.push($scope.comic.id);
			}
			return true;
		});
		storage.save("users", users);

		comics = storage.getList("comics").filter(function(obj){
			if(obj.id == $scope.comic.id){
				obj.loans--;
			}
			return true;
		});
		storage.save("comics", comics);
	};

})

;

