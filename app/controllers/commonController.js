app

.controller('LoginController', function($scope, $rootScope, $location, session, storage) {
	$rootScope.bodyClass = "login-view"

	$scope.loginNavActive = true;
	$scope.registerNavActive = false;

	$scope.user = {};
	$scope.message = "";
	$scope.alertType = "danger";

	$scope.changeNav = function(activeNav){
		$scope.user.email = $scope.user.username = $scope.user.password = "";
		$scope.message = "";

		$scope.loginForm.$setDirty(false);
		$scope.loginForm.$setPristine(false);

		if(activeNav == 'login'){
			$scope.loginNavActive = true;
			$scope.registerNavActive = false;			
		}else{
			$scope.loginNavActive = false;
			$scope.registerNavActive = true;
		}

	};

	// Function to submit the form after all validation has occurred
	$scope.submitForm = function(isValid) {

		$scope.message = "";
		$scope.alertType = "danger";

		// Check to make sure the form is completely valid
		if(isValid){

			//Find the user by username
			var searchUser = storage.getList("users").filter(function(obj) {
			  	return obj.username == $scope.user.username;
			});

			// Chech if is log in or register tab
			if($scope.registerNavActive){

				if(searchUser.length){
					// The username exists
					$scope.message = "The username you’ve entered already exists";
				}else{
					// Save the new user
					$scope.user["name"] = "";
					$scope.user["lastname"] = "";
					$scope.user["role"] = "user";
					$scope.user["loans"] = [];

					storage.addNew("users", $scope.user);

					this.changeNav('login');
					$scope.message = "You have successfully registered! Login to enter the site";
					$scope.alertType = "success";
				}

			}else{

				if(searchUser.length){
					if(searchUser[0].password == $scope.user.password){
						//Success
						session.init(searchUser[0]);
						$location.path(session.isAdmin() ? '/admin' : '/comics' );

					}else{
						//Error password
						$scope.message = "The password you’ve entered is incorrect.";
					}
				}else{
					//No results for the username
					$scope.message = "The username you’ve entered no exists";
				}

			}
			
			$scope.user["password"] = "";

		}

	};

})

.controller('AccountController', function($scope, $location, session, storage) {
	$scope.user = session.isLoggedIn();
	$scope.message = "";
	$scope.alertType = "danger";

	$scope.submitForm = function(isValid, user) {

		$scope.message = "";
		$scope.alertType = "danger";

		if(isValid){
			//Find the user by username
			var users = storage.getList("users").filter(function(obj) {
				if(obj.username == $scope.user.username){
					obj.name = user.name;
					obj.lastname = user.lastname;
					obj.email = user.email;
				}
			  	return true;
			});

			storage.save("users", users);
			session.init(user);

			$scope.message = "You have successfully updated	your profile!";
	    	$scope.alertType = "success";	
		}

	};
})

.controller('Error404Controller', function($rootScope) {
	$rootScope.bodyClass = "general-bg";
})

;
