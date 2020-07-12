import RestStoreApi from "./RestStoreApi"

function makeStore(endpoint){
  return new RestStoreApi(`api/${endpoint}`)
}

/** main holder for api*/
export class RestDataStores {

  static factory() {
    return new RestDataStores()
  }

  constructor() {
  }

  get customerApi() { return makeStore("customer")}
  get invoiceApi() { return makeStore("invoice")}

}

const _instance = RestDataStores.factory()

export default _instance
