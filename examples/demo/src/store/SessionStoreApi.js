// import {guid} from "../utils/util"
import MemDataApi from './MemDataApi'
import ky from 'ky'
import _ from 'lodash'

const REST_DELAY = 500
/**
 * This class simulates a RESTful resource, but the API calls fetch data from
 * Session Storage instead of an HTTP call.
 *
 * Once configured, it loads the initial (pristine) data from the URL provided (using HTTP).
 * It exposes GET/PUT/POST/DELETE-like API that operates on the data.  All the data is also
 * stored in Session Storage.  If any data is modified in memory, session storage is updated.
 * If the browser is refreshed, the SessionStorage object will try to fetch the existing data from
 * the session, before falling back to re-fetching the initial data using HTTP.
 *
 * For an example, please see dataSources.js
 */
export default class SessionStorageApi extends MemDataApi {
  /**
   * Creates a new SessionStorage object
   *
   * @param storageKey The session storage key. The data will be stored in browser's session storage under this key.
   * @param sourceUrl The url that contains the initial data.
   */
  constructor(storageKey, sourceUrl) {
    super({}, REST_DELAY)
    this._data = undefined;

    // For each data object, the _idProp defines which property has that object's unique identifier
    this._idProp = "id";

    // A basic triple-equals equality checker for two values
    this._eqFn = (l, r) => l[this._idProp] === r[this._idProp];

    // Services required to implement the fake REST API
    this.storageKey = storageKey;
    this.sourceUrl = sourceUrl
  }

  async getData(){
    try {
      let data = this.checkSession()
      if(data) {
        console.log(`found ${this.storageKey} in sessionStorage`)
        return data
      }
    } catch (e) {
      console.log(`Unable to parse session for ${this.sourceUrl}, retrieving intial data.`, e);
    }
    const parsed = await ky.get(this.sourceUrl).json()
    this._commit(parsed)
    const array = JSON.parse(sessionStorage.getItem(this.storageKey))
    // console.log("array", array)
    return array
  }

  checkSession() {
    const fromSession = sessionStorage.getItem(this.storageKey)
    if (fromSession) {
      return JSON.parse(fromSession)
    }
  }

  /** Saves all the data back to the session storage */
  _commit(data) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
    return data
  }

}
