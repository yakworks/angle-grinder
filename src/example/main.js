//require('angular')
import 'angular'
import '../vendor'
import agMod from '../angle-grinder'
//import '../styles/boot.less'

const mod = angular.module('exampleApp', [
  agMod
])
mod.controller('testController', function() {
  this.hello = 'hello 1'
  console.log('hello 1')
})

mod.controller('testController2', function() {
  this.hello = 'hello 2!'
  console.log('hello 2')
})

mod.controller('testController3', $scope => {
  $scope.hello = 'hello 3!'
  console.log('hello 3')
})
