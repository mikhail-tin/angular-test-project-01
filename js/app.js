var restApp = angular.module( 'restApp', ["ngRoute"] )


.config(function($routeProvider){
		$routeProvider.when('/main',
        {
            templateUrl:'/view/main.html'
        });
        $routeProvider.when('/about',
        {
            templateUrl:'/view/about.html',
            controller:'AboutController'
        });
        $routeProvider.when('/contact',
        {
            templateUrl:'/view/contact.html',
            controller:'ContactController'
        });
        $routeProvider.otherwise({redirectTo: '/main'});
})

.factory('poemsFactory', ['$http', '$q', function( $http, $q ){
	var poemsApiUrl = "poems.json";
	var poems = null;
	var name = '';
	var text = '';
	return {
		getPoems: function() {
			var deferred = $q.defer();

			$http({method: 'GET', url: poemsApiUrl})
				.success(function(data){
					poems = data;
					deferred.resolve( data );
				})
				.error(function(data, status, headers, config) {
					deferred.reject( 'Error in $http request' );
				});
			return deferred.promise;
		}
	}
}])

.controller( 'mainController', [ '$scope', function( $scope ){
	$scope.hideSectionOne = false;
	$scope.showShoppingCurt = false;
	$scope.shopingCart = {};
}])

.controller( 'poemsListController', [ '$scope', 'poemsFactory',
	 function( $scope, poemsFactory, attrs ){
		poemsFactory.getPoems().then(function( myObj ){
			$scope.query = "";
			$scope.poemsForUI = myObj.poems;
		});
		$scope.showPopUpMsg = false;

		$scope.openPopUp = function( text ) {
		    $scope.showPopUpMsg = true;
		    $scope.popUpMsgContent = text;
		}
		
		$scope.buy = function(id)
		{
			$scope.shopingCart[id] = 1 ;

			alert("Отличный выбор!");
		}
		
}])

.controller( 'ContactController', [ '$scope', function( $scope ){
	$scope.email = "name@host.com";
	$scope.mobile = "+79000000000";
}])

.controller( 'AboutController', [ '$scope', function( $scope ){
	$scope.text = "The project was started  for study JavaScript, AngularJS and Bootstrap.";
}])

.directive('popUpMsg', function(){
  return {
    restrict: 'E',
    scope: false,
     templateUrl:'/view/pop.html',
    controller: function($scope) {
      $scope.closePopUp = function(){
        $scope.showPopUpMsg = false;
      }
    }
  }
})