import {guid} from "../utils/util";
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
export default class SessionStorageApi {
  /**
   * Creates a new SessionStorage object
   *
   * @param sessionStorageKey The session storage key. The data will be stored in browser's session storage under this key.
   * @param sourceUrl The url that contains the initial data.
   */
  constructor(sessionStorageKey, sourceUrl) {
    // let data, fromSession = sessionStorage.getItem(sessionStorageKey);
    // A promise for *all* of the data.
    this._data = undefined;

    // For each data object, the _idProp defines which property has that object's unique identifier
    this._idProp = "id";

    // A basic triple-equals equality checker for two values
    this._eqFn = (l, r) => l[this._idProp] === r[this._idProp];

    // Services required to implement the fake REST API
    this.sessionStorageKey = sessionStorageKey;
    console.log('SessionStorageApi constructor')
    this.sourceUrl = sourceUrl
    //this._data = this.getData(sourceUrl)
  }

  async getData(sourceUrl){
    console.log('getData with sourceUrl', sourceUrl)
    try {
      let data = checkSession()
      if(data) return data
    } catch (e) {
      console.log(`Unable to parse session for ${sourceUrl}, retrieving intial data.`);
    }
    const parsed = await ky.get(sourceUrl).json()
    this._commit(parsed)
    const array = JSON.parse(sessionStorage.getItem(this.sessionStorageKey))
    // console.log("array", array)
    return array
  }

  checkSession() {
    const fromSession = sessionStorage.getItem(this.sessionStorageKey)
    if (fromSession) {
      return JSON.parse(fromSession)
    }
  }

  /** Saves all the data back to the session storage */
  _commit(data) {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(data));
    return data
  }

  delay(ms = REST_DELAY) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  /** Helper which simulates a delay, then provides the `thenFn` with the data */
  async dataDelay() {
    await this.delay()
    return this.getData(this.sourceUrl)
  }

  /** Given a sample item, returns a promise for all the data for items which have the same properties as the sample */
  async search(exampleItem) {
    let contains = (search, inString) =>
        ("" + inString).indexOf("" + search) !== -1;
    let matchesExample = (example, item) =>
        Object.keys(example).reduce((memo, key) => memo && contains(example[key], item[key]), true);

    let items = await this.dataDelay()
    return items.filter(matchesExample.bind(null, exampleItem))
  }

  //
  async query(params) {
    let filtered = await this.dataDelay()
    if(params.filters) filtered = this.filter(filtered, params)
    console.log('filtered', filtered)
    return filtered
  }

  //
  async pickList(params) {
    let dta = await this.dataDelay()
    if(params?.filters) dta = this.filter(dta, params)
    dta = dta.reduce(function(acc, item) {
      acc.push(_.pick(item, ['id', 'name']))
      return acc
    }, [])
    return dta
  }

  filter(items, params) {
    let filtered = items
    let filter = JSON.parse(params.filters)
    // quick search
    if(filter.quickSearch) filtered = filterIt(items, filter.quickSearch)
    return filtered
  }

  /** Returns a promise for the item with the given identifier */
  async get(id) {
    let items = await this.dataDelay()
    let item = items.find(item => item.id == id)
    return item
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  async save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item);
  }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  async post(item) {
    item[this._idProp] = guid();
    let items = await this.dataDelay()
    items.push(item)
    this._commit(items)
    return item
  }

  /** Returns a promise to save (PUT) an existing item. */
  async put(item, eqFn = this._eqFn) {
    let data = await this.dataDelay()
    let idx = findItemIndex(data, item)
    data[idx] = item
    this._commit(data)
    return item
  }

  /** Returns a promise to remove (DELETE) an item. */
  async remove(item, eqFn = this._eqFn) {
    let data = await this.dataDelay()
    let idx = findItemIndex(data, item)
    data.splice(idx, 1)
    return this._commit(data)
  }

  findItemIndex(data, item, eqFn = this._eqFn) {
    let idx = data.findIndex(eqFn.bind(null, item))
    if (idx === -1) throw Error(`${item} not found in ${this}`)
    return idx
  }

  // load results of a query into gridCtrl
  async gridLoader(gridCtrl, params) {
    gridCtrl.toggleLoading(true)
    try {
      let data = await this.query(params)
      data = _.orderBy(data, params.sort , params.order)
      return gridCtrl.addJSONData(data)
    } catch(error) {
      console.error(error)
    } finally {
      gridCtrl.toggleLoading(false)
    }
  }
}
// SessionStorage.$inject = ['$http', '$timeout', '$q', 'sessionStorageKey', 'sourceUrl'];

// function filterIt(arr, searchKey) {
//   return arr.filter(obj => _.includes(obj,searchKey))
// }

function filterIt(arr, searchKey) {
  return arr.filter(obj => hasSome(obj, searchKey))
}

function hasSome(obj, searchKey){
  return Object.keys(obj).some(key => {
    const val = obj[key]
    if(_.isPlainObject(val)){
      return hasSome(val, searchKey)
    } else {
      return _.isString(val) ? val.toString().toLowerCase().includes(searchKey) : val == searchKey
    }
  })
}
