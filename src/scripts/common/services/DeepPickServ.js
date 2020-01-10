/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module('angleGrinder.common')

// Get/set the value of a nested property
// @see https://gist.github.com/furf/3208381
app.service('DeepPickServ', function() {
  // get the value of a nested property
  const getDeep = function(obj, path) {
    const keys = path.split('.')

    for (const key of Array.from(keys)) {
      obj = obj[key]
      if (obj === undefined) { return }
    }

    return obj
  }

  // set the value of a nested property
  const setDeep = function(obj, path, value) {
    const keys = path.split('.')
    let i = 0
    let n = keys.length

    n--
    while (i < n) {
      const key = keys[i++]
      obj = (obj[key] = (_.isObject(obj[key]) ? obj[key] : {}))
    }

    return obj[keys[i]] = value
  }

  return function(obj, ...keys) {
    const result = new Object()

    for (const path of Array.from(keys)) {
      const value = getDeep(obj, path)
      if (value !== undefined) { setDeep(result, path, value) }
    }

    return result
  }
})
