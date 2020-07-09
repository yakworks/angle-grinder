import SessionStorageApi from "./SessionStorageApi"

function makeStore(name, path){
  return new SessionStorageApi(name, path)
}

/** main holder for api*/
export class RestDataStore{

  constructor() {
  }

  get customerApi() { return makeStore("customers", "data/Customers.json")}
  get invoiceApi() { return makeStore("invoices", "data/Invoices.json")}

}

