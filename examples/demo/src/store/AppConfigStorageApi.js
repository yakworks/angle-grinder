import {pushToArr, guid, setProp} from "../utils/util";
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
   * @param $http Pass in the $http service
   * @param $timeout Pass in the $timeout service
   * @param $q Pass in the $q service
   * @param sessionStorageKey The session storage key. The data will be stored in browser's session storage under this key.
   * @param sourceUrl The url that contains the initial data.
   */
  constructor($http, $timeout, $q, sessionStorageKey, sourceUrl) {
    let data, fromSession = sessionStorage.getItem(sessionStorageKey);
    // A promise for *all* of the data.
    this._data = undefined;

    // For each data object, the _idProp defines which property has that object's unique identifier
    this._idProp = "id";

    // A basic triple-equals equality checker for two values
    this._eqFn = (l, r) => l[this._idProp] === r[this._idProp];

    // Services required to implement the fake REST API
    this.$q = $q;
    this.$timeout = $timeout;
    this.sessionStorageKey = sessionStorageKey;

    if (fromSession) {
      try {
        // Try to parse the existing data from the Session Storage API
        data = JSON.parse(fromSession);
      } catch (e) {
        console.log("Unable to parse session messages, retrieving intial data.");
      }
    }

    let stripHashKey = (obj) =>
        setProp(obj, '$$hashKey', undefined);

    // Create a promise for the data; Either the existing data from session storage, or the initial data via $http request
    this._data = (data ? $q.resolve(data) : $http.get(sourceUrl).then(resp => resp.data))
        .then(this._commit.bind(this))
        .then(() => JSON.parse(sessionStorage.getItem(sessionStorageKey)))
        .then(array => array.map(stripHashKey));

  }

  /** Saves all the data back to the session storage */
  _commit(data) {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(data));
    return this.$q.resolve(data);
  }

  /** Helper which simulates a delay, then provides the `thenFn` with the data */
  all(thenFn) {
    return this.$timeout(() => this._data, REST_DELAY).then(thenFn);
  }

  /** Given a sample item, returns a promise for all the data for items which have the same properties as the sample */
  search(exampleItem) {
    let contains = (search, inString) =>
        ("" + inString).indexOf("" + search) !== -1;
    let matchesExample = (example, item) =>
        Object.keys(example).reduce((memo, key) => memo && contains(example[key], item[key]), true);
    return this.all(items =>
        items.filter(matchesExample.bind(null, exampleItem)));
  }

  //
  query(params) {
    return this.all(items => {
      let filtered = items
      if(params.filters) filtered = this.filter(items, params)
      return filtered
    })
  }

  filter(items, params) {
    let filtered = items
    let filter = JSON.parse(params.filters)
    // quick search
    if(filter.quickSearch) filtered = filterIt(items, filter.quickSearch)
    return filtered
  }

  /** Returns a promise for the item with the given identifier */
  get(id) {
    return this.all(items =>
        items.find(item => item[this._idProp] === id));
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item);
  }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  post(item) {
    item[this._idProp] = guid();
    return this.all(items => pushToArr(items, item)).then(this._commit.bind(this));
  }

  /** Returns a promise to save (PUT) an existing item. */
  put(item, eqFn = this._eqFn) {
    return this.all(items => {
      let idx = items.findIndex(eqFn.bind(null, item));
      if (idx === -1) throw Error(`${item} not found in ${this}`);
      items[idx] = item;
      return this._commit(items).then(() => item);
    });
  }

  /** Returns a promise to remove (DELETE) an item. */
  remove(item, eqFn = this._eqFn) {
    return this.all(items => {
      let idx = items.findIndex(eqFn.bind(null, item));
      if (idx === -1) throw Error(`${item} not found in ${this}`);
      items.splice(idx, 1);
      return this._commit(items).then(() => item);
    });
  }

  // load results of a query into gridCtrl
  gridLoader(gridCtrl, params) {
    gridCtrl.toggleLoading(true)
    this.query(params)
    .then( response => {
      let data = _.orderBy(response, params.sort , params.order)
      return gridCtrl.addJSONData(data)
    })
    .finally(() =>  {
      gridCtrl.toggleLoading(false)
    })
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
