/**
 * Micro Cache
 * - a micro library to handle a inmemory cache
 * - works in node and browser.
 *
 * @tags inmemory, keyvalue, cache, node, browser
*/
export class MicroCache {
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
