import RestDataApi from 'angle-grinder/src/dataApi/RestDataApi'
import ky from 'ky'

function makeDataApi(endpoint){
  return new RestDataApi(`api/${endpoint}`)
}

/** main holder for api*/
export class RestStoreApi {

  static factory() {
    return new RestStoreApi()
  }

  constructor() {
  }

  get customer() { return makeDataApi("customer")}
  get invoice() { return makeDataApi("invoice")}
  get tranState() { return makeDataApi("tranState")}

  appConfig(configKey) {
    return ky.get(`api/appConfig/${configKey}`).json()
  }

}

const _instance = RestStoreApi.factory()

export default _instance
