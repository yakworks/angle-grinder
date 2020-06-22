import angular from 'angular'

angular.module('app').controller('ComplexTabsDemoCtrl', function($scope) {
  $scope.tabs = [{
    title: 'Form',
    content: 'Dynamic content 1'
  }, {
    title: 'Grid',
    content: '',
    disabled: false
  }]
  $scope.dueDate = new Date()

})
