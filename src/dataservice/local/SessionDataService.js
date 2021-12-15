// import {guid} from "../utils/util"
import MemDataService from './MemDataService'
import ky from 'ky' //simple ky to bypass so we can load a file
import stringify from '../../utils/stringify';
import { isEmpty } from '../../utils/inspect';
import mix from '../../utils/mix-it-with';

/**
 * SessionStorage based datastore
 */
const SessionDataService = (opts) => {

  let { sourceUrl, storageKey, mockDelay = 500 } = opts

  let memDs = MemDataService({...opts, mockDelay})

  let sessionDs = {

    getSessionData() {
      const fromSession = sessionStorage.getItem(storageKey)
      if (fromSession) {
        return JSON.parse(fromSession)
      }
    }
  }

  //overrides to load data on first search
  sessionDs.search = async (params = {}) => {
    console.log("SessionDatastore search", params)
    await sessionDs.init()
    return memDs.search(params)
  }

  //override the getData to pull it from the rest
  sessionDs.init = async () =>{
    // try {
      // let data = sessionDs.checkSession()
      let dataCache = sessionDs.stores.getDataCache()
      //if dataCache is populated then its been init already
      if (isEmpty(dataCache)) {
        console.log(`using ${storageKey} in sessionStorage`)
        // let sessionCache = sessionDs.getSessionData()
        // if(!sessionCache){
        //   //pull it from the endpoint
        //   const sessionCache = await ky.get(sourceUrl).json()
        //   sessionStorage.setItem(storageKey, stringify(sessionCache))
        // }
        const sessionCache = await ky.get(sourceUrl).json()
        sessionStorage.setItem(storageKey, stringify(sessionCache))
        sessionDs.stores.setDataCache(sessionCache)
        return sessionCache
      }
    // } catch (e) {
    //   console.log(`Unable to parse session for ${sourceUrl}, retrieving intial data.`, e)
    // }
  }

  return mix(sessionDs).with(memDs)

}

export default SessionDataService