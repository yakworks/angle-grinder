app = angular.module "angleGrinder.common"

app.service "DeepDiffServ", ["DeepPickServ", (DeepPickServ)->
  map = (oldVal, newVal, allowed, reqFields) ->
    diff = {}

    if reqFields? and reqFields.length > 0
      args = []
      args.push(newVal)
      args = args.concat reqFields
      diff = DeepPickServ.apply(this, args)

    if allowed? and allowed.length > 0
      args = []
      args.push(newVal)
      args = args.concat allowed
      newVal = DeepPickServ.apply(this, args)

    _.forEach(newVal, (v, k)->
      if (oldVal? and _.isEqual(v, oldVal[k])) or k is "$cachedData"
        return
      diff[k] = if _.isObject(v) then map(oldVal[k], v) else newVal[k]
    )
    diff

  (oldVal, newVal, allowed=[], reqFields=[]) ->
    map(oldVal, newVal, allowed, reqFields)
]