import {LocalDataStores} from "./LocalDataStores";

// export module name
export default angular.module('ag.demo.api', [])
  .service('localDataStores', LocalDataStores)
  .name
