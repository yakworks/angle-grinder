/* eslint-disable no-unused-vars, eqeqeq */
import _ from 'lodash'
import { findSomeDeep, qbe, findIndexById } from '../../finders'
import { isString } from '../../is'
import mix from '../../mix/mix-it-with'
import {crudQueryModel} from '../crudQueryModel'

/**
 * Local memory based data service
 */
const MemDataService = ({
  mockDelay = 0,
  picklistFields = ['id', 'name'],
  initData = [],
  ident = 'id'
} = {}) => {

  const ds = {
    initData,
    ident
  }

  ds.delay = (ms) => {
    ms = ms || mockDelay
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  ds.search = async (params = {}) => {
    console.log("MemDataService search", params)
    await ds.delay()

    let {q, qSearch, sort, order} = params

    let items = ds.stores.getMasterData()

    const isSearch = q || qSearch

    if (isSearch) items = ds.filter(items, {q, qSearch})

    if (sort) {
      let sortobj = sort
      //will be string if coming from query param or object if used locally
      // if(isString(sort)){
      //   sortobj = sort.split(',').reduce((acc, item) => {
      //     const sortar = item.trim().split(':')
      //     acc.sort.push(sortar[0])
      //     acc.order.push(sortar[1])
      //     return acc
      //   }, { sort: [], order: [] })
      // }
      Object.keys(sort).forEach( prop => {
        items = _.orderBy(items, prop, sort[prop])
      })
      //since the sort keys can be nested then need to cylce over and do them one by one
      // items = _.orderBy(items, sortobj.sort, sortobj.order)
    }
    ds.stores.setData(items)
    let { page, max} = params
    ds.paginate({data: items, page, max})
    return items
  }

  ds.qbe = (items, qbeObject) => {
    return qbe(items, qbeObject)
  }

  /**
     * Fuzzy search.
     * @param {*} searchKey
     * @returns the filtered items
     */
  ds.qSearch = (items, searchKey) => {
    let foundItems = findSomeDeep(items, searchKey)
    // console.log("qSearch foundItems items", foundItems)
    return foundItems
  }

  /**
     * filters down the items using qSearch or qbe
     * @returns the filtered items
     */
  ds.filter = (items, {q, qSearch}) => {
    // console.log("filter params", params)
    let filtered = items

    if (q) {
      if (isString(q)){
        if (q.trim().startsWith('{')){
          q = JSON.parse(q)
        } else {
          //its a string for qSearch
          qSearch = q
          // since its string null out q now so only qSearch gets run in a bit
          q = null
        }
      } else if(q['$qSearch']) {
        qSearch = q['$qSearch']
        delete q['$qSearch']
      }
    }
    //if q has something at this point
    if(q){
      filtered = ds.qbe(items, q)
    }
    // if it also has text qSearch then
    if(qSearch){
      filtered = ds.qSearch(filtered, qSearch)
      // console.log("qSearch filtered items", filtered)
    }

    return filtered
  }

  ds.picklist = async (p) => {

    let items = await ds.search(p)
    let flds = picklistFields

    items = items.reduce((acc, item) => {
      acc.push(_.pick(item, flds))
      return acc
    }, [])
    return items
  }

  /** Returns a promise for the item with the given identifier */
  ds.get = async (id) => {
    const items = await ds.stores.getMasterData()
    const item = items.find(item => item.id == id)
    return item
  }

  /**
   * Create if no id prop or Update if it has id prop
   * Returns a promise to save the item.
   * It delegates to put() or post() if the object has or does not have an identifier set
   */
  ds.save = async (item) => {
    return item[ident] ? ds.update(item) : ds.create(item)
  }

  /**
   * Returns a promise to save (POST) a new item.
   * The item's identifier is auto-assigned.
   */
  ds.create = async (item) => {
    ds.stores.masterDataStore.update( data => {
      item.id = _.max(data.map(it => it.id)) + 1
      data.push(item)
      return data
    })
    return item
  },

  /** Returns a promise to save (PUT) an existing item. */
  ds.update = async (item) => {
    ds.stores.masterDataStore.update( data => {
      const idx = ds.findIndexById(data, item[ident])
      data[idx] = item
      return data
    })
    return item
  }

  /**
   * Returns a promise to remove (DELETE) an item.
   */
  ds.remove = async (id) => {
    ds.stores.masterDataStore.update( data => {
      // const intId = parseInt(id)
      const idx = findIndexById({ list:data, id })
      //splice delete
      data.splice(idx, 1);
      return data
    })
  }

  ds.bulkUpdate = async (muItem) => {
    const { data: updateData, ids } = muItem
    const updateItems = []
    ds.stores.masterDataStore.update( data => {
      ids.forEach(id => {
        let item = ds.findById(data, id)
        item = _.merge(item, updateData)
        // console.log('merged item', items[idx])
        updateItems.push(item)
      })
      return data
    })
    return { data: updateItems }
  }

  ds.findById = (data, id) => {
    const idx = ds.findIndexById(data, id)
    return idx === -1 ? false : data[idx]
  }

  ds.findIndexById = (data, id) => {
    return findIndexById({ list: data, id , ident})
  }

  ds.paginate = async ({ data, page = 1, max = 20}) => {
    let newPage = {
      data: data.slice((page - 1) * max, page * max),
      page: page,
      records: data.length,
      total: Math.floor(data.length / max) + (data.length % max === 0 ? 0 : 1)
    }
    ds.stores.setPageView(newPage)
    return newPage
  }

  ds.countTotals = async (field) => {
    const items = await ds.stores.getMasterData()
    return { [field]: items.reduce((sum, item) => sum + item.amount, 0) }
  }

  return mix(ds).it(MemDataService).with(
    crudQueryModel
  )
}

export default MemDataService
