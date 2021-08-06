import angular from 'angular'
import gridzModule from '../module'

var gridz = angular.module(gridzModule)

// Takes a nested Javascript object and flatten it.
// see: https://github.com/hughsk/flat
gridz.value('FlattenServ', function(target, opts) {
  if (opts == null) { opts = { delimiter: '.' } }
  const {
    delimiter
  } = opts

  const getKey = function(key, prev) {
    if (prev) { return prev + delimiter + key } else { return key }
  }

  var step = (object, prev) => angular.forEach(Object.keys(object), function(key) {
    const isArray = opts.safe && object[key] instanceof Array
    const type = Object.prototype.toString.call(object[key])
    const isObject = (type === '[object Object]') || (type === '[object Array]')
    const isAngular = key.indexOf('$') >= 0

    if (!isArray && isObject && !isAngular) { return step(object[key], getKey(key, prev)) }
    return output[getKey(key, prev)] = object[key]
  })

  var output = {}
  step(target)
  return output
})
