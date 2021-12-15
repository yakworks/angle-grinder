// import RestDataApi from 'angle-grinder/src/dataApi/RestDataApi'
import RestDatastore from 'angle-grinder/src/datastore/rest/RestDatastore'
import ky from 'angle-grinder/src/datastore/ky'

// function makeDataApi(endpoint){
//   return new RestDataApi(`api/${endpoint}`)
// }

function makeDatastore(endpoint){
  return RestDatastore({ endpoint })
}

const restStoreApi = {
  get customer() { return makeDatastore('customer') },
  get batch() { return makeDatastore('batch') },
  get invoice() { return makeDatastore('invoice') },
  get tranState() { return makeDatastore('tranState') },
  get tag() { return makeDatastore('tag') },

  appConfig(configKey) {
    return ky(`appConfig/${configKey}`).json()
  }
}

export default restStoreApi
