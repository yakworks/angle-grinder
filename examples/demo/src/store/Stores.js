import {SessionStorage} from "./sessionStorage"

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

/** A fake Contacts REST client API */
export class InvoiceStore extends SessionStorage {
  /* @ngInject */
  constructor($http, $timeout, $q) {
    super($http, $timeout, $q, "invoices", "data/Invoices.json");
    console.log("InvoiceStore")
  }
}

