import kyApi from './kyApi'

const makeLocalCache = opts => {
  const _values = {}

  return {
    get(key) { return _values[key] },
    contains(key) { return key in _values },
    remove(key) { delete _values[key] },
    set(key, value) { _values[key] = value },
    values() { return _values },
    getSet(key, value) {
      if (!this.contains(key)) {
        this.set(key, typeof value === 'function' ? value() : value)
      }
      return this.get(key)
    }
  }
}
const _cache = makeLocalCache()

/** main holder for api */
export class AppConfigApi {
  prefixUrl = 'api/appConfig/'

  // Allows to use custom function to generate config key, for example namespace_key
  configKeyGenerator = (configKey) => {
    return configKey
  }

  setConfigKeyGenerator(generatorFunc) {
    this.configKeyGenerator = generatorFunc
  }

  getConfig(configKey) {
    return this.configFromCache(`${this.prefixUrl}${this.configKeyGenerator(configKey)}`)
  }

  /**
   * checks cache and if not there then does a ky.get
   */
  async configFromCache(key) {
    if (_cache.contains(key)) {
      return _cache.get(key)
    } else {
      let cfg = {}
      try{
        cfg = await kyApi.ky.get(key).json()
      } catch (er) {
        console.error("problem getting config from server")
      }
      _cache.set(key, cfg)
      return cfg
    }
  }
}

const _instance = new AppConfigApi()

export default _instance
