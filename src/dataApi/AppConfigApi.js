import {client as ky} from './ky'

class LocalCache {
  _values = {}

  get(key) { return this._values[key] }
  contains(key) { return key in this._values }
  remove(key) { delete this._values[key] }
  set(key, value) { this._values[key] = value }
  values() { return this._values }
  getSet(key, value) {
    if (!this.contains(key)) {
      this.set(key, typeof value === 'function' ? value() : value)
    }
    return this.get(key)
  }
}
const _cache = new LocalCache()

/** main holder for api */
export class AppConfigApi {
  prefixUrl = 'api/appConfig/'
  // _cache = new MicroCache()

  // constructor() {
  // }

  getConfig(configKey) {
    return this.configFromCache(`${this.prefixUrl}${configKey}`)
  }

  /**
   * checks cache and if not there then does a ky.get
   */
  async configFromCache(key) {
    if (_cache.contains(key)) {
      return _cache.get(key)
    } else {
      const cfg = await ky.get(key).json()
      _cache.set(key, cfg)
      return cfg
    }
  }
}

const _instance = new AppConfigApi()

export default _instance
