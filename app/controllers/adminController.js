app

.controller('AddComicController', function($scope, $location, storage, resource){
	$scope.comic = {recommended: "1", image: "./assets/img/320x150.png", reviews: [], searchs: 0};

	$scope.message = "";
	$scope.alertType = "danger";

	$scope.addForm = function(isValid, comic){
		$scope.message = "";
		$scope.alertType = "danger";

		if(isValid){
			// Create id (for url) cleaning the name
			comic.id = resource.cleanUrl(comic.name);
			storage.addNew("comics", comic);

			$scope.message = "The comic was created! Back to comic list to edit it";
			$scope.alertType = "success";

			// Init a new comic in cause user want to add a new comic
			$scope.comic = {recommended: "1", image: "./assets/img/320x150.png", reviews: [], searchs: 0};
		}
	};
})

.controller('AdminController', function($scope, $rootScope, storage){	
	$rootScope.bodyClass = "general-bg";
	$scope.listComics = storage.getList("comics");
})

.controller('EditComicController', function($scope, $routeParams, $location, storage, resource){
	// Search comic by id
	var comicSearch = storage.getList("comics").filter(function(obj) {
	  	return obj.id == $routeParams.id;
	});

	// change location to 404 if comicSearch not exists
	if(comicSearch.length == 0){
		$location.path('404')
	}

	$scope.message = "";
	$scope.alertType = "danger";

	$scope.comic = comicSearch[0];

	$scope.editForm = function(isValid, comic){
		$scope.message = "";
		$scope.alertType = "danger";

		if(isValid){
			
			// Save comic
			var comics = storage.getList("comics").filter(function(obj) {
				if(obj.id == comic.id){
					obj.name = comic.name;
					obj.description = comic.description;
					obj.image = comic.image;
					obj.recommended = comic.recommended;
					obj.edition = comic.edition;
					obj.loans = comic.loans;
					obj.creator = comic.creator;
					obj.genre = comic.genre;
				}
			  	return true;
			});
			storage.save("comics", comics);

			$scope.message = "You have successfully updated	this comic!";
	    	$scope.alertType = "success";	
		}
	};

	$scope.deleteReview = function(review){
		result = confirm("Are you sure want to delete the review of " + review.username + "?");
		if(result){
			// Update reviews in view
			reviews = $scope.comic.reviews.filter(function(obj){
				return obj.id != review.id
			});
			$scope.comic.reviews = reviews;

			// Update and save the reviews in localstorage
			var comics = storage.getList("comics").filter(function(obj) {
				if(obj.id == $scope.comic.id){
					obj.reviews = reviews;
				}
			  	return true;
			});
			storage.save("comics", comics);
		}

	};

})

.controller('ListUsersController', function($scope, session, storage){
	$scope.listUsers = storage.getList("users");

	$scope.getRoles = function(){
		toReturn = new Array();
		for (var i = 0; i < $scope.listUsers.length; i++) {
			if(toReturn.indexOf($scope.listUsers[i].role) == -1){
				toReturn.push($scope.listUsers[i].role);
			}
		};
		return toReturn;
	};

	$scope.canShow = function(user){
		return user.username != session.isLoggedIn().username;
	};

	$scope.delete = function(user){
		result = confirm("Are you sure want to delete the user: " + user.username + "?");
		if(result){
			var newList = storage.getList("users").filter(function(obj) {
			  	return obj.username != user.username;
			});
			$scope.listUsers = newList;
			storage.save("users", newList);
		}
	};

})

.controller('SeeUserController', function($scope, $location, $routeParams, storage) {
	userSearch = storage.getList("users").filter(function(obj){
		return obj.username == $routeParams.username;
	});

	if(!userSearch.length){
		$location.path('/404')
	}

	$scope.user = userSearch[0];

	$scope.listComics = storage.getList("comics").filter(function(obj){
		for (var i = 0; i < userSearch[0].loans.length; i++) {
			if(userSearch[0].loans[i] == obj.id){
				return true;
			}
		};
		return false;
	});

	$scope.returnComic = function(comic){

		listLoans = [];

		users = storage.getList("users").filter(function(obj){
			if(obj.username == $scope.user.username){
				listLoans = $scope.user.loans.filter(function(loan){
					return loan != comic.id;
				});
				obj.loans = listLoans;
				$scope.user.loans = listLoans;
			}
			return true;
		});
		storage.save("users", users);

		$scope.listComics = storage.getList("comics").filter(function(obj){
			for (var i = 0; i < listLoans.length; i++) {
				if(listLoans[i] == obj.id){
					return true;
				}
			};
			return false;
		});

		comics = storage.getList("comics").filter(function(obj){
			if(obj.id == comic.id){
				obj.loans++;
			}
			return true;
		});
		storage.save("comics", comics);
	};
})

;