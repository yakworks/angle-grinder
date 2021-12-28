import sessionServices from './sessionServices'
import dataApiFactory from './dataApiFactory'

// export module name
export default angular.module('ag.demo.api', [])
  .service('localStoreApi', function() { return sessionServices})
  // this is the default
  .service('dataStoreApi', function() { return dataApiFactory})
  .name
