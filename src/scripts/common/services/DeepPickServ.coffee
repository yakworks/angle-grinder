app = angular.module "angleGrinder.common"

# Get/set the value of a nested property
# @see https://gist.github.com/furf/3208381
app.service "DeepPickServ", ->
  # get the value of a nested property
  getDeep = (obj, path) ->
    keys = path.split(".")

    for key in keys
      obj = obj[key]
      return if obj is undefined

    obj

  # set the value of a nested property
  setDeep = (obj, path, value) ->
    keys = path.split(".")
    i = 0
    n = keys.length

    n--
    while i < n
      key = keys[i++]
      obj = obj[key] = (if _.isObject(obj[key]) then obj[key] else {})

    obj[keys[i]] = value

  (obj, keys...) ->
    result = new Object()

    for path in keys
      value = getDeep(obj, path)
      setDeep(result, path, value) if value isnt undefined

    return result
