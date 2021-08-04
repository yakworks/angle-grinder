import { LocalStoreApi } from './LocalStoreApi'
import { RestStoreApi } from './RestStoreApi'

// export module name
export default angular.module('ag.demo.api', [])
  .service('localStoreApi', LocalStoreApi)
  .service('restStoreApi', RestStoreApi)
  // this is the default, used in components, change it to RestStore to test that
  .service('dataStoreApi', RestStoreApi)
  .name
