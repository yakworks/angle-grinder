import '../../src/vendor'
import angular from 'angular'
import exampleAppMod from './example.module'
import routes from './routes.js'
import eg from './grids/exampleGrid'
import udg from './grids/usersDialogGrid'
import ug from './grids/usersGrid'
import './controllers'

angular.module('testApp', [])
  .controller('testController', function() {
    this.hello = 'hello 1'
    console.log('hello 1')
  })
  .controller('testController2', function() {
    this.hello = 'hello 2!'
    console.log('hello 2')
  })
  .controller('testController3', $scope => {
    $scope.hello = 'hello 3!'
    console.log('hello 3')
  })
