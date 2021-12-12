import kyApi from './kyApi'
import prune from '../utils/prune';

/**
 * A common wrapper around RESTful resource
 */
export const RestDataApi = ({
  endpoint,
  idProp = 'id',
  kyApi = kyApi
}) => {

  //full data
  let dataCache = []
  //the filtered data after a search
  let viewData = []
  //the filtered data after a search
  let activeItem = {}
  //the paged view of the data {data:[...], page: , records: , total: }
  let pager

  let props = {endpoint, idProp, kyApi}

  let methods = {
    // getter makes sure it always pull the configured kyApi.ky
    get api(){
      return kyApi.ky
    },

    /**
     * calls ky with opts and method
     */
    ky(resource, {method = 'get', ...opts}){
      return this.api(`${this.endpoint}${resource}`, {...opts, method}).json()
    },

    async getData(){
      return dataCache
    },

    async getViewData(){
      return viewData
    },

    getPagerData(){
      return pagerData
    },

    updateActiveItem(item) {
      activeItem = item
    },

    /**
     * adds searchParams, which are the query params ( the part after the ? )
     * and then calls the get. if the params has a q property and its a string then
     * @param {*} params
     */
    async search(params) {
      let cleanParams = this.setupQ(params)
      const opts = { searchParams: cleanParams }
      const data = await this.ky('', opts)
      return data
    },

    // prunes params and stringifies the q param if exists
    setupQ(params){
      let pruned = prune(params)
      let { q, sort } = pruned
      if(_.isObject(q)) q = JSON.stringify(q)
      //stringify sort and remove the quotes and brackets
      if(_.isObject(sort)) sort = JSON.stringify(sort).replace(/{|}|"/g, '')
      return {...pruned, q, sort}
    },

    /**
     * gets the item for the id and sets the activeItem to it
     */
    async get(id) {
      const item = await this.ky(`/${id}`)
      updateActive(item)
      return item
    },

    async save(item) {
      return item[this._idProp] ? this.put(item) : this.post(item)
    },

    /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
    async save(item) {
      return item[this._idProp] ? this.put(item) : this.post(item)
    },

    /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
    async post(item) {
      // console.log('post item', item)
      const newItem = await this.api.post(`${this.endpoint}`, { json: item }).json()
      // console.log('posted newItem', newItem)
      return newItem
    },

    /** Returns a promise to save (PUT) an existing item. */
    // TODO: probably should pass id either, or take item.id ?
    async put(item) {
      // console.log('put item', item)
      const newItem = await this.api.put(`${this.endpoint}/${item.id}`, { json: item }).json()
      return newItem
    },

    /** Returns a promise to remove (DELETE) an item. */
    async remove(id) {
      await this.api.delete(`${this.endpoint}/${id}`)
      return true
    },

    async bulkUpdate(muItem) {
      const results = await this.api.post(`${this.endpoint}/bulkUpdate`, { json: muItem }).json()
      return results
    },

    async postAction(path, body) {
      const results = await this.api.post(`${this.endpoint}/${path}`, { json: body }).json()
      return results
    },

    async getAction(path) {
      const results = await this.api.post(`${this.endpoint}/${path}`).json()
      return results
    },

    async countTotals(params) {
      const results = await this.api.post(`${this.endpoint}/countTotals`, { json: params }).json()
      return results
    }
  }
}
