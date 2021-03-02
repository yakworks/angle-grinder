import ky from 'ky'

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
    const opts = { searchParams: params }
    // console.log("query opts", opts)
    const data = await ky.get(this.endpoint, opts).json()
    return data
  }

  //
  async picklist(params) {
    let opts = { searchParams: params }
    if (params) {
      opts = { searchParams: { q: params ? JSON.stringify(params) : '' } }
    }
    // console.log("query opts", opts)
    const data = await ky.get(`${this.endpoint}/picklist`, opts).json()
    return data
  }

  /** Returns a promise for the item with the given identifier */
  async get(id) {
    const item = await ky.get(`${this.endpoint}/${id}`).json()
    return item
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  async save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item)
  }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  async post(item) {
    // console.log('post item', item)
    const newItem = await ky.post(`${this.endpoint}`, { json: item }).json()
    // console.log('posted newItem', newItem)
    return newItem
  }

  /** Returns a promise to save (PUT) an existing item. */
  // TODO: probably should pass id either, or take item.id ?
  async put(item) {
    // console.log('put item', item)
    const newItem = await ky.put(`${this.endpoint}/${item.id}`, { json: item }).json()
    return newItem
  }

  /** Returns a promise to remove (DELETE) an item. */
  async remove(id) {
    await ky.delete(`${this.endpoint}/${id}`)
    return true
  }

  async massUpdate(muItem) {
    const results = await ky.post(`${this.endpoint}/massUpdate`, { json: muItem }).json()
    return results
  }

  async postAction(path, body) {
    const results = await ky.post(`${this.endpoint}/${path}`, { json: body }).json()
    return results
  }

  async getAction(path) {
    const results = await ky.post(`${this.endpoint}/${path}`).json()
    return results
  }

  async countTotals(params) {
    const results = await ky.post(`${this.endpoint}/countTotals`, {json: params}).json()
    return results
  }
}
