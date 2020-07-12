import SessionStoreApi from "./SessionStoreApi"

function makeStore(name, path){
  return new SessionStoreApi(name, path)
}

/** main holder for api*/
export class LocalDataStores {

  static factory() {
    return new LocalDataStores()
  }

  constructor() {
  }

  get customerApi() { return makeStore("customers", "data/Customers.json")}
  get invoiceApi() { return makeStore("invoices", "data/Invoices.json")}

}

const _instance = LocalDataStores.factory()

export default _instance
