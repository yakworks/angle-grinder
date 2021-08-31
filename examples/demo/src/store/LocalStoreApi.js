import SessionStorageApi from 'angle-grinder/src/dataApi/SessionStorageApi'

// eslint-disable-next-line space-before-blocks
function makeDataApi(name, path){
  return new SessionStorageApi(name, path)
}

/** main holder for api */
export class LocalStoreApi{

  static factory() {
    return new LocalStoreApi()
  }

  // constructor() {
  // }

  get customer(){ return makeDataApi('customers', 'data/Customers.json') }
  get batch(){ return makeDataApi('customers', 'data/Batch.json') }
  get invoice() { return makeDataApi('invoices', 'data/Invoices.json') }
  get tranState() { return makeDataApi('tranStates', 'data/TranStates.json') }

}

const _instance = LocalStoreApi.factory()

export default _instance
