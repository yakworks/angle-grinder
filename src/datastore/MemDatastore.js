/* eslint-disable no-unused-vars, eqeqeq */
import _ from 'lodash'
import { findSomeDeep, qbe } from '../utils/finders'
import { isString } from '../utils/inspect'

/**
 * Local memory based datastore
 */
const MemDatastore = ({
  mockDelay = 0,
  picklistFields = ['id', 'name'],
  data = [],
  idProp = 'id'
} = {}) => {

  //full data
  let dataCache = data
  //the filtered data after a search
  let viewData = data
  //the paged view of the data {data:[...], page: , records: , total: }
  let pagerData

  let _eqFn = (l, r) => l[this._idProp] === r[this._idProp]

  let props = {mockDelay, picklistFields, data, idProp}

  const methods = {
    delay(ms) {
      ms = ms || this.mockDelay
      return new Promise(resolve => setTimeout(resolve, ms))
    },

    async getData(){
      await this.delay()
      return dataCache
    },

    async getViewData(){
      await this.delay()
      return viewData
    },

    getPagerData(){
      return pagerData
    },

    async _commit(newData) {
      dataCache = newData
      return dataCache
    },

    // updates the dataView and the pager
    updateViewData(filteredData) {
      viewData = filteredData
    },

    async search(params = {}) {
      let {q, qSearch, sort, order} = params

      let items = await this.getData()

      const isSearch = q || qSearch

      if (isSearch) items = this.filter(items, {q, qSearch})

      if (sort) {
        const sortobj = sort.split(',').reduce((acc, item) => {
          const sortar = item.trim().split(':')
          acc.sort.push(sortar[0])
          acc.order.push(sortar[1])
          return acc
        }, { sort: [], order: [] })
        items = _.orderBy(items, sortobj.sort, sortobj.order)
      }
      this.updateViewData(items)
      let { page, max} = params
      this.paginate({page, max})
      return items
    },

    // query by example object, returns the filtered
    qbe(items, qbeObject) {
      return qbe(items, qbeObject)
    },

    /**
     * Fuzzy search.
     * @param {*} searchKey
     * @returns the filtered items
     */
    qSearch(items, searchKey) {
      let foundItems = findSomeDeep(items, searchKey)
      // console.log("qSearch foundItems items", foundItems)
      return foundItems
    },

    /**
     * filters down the items using qSearch or qbe
     * @returns the filtered items
     */
    filter(items, {q, qSearch}) {
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
        filtered = this.qbe(items, q)
      }
      // if it also has text qSearch then
      if(qSearch){
        filtered = this.qSearch(filtered, qSearch)
        // console.log("qSearch filtered items", filtered)
      }

      return filtered
    },

    async picklist(p) {

      let items = this.search(p, this.picklistFields)
      let flds = this.picklistFields

      items = items.reduce((acc, item) => {
        acc.push(_.pick(item, flds))
        return acc
      }, [])
      return items
    },

    /** Returns a promise for the item with the given identifier */
    async get(id) {
      const items = await this.getData()
      const item = items.find(item => item.id == id)
      return item
    },

    /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
    async save(item) {
      return item[this._idProp] ? this.put(item) : this.post(item)
    },

    /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
    async post(item) {
      let data = await this.getData()
      item.id = _.max(data.map(it => it.id)) + 1
      data.push(item)
      data = this._commit(data)
      return item
    },

    /** Returns a promise to save (PUT) an existing item. */
    async put(item) {
      let data = await this.getData()
      const idx = this.findItemIndex(data, item)
      data[idx] = item
      data = this._commit(data)
      return data[idx]
    },

    /** Returns a promise to remove (DELETE) an item. */
    async remove(id) {
      const intId = parseInt(id)
      const data = await this.getData()
      _.remove(data, function(item) {
        return item.id === intId
      })
      return this._commit(data)
    },

    async bulkUpdate(muItem) {
      const items = await this.getData()
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
    },

    findItemIndex(data, item) {
      const idx = data.findIndex(this._eqFn.bind(null, item))
      if (idx === -1) throw Error(`${item} not found in ${this}`)
      return idx
    },

    /**
     * paginates the current viewData, assigns the pager to page
     */
    async paginate({ page = 1, max = 20}) {
      let data = await this.getViewData()
      pagerData = {
        data: data.slice((page - 1) * max, page * max),
        page: page,
        records: data.length,
        total: Math.floor(data.length / max) + (data.length % max === 0 ? 0 : 1)
      }
      return pagerData
    },

    async countTotals(field) {
      const items = await this.getData()
      return { [field]: items.reduce((sum, item) => sum + item.amount, 0) }
    }
  }

  return {
    ...props,
    ...methods,
  }
}

export default MemDatastore
