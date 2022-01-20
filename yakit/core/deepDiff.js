import * as _ from './dash' // babel plugin will only use what is referenced

// TODO these are old functions refactored out of ng. We use them when doing a diff
// for restful posting on the json.
export function deepDiff(oldVal, newVal, allowed, reqFields) {
  var diffRecursive = function(oldVal, newVal, allowed, reqFields) {
    let args
    let diff = {}

    if (!_.isNil(reqFields) && (reqFields.length > 0)) {
      args = []
      args.push(newVal)
      args = args.concat(reqFields)
      diff = deepPick.apply(this, args)
    }

    if (!_.isNil(allowed) && (allowed.length > 0)) {
      args = []
      args.push(newVal)
      args = args.concat(allowed)
      newVal = deepPick.apply(this, args)
    }

    _.forEach(newVal, function(v, k) {
      if ((!_.isNil(oldVal) && _.isEqual(v, oldVal[k])) || (k === '$cachedData')) {
        return
      }
      diff[k] = _.isObject(v) ? diffRecursive(oldVal[k], v) : newVal[k]
      return diff[k]
    })
    return diff
  }

  if (allowed == null) { allowed = [] }
  if (reqFields == null) { reqFields = [] }
  return diffRecursive(oldVal, newVal, allowed, reqFields)
}

export function deepPick(obj, ...keys) {
  const result = {}

  for (const path of Array.from(keys)) {
    const value = getDeep(obj, path)
    if (value !== undefined) { setDeep(result, path, value) }
  }

  return result
}

// get the value of a nested property
export function getDeep(obj, path) {
  const keys = path.split('.')

  for (const key of Array.from(keys)) {
    obj = obj[key]
    if (obj === undefined) { return }
  }

  return obj
}

// set the value of a nested property
export function setDeep(obj, path, value) {
  const keys = path.split('.')
  let i = 0
  let n = keys.length

  n--
  while (i < n) {
    const key = keys[i++]
    obj = (obj[key] = (_.isObject(obj[key]) ? obj[key] : {}))
  }

  obj[keys[i]] = value
  return value
}
