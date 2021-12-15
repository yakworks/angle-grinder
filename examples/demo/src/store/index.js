import sessionServices from './sessionServices'
import dataApiFactory from './RestApiFactory'

// export module name
export default angular.module('ag.demo.api', [])
  .service('localStoreApi', function() { return sessionServices})
  .service('restStoreApi', function() { return dataApiFactory})
  // this is the default, used in components, change it to RestStore to test that
  .service('dataStoreApi', function() { return dataApiFactory})
  .name
