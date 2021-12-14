import sessionStores from './sessionStores'
import { RestStoreApi } from './RestStoreApi'

// export module name
export default angular.module('ag.demo.api', [])
  .service('localStoreApi', () => sessionStores)
  .service('restStoreApi', RestStoreApi)
  // this is the default, used in components, change it to RestStore to test that
  .service('dataStoreApi', RestStoreApi)
  .name
