import ky from 'ky'
import _ from 'lodash'

/**
 * This common wrapper around RESTful resource
 */
export default class RestDataApi {
  /**
   * Creates a new SessionStorage object
   *
   * @param prefixUrl The endpoint url prefix ex: /api or http://foo.com/api
   */
  constructor(endpoint) {
    // this.prefixUrl = prefixUrl
    this.endpoint = endpoint
    // this.api = ky.create({prefixUrl: prefixUrl});
    this._idProp = 'id'
  }

  //
  async search(params) {
    const opts = {searchParams: params}
    // console.log("query opts", opts)
    const data = await ky.get(this.endpoint, opts).json()
    return data
  }

  //
  async pickList(params) {
    const opts = {searchParams: params}
    // console.log("query opts", opts)
    const data = await ky.get(`${this.endpoint}/pickList`, opts).json()
    return data
  }

  /** Returns a promise for the item with the given identifier */
  async get(id) {
    const item = await ky.get(`${this.endpoint}/${id}`).json()
    return item
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  async save(item) {
    console.log("save item", item)
    return item[this._idProp] ? this.put(item) : this.post(item);
  }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  async post(item) {
    console.log("post item", item)
    let newItem = await ky.post(`${this.endpoint}`, {json: item}).json()
    console.log("posted newItem", newItem)
    return newItem
  }

  /** Returns a promise to save (PUT) an existing item. */
  async put(item) {
    console.log("put item", item)
    let newItem = await ky.put(`${this.endpoint}`, {json: item}).json()
    return newItem
  }

  /** Returns a promise to remove (DELETE) an item. */
  async remove(id) {
    await ky.delete(`${this.endpoint}/${id}`)
    return true
  }
}
