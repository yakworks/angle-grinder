app = angular.module "angleGrinder.common"

app.service "deepDiff", ["deepPick", (deepPick)->
  map = (oldVal, newVal, allowed, reqFields) ->
    diff = {}

    if reqFields? and reqFields.length > 0
      args = []
      args.push(newVal)
      args = args.concat reqFields
      diff = deepPick.apply(this, args)

    if allowed? and allowed.length > 0
      args = []
      args.push(newVal)
      args = args.concat allowed
      newVal = deepPick.apply(this, args)

    _.forEach(newVal, (v, k)->
      if oldVal? and _.isEqual(v, oldVal[k])
        return
      diff[k] = if _.isObject(v) then map(oldVal[k], v) else newVal[k]
    )
    diff

  (oldVal, newVal, allowed=[], reqFields=[]) ->
    map(oldVal, newVal, allowed, reqFields)
]