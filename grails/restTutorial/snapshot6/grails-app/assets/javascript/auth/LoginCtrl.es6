angular.module("tutorial", ["angleGrinder"]);
var LoginCtrl;
var auth = angular.module("tutorial");

auth.factory('authInterceptor', ["$rootScope", "$window", "pathWithContext", "$q", function($rootScope, $window, pathWithContext, $q) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token != null) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function(response) {
      var unauthorized = 401;
      if (response.status === unauthorized) {
        return $window.location = pathWithContext("/");
        }
    }
  };
}]).config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

LoginCtrl = (function() {
  LoginCtrl.$inject = ["$scope", "pathWithContext", "$window", "$http", "$rootScope"];
  function LoginCtrl($scope, pathWithContext, $window, $http, $rootScope) {
    $rootScope.authenticated = $window.sessionStorage.token != null;
    $scope.user = {};
    $scope.login = function() {
      return $http.post(pathWithContext('/api/login'), {
        "username": $scope.user.username,
        "password": $scope.user.password
      }).then(function(response) {
        $rootScope.authenticated = !!response.data.access_token;
        $window.sessionStorage.token = response.data.access_token;
        return
      });
    };
    $scope.logout = function() {
      $rootScope.authenticated = false;
      $window.sessionStorage.token = undefined;
    };
  }

  return LoginCtrl;
})();

auth.controller("LoginCtrl", LoginCtrl);
