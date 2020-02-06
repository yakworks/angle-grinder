import angular from 'angular'

angular.module('app')
  .controller('LaddaCtrl', function ($scope, $timeout) {
    $scope.ldloading = {};
    $scope.clickBtn = function (style) {
      $scope.ldloading[style.replace('-', '_')] = true;
      $timeout(function () {
        $scope.ldloading[style.replace('-', '_')] = false;
      }, 2000);
    };
    $scope.clickProgressBtn = function (style) {
      $scope.ldloading[style.replace('-', '_') + "_progress"] = true;
      $timeout(function () {
        $scope.ldloading[style.replace('-', '_') + "_progress"] = 0.1;
      }, 500);
      $timeout(function () {
        $scope.ldloading[style.replace('-', '_') + "_progress"] += 0.1;
      }, 1000);
      $timeout(function () {
        $scope.ldloading[style.replace('-', '_') + "_progress"] += 0.1;
      }, 1500);
      $timeout(function () {
        $scope.ldloading[style.replace('-', '_') + "_progress"] = false;
      }, 2000);
    };
  })
  .controller('ButtonsCtrl', function ($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  })
  .controller('DropdownCtrl', function ($scope, $log) {
    $scope.items = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function (open) {
      $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  })
