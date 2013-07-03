services = angular.module("angleGrinder.services")

# Takes a nested Javascript object and flatten it.
# see: https://github.com/hughsk/flat
services.factory "flatten", ->
  (target, opts = { delimiter: "." }) ->
    delimiter = opts.delimiter

    getKey = (key, prev) ->
      (if prev then prev + delimiter + key else key)

    step = (object, prev) ->
      Object.keys(object).forEach (key) ->
        isarray = opts.safe and Array.isArray(object[key])
        type = Object::toString.call(object[key])
        isobject = (type is "[object Object]" or type is "[object Array]")
        return step(object[key], getKey(key, prev)) if not isarray and isobject
        output[getKey(key, prev)] = object[key]

    output = {}
    step target
    output
