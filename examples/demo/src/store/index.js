import sessionStores from './sessionStores'
import restStoreApi from './RestStoreApi'

// export module name
export default angular.module('ag.demo.api', [])
  .service('localStoreApi', function() { return sessionStores})
  .service('restStoreApi', function() { return restStoreApi})
  // this is the default, used in components, change it to RestStore to test that
  .service('dataStoreApi', function() { return restStoreApi})
  .name
