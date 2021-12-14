// import RestDataApi from 'angle-grinder/src/dataApi/RestDataApi'
import RestDatastore from 'angle-grinder/src/datastore/rest/RestDatastore'
import ky from 'angle-grinder/src/datastore/ky'

// function makeDataApi(endpoint){
//   return new RestDataApi(`api/${endpoint}`)
// }

function makeDatastore(endpoint){
  return RestDatastore({ endpoint })
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
  get batch() { return makeDatastore('batch') }
  get invoice() { return makeDatastore('invoice') }
  get tranState() { return makeDatastore('tranState') }
  get tag() { return makeDatastore('tag') }

  appConfig(configKey) {
    return ky(`appConfig/${configKey}`).json()
  }

  /**
   * checks cache and if not there then does a ky.get
   */
  configFromCache(key) {

  }

}

const _instance = RestStoreApi.factory()

export default _instance
