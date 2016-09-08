app

.config(function($routeProvider, $locationProvider) {

	$routeProvider
    	
    	/*
    	 * Route controllers are located in commonController
    	 */
		.when('/', {
			controller: 'LoginController',
			templateUrl: './app/views/common/login.html',
			resolve:{
				"check": function($location, session){
					if(session.isLoggedIn()){
						if(session.isAdmin()){
							$location.path('/admin');
						}else{
							$location.path('/comics');
						}
		            }
		        }
		    }
		})
		.when('/account', {
			controller: 'AccountController',
			templateUrl: './app/views/common/account.html',
		})
		.when('/404', {
			controller: 'Error404Controller',
	      	templateUrl: './app/views/common/404.html'
	    })

	    /*
    	 * Route controllers are located in userController
    	 */
    	 .when('/comics', {
			controller: 'ListComicsController',
			templateUrl: './app/views/user/listComics.html',
			resolve:{
				"check": function($location, session){
					if(session.isAdmin()) $location.path('/admin');
		        }
		    }
		})
		.when('/loans', {
			controller: 'LoansController',
			templateUrl: './app/views/user/loans.html',
			resolve:{
				"check": function($location, session){
					if(session.isAdmin()) $location.path('/admin');
		        }
		    }
		})
		.when('/reviews', {
			controller: 'ReviewsController',
			templateUrl: './app/views/user/reviews.html',
			resolve:{
				"check": function($location, session){
					if(session.isAdmin()) $location.path('/admin');
		        }
		    }
		})
		.when('/see/:id', {
			controller: 'SeeComicController',
			templateUrl: './app/views/user/seeComic.html',
			resolve:{
				"check": function($location, session){
					if(session.isAdmin()) $location.path('/admin');
		        }
		    }
		})

		/*
    	 * Route controllers are located in adminController
    	 */
		.when('/add', {
			controller: 'AddComicController',
			templateUrl: './app/views/admin/addComic.html',
			resolve:{
				"check": function($location, session){
					if(session.isUser()) $location.path('/comics');
		        }
		    }
		})
	  	.when('/admin', {
	  		controller: 'AdminController',
	    	templateUrl: './app/views/admin/admin.html',
	    	resolve:{
				"check": function($location, session){
					if(session.isUser()) $location.path('/comics');
		        }
		    }
	  	})
		.when('/edit/:id', {
			controller: 'EditComicController',
			templateUrl: './app/views/admin/editComic.html',
			resolve:{
				"check": function($location, session){
					if(session.isUser()) $location.path('/comics');
		        }
		    }
		})
	  	.when('/users', {
	  		controller: 'ListUsersController',
	    	templateUrl: './app/views/admin/listUsers.html',
	    	resolve:{
				"check": function($location, session){
					if(session.isUser()) $location.path('/comics');
		        }
		    }
	  	})
	  	.when('/user/:username', {
	  		controller: 'SeeUserController',
	  		templateUrl: './app/views/admin/seeUser.html',
	  		resolve:{
				"check": function($location, session){
					if(session.isUser()) $location.path('/comics');
		        }
		    }
	  	})

	    .otherwise({
	      	redirectTo: '/404'
	    })
	;
})

;