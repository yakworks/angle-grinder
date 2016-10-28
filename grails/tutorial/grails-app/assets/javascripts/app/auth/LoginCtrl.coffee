auth = angular.module "tutorial", ["angleGrinder"]
auth.factory('authInterceptor', ($rootScope, $window) ->
  { request: (config) ->
    config.headers = config.headers or {}
    if $window.sessionStorage.token?
      config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token
    config
  }
).config ($httpProvider) ->
  $httpProvider.interceptors.push 'authInterceptor'
  return

class LoginCtrl
  @$inject = ["$scope", "pathWithContext", "$window", "$http", "$rootScope"]
  constructor: ($scope, pathWithContext, $window, $http, $rootScope) ->
    $rootScope.authenticated = $window.sessionStorage.token?
    $scope.user ={}
    $scope.login = ->
      $http.post((pathWithContext '/api/login'), {username: $scope.user.username,password: $scope.user.password}).then (response)->
        $rootScope.authenticated = true
        $window.sessionStorage.token = response.data.access_token
        $window.location = pathWithContext "/org"

    $scope.logout = ->
      $window.sessionStorage.token = undefined


auth.controller("LoginCtrl", LoginCtrl)

