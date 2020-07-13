// import _ from 'lodash'
const _ = require('lodash')
/**
 * Memstore Api, can be extended or used as a test express back end for a rest server.
 * Uses commonjs and not es6 exports so it compatible with node and doesn't need babel
 */
class MemDataApi {
  // used to simulate a delay is used for testing
  mockDelay = 0

  /**
   * @param data the data to initialize this with
   */
  constructor(data, mockDelay) {
    this.mockDelay = mockDelay || this.mockDelay

    // A promise for *all* of the data.
    this._data = data// argMap.data;

    // For each data object, the _idProp defines which property has that object's unique identifier
    this._idProp = "id";

    // A basic triple-equals equality checker for two values
    this._eqFn = (l, r) => l[this._idProp] === r[this._idProp];
  }

  async getData(){
    return this._data
  }

  _commit(data) {
    this._data = data
    return this._data
  }

  delay(ms) {
    ms = ms || this.mockDelay
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async data() {
    await this.delay()
    return this.getData()
  }

  /** TODO - Given a sample item, returns a promise for all the data for items which have the same properties as the sample */
  async qbe(exampleItem) {
    let contains = (search, inString) =>
        ("" + inString).indexOf("" + search) !== -1;
    let matchesExample = (example, item) =>
        Object.keys(example).reduce((memo, key) => memo && contains(example[key], item[key]), true);

    let items = await this.data()
    return items.filter(matchesExample.bind(null, exampleItem))
  }

  //
  async search(params) {
    // console.log("query params", params)
    let filtered = await this.data()
    // console.log("query filtered", filtered)
    if(params.filters) filtered = this.filter(filtered, params)
    filtered = _.orderBy(filtered, params.sort , params.order)
    // console.log("query filtered orderBy", filtered)
    let paged = pagination(filtered, params)
    // console.log("query paged", paged)
    return paged
  }

  //
  async pickList(params) {
    let dta = await this.data()
    if(params && params.filters) dta = this.filter(dta, params)
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
    let items = await this.data()
    let item = items.find(item => item.id == id)
    return item
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  async save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item);
  }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  async post(item) {
    let data = await this.data()
    item.id = _.max(data.map(it => it.id)) + 1
    data.push(item)
    data = this._commit(data)
    return item
  }

  /** Returns a promise to save (PUT) an existing item. */
  async put(item) {
    let data = await this.data()
    let idx = this.findItemIndex(data, item)
    data[idx] = item
    data = this._commit(data)
    return data[idx]
  }

  /** Returns a promise to remove (DELETE) an item. */
  async remove(id) {
    const intId = parseInt(id)
    let data = await this.data()
    _.remove(data, function(item) {
      return item.id === intId
    })
    return this._commit(data)
  }

  findItemIndex(data, item) {
    let idx = data.findIndex(this._eqFn.bind(null, item))
    if (idx === -1) throw Error(`${item} not found in ${this}`)
    return idx
  }

}

function pagination(rows, query) {
  return {
    rows: rows.slice((query.page - 1) * query.max, query.page * query.max),
    page: query.page,
    records: rows.length,
    total: Math.floor(rows.length / query.max) + (rows.length % query.max === 0 ? 0 : 1)
  }
}

const findById = (data, id) => {
  numId = parseInt(id)
  return data.find((obj) => obj.id === numId)
}

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

module.exports = MemDataApi
