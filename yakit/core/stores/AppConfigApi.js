import { kyFetch } from './ky'
import schemaRefs from '../schema/schemaRefs'
import growl from '@yakit/ui/growl'
import { isEmpty } from '../is'

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
  restApi = kyFetch('appConfig')

  // Allows to use custom function to generate config key, for example namespace_key
  configKeyGenerator = (configKey) => {
    return configKey
  }

  // setConfigKeyGenerator(generatorFunc) {
  //   this.configKeyGenerator = generatorFunc
  // }

  async getConfig(configKey) {
    const cfg = await this.configFromCache(configKey)
    //on the first call ref needs to be pulled, make sure we have it
    await this.ensureRefsLoaded()
    return cfg
  }

  /**
   * checks cache and if not there then does a ky.get
   */
  async configFromCache(configKey) {
    if (_cache.contains(configKey)) {
      return _cache.get(configKey)
    } else {
      let cfg = {}
      try{
        cfg = await this.restApi.get({path: configKey})
      } catch (er) {
        growl.error(er, "problem getting app config from server")
      }
      _cache.set(configKey, cfg)
      return cfg
    }
  }

  /**
   * gets the refs file for json pointer lookups with $ref
   */
  async refs() {
    return this.configFromCache('refs')
  }

  async ensureRefsLoaded(){
    if(schemaRefs.isEmpty()){
      const refs = await this.configFromCache('refs')
      schemaRefs.refs = refs
    }
  }

}

const _instance = new AppConfigApi()

export default _instance
