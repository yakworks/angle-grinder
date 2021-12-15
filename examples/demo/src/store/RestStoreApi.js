// import RestDataApi from 'angle-grinder/src/dataApi/RestDataApi'
import RestDataService from 'angle-grinder/src/dataservice/rest/RestDataService'
import ky from 'angle-grinder/src/dataservice/ky'

// function makeDataApi(endpoint){
//   return new RestDataApi(`api/${endpoint}`)
// }

function makeDataService(endpoint){
  return RestDataService({ endpoint })
}

const restStoreApi = {
  get customer() { return makeDataService('customer') },
  get batch() { return makeDataService('batch') },
  get invoice() { return makeDataService('invoice') },
  get tranState() { return makeDataService('tranState') },
  get tag() { return makeDataService('tag') },

  appConfig(configKey) {
    return ky(`appConfig/${configKey}`).json()
  }
}

export default restStoreApi
