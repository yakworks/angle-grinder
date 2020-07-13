import {LocalStoreApi} from "./LocalStoreApi";
import {RestStoreApi} from "./RestStoreApi";

// export module name
export default angular.module('ag.demo.api', [])
  .service('dataStoreApi', LocalStoreApi) //this is the default, used in components
  .service('localStoreApi', LocalStoreApi)
  .service('restStoreApi', RestStoreApi)
  .name
