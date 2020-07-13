import RestDataApi from "./RestDataApi"

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

}

const _instance = RestStoreApi.factory()

export default _instance
