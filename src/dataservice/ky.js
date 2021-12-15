import {default as KY}  from 'ky'

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
  //the current instance
  get ky(){ return this._KyInstance},

  /**
   * builds the default ky with any extra overide options passed in
   * shouldn't need to do this more than once really, and then KySupport.ky can be used
   *
   * @param {Object} opts extra options
   * @returns the instance
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
 * object uses ky to make fetch rest calls tied to a specific enppoint.
 * If ky baseUrl is http://foo.9ci.io/api and endpoint passed in is bar then
 * all the verb calls will be against http://foo.9ci.io/api/bar.
 * If the op ("rpc") property is passed in with options then it will be appended too.
 *
 * @param {string} endpoint appends to the baseUrl in ky.
 * @returns
 */
export const kyFetch = endpoint => {

  /**
   * pass method into args. can also pass op and it will be appended to endpoint
   *
   * @param {{ method: string, op: string }} param0
   * @returns {Promise<object>} the json result
   */
  async function kyFetch({method = 'get', op = '', ...opts}){
    if(op && !(`${op}`.startsWith('/')) ) op = `/${op}`
    return KyFactory.ky(`${endpoint}${op}`, {...opts, method})
  }

  return {
    fetch: kyFetch,
    /**
     * the ky instance
     */
    get ky(){ return KyFactory.ky},

    async get(opts){
      //get is default, we dont need to pass it in
      return kyFetch(opts).json()
    },

    async getById(id, opts){
      //get is default, we dont need to pass it in
      return kyFetch({ op:`/${id}` , ...opts}).json()
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
