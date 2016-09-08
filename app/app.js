var app = angular.module('app', ['ngAnimate', 'ngRoute'])

.run(['$rootScope', '$location', 'session', function ($rootScope, $location, session) {
    $rootScope.$on('$routeChangeStart', function (event) {
        
        // Always check if has session before start a route change
        if(!session.isLoggedIn()) $location.path('/');

    });

    $rootScope.bodyClass = "";
}])

;