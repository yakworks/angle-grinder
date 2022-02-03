// import RestDataApi from 'angle-grinder/src/dataApi/RestDataApi'
import RestDataService from '@yakit/core/stores/rest/RestDataService'
import ky from '@yakit/core/stores/ky'
import {get} from '@yakit/core/dash'
function makeDataService(key){
  return RestDataService({ key })
}

const dataApiFactory = {
  get customer() { return makeDataService('customer') },
  get batch() { return makeDataService('batch') },
  get invoice() { return makeDataService('invoice') },
  get tranState() { return makeDataService('tranState') },
  get tag() { return makeDataService('tag') },

  appConfig(configKey) {
    return ky(`appConfig/${configKey}`).json()
  },

  get(key){
    return get(dataApiFactory, key)
  }
}

export default dataApiFactory
