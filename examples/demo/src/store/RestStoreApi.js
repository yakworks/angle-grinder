import RestDataApi from 'angle-grinder/src/dataApi/RestDataApi'
import ky from 'ky'

// TODO: make it configurable on demo start
function makeDataApi(endpoint){
  return new RestDataApi(`http://localhost:8080/api/${endpoint}`)
}

/** main holder for api*/
export class RestStoreApi {
  _cached = {}

  static factory() {
    return new RestStoreApi()
  }

  constructor() {
  }

  get customer() { return makeDataApi("customer")}
  get invoice() { return makeDataApi("invoice")}
  get tranState() { return makeDataApi("tranState")}
  get tag() { return makeDataApi("tag")}

  appConfig(configKey) {
    return ky.get(`api/appConfig/${configKey}`).json()
  }

  /**
   * checks cache and if not there then does a ky.get
   */
  configFromCache(key) {

  }

}

const _instance = RestStoreApi.factory()

export default _instance
