import RestDataApi from 'angle-grinder/src/dataApi/RestDataApi'
import ListDatastore from 'angle-grinder/src/datastore/ListDatastore'
import kyApi from 'angle-grinder/src/dataApi/kyApi'

function makeDataApi(endpoint){
  return new RestDataApi(`api/${endpoint}`)
}

function makeDatastore(endpoint){
  return ListDatastore({ endpoint:`api/${endpoint}` })
}

/** main holder for api */
export class RestStoreApi {
  _cached = {}

  static factory() {
    return new RestStoreApi()
  }

  constructor() {
  }

  get customer() { return makeDatastore('customer') }
  // get customer() { return makeDatastore('customer') }
  get batch() { return makeDataApi('batch') }
  get invoice() { return makeDataApi('invoice') }
  get tranState() { return makeDataApi('tranState') }
  get tag() { return makeDataApi('tag') }

  appConfig(configKey) {
    return kyApi.ky.get(`api/appConfig/${configKey}`).json()
  }

  /**
   * checks cache and if not there then does a ky.get
   */
  configFromCache(key) {

  }

}

const _instance = RestStoreApi.factory()

export default _instance
