import SessionStorageApi from "./SessionStorageApi"

/**
 * Fake REST Services (Contacts, Folders, Messages) used in the mymessages submodule.
 *
 * Each of these APIs have:
 *
 * .all()
 * .search(exampleItem)
 * .get(id)
 * .save(item)
 * .post(item)
 * .put(item)
 * .remove(item)
 *
 * See ../util/sessionStorage.js for more details, if curious
 */

/** main holder for api*/
export class RestDataStore{
  /* @ngInject */
  constructor($http, $timeout, $q) {
    this.$http = $http
    this.$timeout = $timeout
    this.$q = $q
  }

  makeStore(name, path){
    return new SessionStorageApi(name, path)
  }

  get invoiceApi() { return new SessionStorageApi("invoices", "data/Invoices.json")}

}

