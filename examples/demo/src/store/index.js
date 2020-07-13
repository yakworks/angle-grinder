import {LocalStoreApi} from "./LocalStoreApi";
import {RestStoreApi} from "./RestStoreApi";

// export module name
export default angular.module('ag.demo.api', [])
  .service('localStoreApi', LocalStoreApi)
  .service('restStoreApi', RestStoreApi)
  .name
