app

.directive('headerView', function() {
	return {
		restrict: 'E',
		templateUrl: './app/views/directives/header.html'
	};
})

.directive('footerView', function() {
	return {
		restrict: 'E',
		templateUrl: './app/views/directives/footer.html'
	};
})

.directive('carouselView', function(){
	return {
		restrict: 'E',
		templateUrl: './app/views/directives/carousel.html'
	};
})

.directive('starsComic', function(){
	return {
		restrict: 'E',
		templateUrl: './app/views/directives/stars.html',
		controller: function($scope, resource){
			$scope.range = resource.range;
		},
		scope: {
			stars: "=stars"
		}
	};
})

;