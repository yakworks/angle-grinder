import kyApi from './kyApi'
import prune from '@yakit/core/prune';

/**
 * A common wrapper around RESTful resource
 */
export default class RestDataApi {
  /**
   * Creates a new SessionStorage object
   *
   * @param prefixUrl The endpoint url prefix ex: /api or http://foo.com/api
   * @param customKyApi Allows to override with custom kyApi
   */
  constructor(endpoint, customKyApi) {
    // this.prefixUrl = prefixUrl
    this.endpoint = endpoint
    // this.api = ky.create({prefixUrl: prefixUrl});
    this._idProp = 'id'
    this.kyApi = customKyApi || kyApi
  }

  // getter makes sure it always pull the current kyApi.ky
  get api(){
    return this.kyApi.ky
  }

  /**
   * adds searchParams, which are the query params ( the part after the ? )
   * and then calls the get. if the params has a q property and its a string then
   * @param {*} params
   */
  async search(params) {
    let cleanParams = this.setupQ(params)
    const opts = { searchParams: cleanParams }
    const data = await this.api.get(this.endpoint, opts).json()
    return data
  }

  async picklist(params) {
    let cleanParams = this.setupQ(params)
    const opts = { searchParams: cleanParams }
    const data = await this.api.get(`${this.endpoint}/picklist`, opts).json()
    return data
  }

  // prunes params and stringifies the q param if exists
  setupQ(params){
    let prunedParms = prune(params)
    let q = prunedParms.q
    if(_.isObject(q)) prunedParms.q = JSON.stringify(q)
    //stringify sort and remove the
    let sort = prunedParms.sort
    if(_.isObject(sort)) prunedParms.sort = JSON.stringify(sort).replace(/{|}|"/g, '')
    return prunedParms
  }

  /** Returns a promise for the item with the given identifier */
  async get(id) {
    const item = await this.api.get(`${this.endpoint}/${id}`).json()
    return item
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  async save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item)
  }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  async post(item) {
    const newItem = await this.api.post(`${this.endpoint}`, { json: item }).json()
    return newItem
  }

  /** Returns a promise to save (PUT) an existing item. */
  // TODO: probably should pass id either, or take item.id ?
  async put(item) {
    const newItem = await this.api.put(`${this.endpoint}/${item.id}`, { json: item }).json()
    return newItem
  }

  /** Returns a promise to remove (DELETE) an item. */
  async remove(id) {
    await this.api.delete(`${this.endpoint}/${id}`)
    return true
  }

  async bulkUpdate(muItem) {
    const results = await this.api.post(`${this.endpoint}/bulkUpdate`, { json: muItem }).json()
    return results
  }

  async postAction(path, body) {
    const results = await this.api.post(`${this.endpoint}/${path}`, { json: body }).json()
    return results
  }

  async getAction(path) {
    const results = await this.api.post(`${this.endpoint}/${path}`).json()
    return results
  }

  async countTotals(params) {
    const results = await this.api.post(`${this.endpoint}/countTotals`, { json: params }).json()
    return results
  }
}
