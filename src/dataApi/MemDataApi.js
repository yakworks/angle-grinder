/* eslint-disable no-unused-vars, eqeqeq */
// import _ from 'lodash'
const _ = require('lodash')
/**
 * Memstore Api, can be extended or used as a test express back end for a rest server.
 * Uses commonjs and not es6 exports so it compatible with node and doesn't need babel
 */
class MemDataApi {
  // used to simulate a delay is used for testing
  mockDelay = 0
  picklistFields = ['id', 'name']
  /**
   * @param data the data to initialize this with
   */
  constructor(data, mockDelay) {
    this.mockDelay = mockDelay || this.mockDelay

    // A promise for *all* of the data.
    this._data = data// argMap.data;

    // For each data object, the _idProp defines which property has that object's unique identifier
    this._idProp = 'id'

    // A basic triple-equals equality checker for two values
    this._eqFn = (l, r) => l[this._idProp] === r[this._idProp]
  }

  async getData() {
    return this._data
  }

  _commit(data) {
    this._data = data
    return this._data
  }

  delay(ms) {
    ms = ms || this.mockDelay
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async data() {
    await this.delay()
    return this.getData()
  }

  // query by example object
  qbe(items, qbeItem) {
    return items.filter(it => {
      return _.isMatchWith(it, qbeItem, (objValue, srcValue) => {
        // console.log("objValue", objValue)
        //  console.log("srcValue", srcValue)
        if (_.isString(objValue) && _.isString(srcValue)) {
          return objValue.toLowerCase().includes(srcValue.toLowerCase())
        }
        return undefined // return undefined puts it through the built in lodash match
      })
    })
  }

  //
  async search(p) {
    let list = await this.data()
    const isSearch = p._search === 'true' || p._search === true || p.q
    if (isSearch) list = this.filter(list, p)
    if (p.sort) {
      const sortobj = p.sort.split(',').reduce((acc, item) => {
        const sortar = item.trim().split(' ')
        acc.sort.push(sortar[0])
        acc.order.push(sortar[1])
        return acc
      }, { sort: [], order: [] })
      console.log('sortobj', sortobj)
      list = _.orderBy(list, sortobj.sort, sortobj.order)
    }
    const paged = this.pagination(list, p)
    // console.log("query paged", paged)
    return paged
  }

  filter(list, params) {
    let flist = list
    const filters = params.filters ? JSON.parse(params.filters) : null
    if (filters) {
      // const filters = JSON.parse(params.filters)
      if (filters.qSearch) {
        flist = this.searchAny(list, filters.qSearch)
      } else {
        flist = this.qbe(list, filters)
      }
    } else if (params.q) {
      flist = this.searchAny(list, params.q)
    }
    return flist
  }

  //
  async picklist(params) {
    let list = await this.data()
    if (params) {
      if (params.filters || params.q) list = this.filter(list, params)
    }
    list = list.reduce((acc, item) => {
      acc.push(_.pick(item, this.picklistFields))
      return acc
    }, [])
    // console.log('picklist list', list)
    const paged = this.pagination(list, params)
    // console.log('picklist paged', paged)
    return paged
  }

  /** Returns a promise for the item with the given identifier */
  async get(id) {
    const items = await this.data()
    const item = items.find(item => item.id == id)
    return item
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  async save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item)
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
    const idx = this.findItemIndex(data, item)
    data[idx] = item
    data = this._commit(data)
    return data[idx]
  }

  /** Returns a promise to remove (DELETE) an item. */
  async remove(id) {
    const intId = parseInt(id)
    const data = await this.data()
    _.remove(data, function(item) {
      return item.id === intId
    })
    return this._commit(data)
  }

  async massUpdate(muItem) {
    const items = await this.data()
    const { data, ids } = muItem
    const updateItems = []
    ids.forEach(id => {
      // let item = findById(id, items)
      const idx = this.findItemIndex(items, { id: parseInt(id) })
      items[idx] = _.merge(items[idx], data)
      // console.log('merged item', items[idx])
      updateItems.push(items[idx])
    })
    this._commit(items)
    return { data: updateItems }
  }

  findItemIndex(data, item) {
    const idx = data.findIndex(this._eqFn.bind(null, item))
    if (idx === -1) throw Error(`${item} not found in ${this}`)
    return idx
  }

  pagination(items, query) {
    if (!query) query = {}
    const page = query.page || 1
    const max = query.max || 20

    return {
      data: items.slice((page - 1) * max, page * max),
      page: page,
      records: items.length,
      total: Math.floor(items.length / max) + (items.length % max === 0 ? 0 : 1)
    }
  }

  searchAny(arr, searchKey) {
    return arr.filter(obj => hasSomeDeep(obj, searchKey))
  }
}

// function findById(id, data) {
//   const numId = parseInt(id)
//   return data.find((obj) => obj.id === numId)
// }

// function searchAny(arr, searchKey) {
//   return arr.filter(obj => hasSome(obj, searchKey))
// }

function hasSomeDeep(obj, searchKey) {
  return Object.keys(obj).some(key => {
    const val = obj[key]
    if (_.isPlainObject(val)) {
      return hasSomeDeep(val, searchKey)
    } else {
      return _.isString(val) ? val.toString().toLowerCase().includes(searchKey) : val == searchKey
    }
  })
}

module.exports = MemDataApi
