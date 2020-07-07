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
export class AppConfigApi{
  /* @ngInject */
  constructor($http, $timeout, $q) {
    this.$http = $http
    this.$timeout = $timeout
    this.$q = $q
  }

  makeStore(name, path){
    return new SessionStorageApi(this.$http, this.$timeout, this.$q, name, path)
  }

  get invoiceApi() { return this.makeStore("invoices", "data/Invoices.json")}
  get invoiceApi() { return this.makeStore("invoices", "data/Invoices.json")}

}

