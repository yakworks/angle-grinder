// import {guid} from "../utils/util"
import MemDatastore from './MemDatastore'
import ky from 'ky' //simple ky to bypass so we can load a file
import stringify from '../../utils/stringify';

/**
 * Session based datastore
 */
const SessionDatastore = ({ sourceUrl, storageKey, mockDelay = 500, ...opts }) => {

  let memDs = MemDatastore({...opts, mockDelay})

  let sessionDs = {
    checkSession() {
      const fromSession = sessionStorage.getItem(storageKey)
      if (fromSession) {
        return JSON.parse(fromSession)
      }
    }
  }

  /** Saves all the data back to the session storage */
  sessionDs._commit = (data) => {
    sessionStorage.setItem(storageKey, stringify(data))
    return data
  }

  //override the getData to pull it from the rest
  sessionDs.getData = async () =>{
    try {
      const data = sessionDs.checkSession()
      if (data) {
        console.log(`using ${storageKey} in sessionStorage`)
        return data
      } else {
        //pull it from the endpoint
        const parsed = await ky.get(sourceUrl).json()
        sessionDs._commit(parsed)
        return parsed
      }
    } catch (e) {
      console.log(`Unable to parse session for ${sourceUrl}, retrieving intial data.`, e)
    }
  }

  return {
    ...memDs, ...sessionDs
  }
}

export default SessionDatastore
