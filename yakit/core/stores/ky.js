import {default as KY}  from 'ky'
import { ensurePrefix } from '../ensure'
/**
 * @typedef {import('ky/distribution/types/ky').KyInstance} KyInstance
 * @typedef {import('ky').ResponsePromise} ResponsePromise
 */


// subscriber's handlers, allows to add subs without needing to create a new ky
let subs = {
  before: [],
  after: []
}

const defaults = {
  prefixUrl: '/api',
  hooks: {
    beforeRequest: [
      request => { subs.before.forEach(sub => sub(request)) }
    ],
    afterResponse: [
			(_request, _options, response) => { subs.after.forEach(sub => sub(_request, _options, response)) }
    ]
  }
}

export const KyFactory = {
  defaults,


  /**
   * the current ky instance
   * @type {KyInstance}
   */
  get ky(){ return this._KyInstance},

  /**
   * builds the default ky with any extra overide options passed in
   * shouldn't need to do this more than once really, and then KySupport.ky can be used
   *
   * @param {Object} opts extra options
   * @returns {KyInstance} the instance
   */
  build(opts){
    this._KyInstance = KY.create({...this.defaults, ...opts})
    return this._KyInstance
  },

  /**
   * can subscribe to ky hooks and not need to recreate a ky to have them fired
   * Used for loading indicators and logging
   *
   * @param {string} type before or after
   * @param {function} handler funtion, see ky for what it can expect depending on the before or after
   * @returns {function} a function to call to unsub to avoid mem leaks
   */
  subscribe(type, handler) {
    subs[type] = [...subs[type], handler] // add handler to the array of subscribers
    return () => subs[type] = subs[type].filter(sub => sub !== handler)   // return unsubscribe function
  },

  /**
   * opinionated way to add Bearer token header. add a beforeRequest sub to add the header
   */
  enableAuthHeader() {
    const authHandler = request => {
      if (request.url.indexOf('login') > -1) return
      request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('bearer'))
    }
    this.subscribe('before', authHandler)
  }
}

KyFactory.build()
export default KyFactory.ky;

/**
 * object uses ky to make fetch rest calls tied to a specific endpoint.
 * If ky baseUrl is http://foo.9ci.io/api and key passed in is go/bar then
 * all the verb calls will be against http://foo.9ci.io/api/go/bar.
 * The 'path' is an action param, a term for the controller method or id on the server. AKA "rpc" or ID.
 *  - the path is just appended to the base endpoint url.
 *  - also where we put the id. so /api/go/bar/{id} is /api/go/bar/{path}
 *
 * @param {string} key uri to be appended to the baseUrl in ky.
 * @returns the kyFetch object helper
 */
export const kyFetch = key => {

  /**
   * pass method into args. can also pass 'path' and it will be appended to key.
   * path is where to put the {id} path param. so to get /api/customer/1, pass 1 into the path
   *
   * @param {{ method: string, path: string }} param0 the method is the rest verb, path is the postfix to append
   * @returns {ResponsePromise} the json result
   */
  function kyFetch({method = 'get', path = '', ...opts}){
    path = ensurePrefix(path, '/')
    let fullPath = `${key}${path}`
    return KyFactory.ky(`${key}${path}`, {...opts, method})
  }

  return {
    fetch: kyFetch,
    /**
     * the ky instance
     * @type {KyInstance}
     */
    get ky(){ return KyFactory.ky},

    async get(opts){
      //get is default, we dont need to pass it in
      return kyFetch(opts).json()
    },

    async getById(id, opts){
      //get is default, we dont need to pass it in
      return kyFetch({ path: id , ...opts}).json()
    },

    async post(opts){
      return kyFetch({...opts, method: 'post'}).json()
    },

    async put(opts){
      return kyFetch({...opts, method: 'put'}).json()
    },

    async patch(opts){
      return kyFetch({...opts, method: 'patch'}).json()
    },

    async delete(opts){
      return kyFetch({...opts, method: 'delete'}).json()
    }

  }
}
