import angular from 'angular'
import ngAnimate from 'angular-animate'
import agMod from '../../src/angle-grinder'
import exResources from './modules/resources'
import exGrids from './grids/grids.module.js'
import exDocs from './modules/docs'
import ngRoute from 'angular-route'

var app = angular.module('exampleApp', [
  ngRoute,
  agMod,
  ngAnimate,
  exResources,
  exGrids,
  exDocs
])

app.config(["$httpProvider", $httpProvider => // register http errors interceptor
  $httpProvider.interceptors.push("httpErrorsInterceptor")
]);

//app.run(["$templateCache", function($templateCache) {}]);

export default 'exampleApp'
