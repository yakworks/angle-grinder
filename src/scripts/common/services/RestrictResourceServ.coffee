app = angular.module "angleGrinder.common"

app.value "requiredResourceFields", ["id"]

app.factory "restrictResource", [
  "$log", "DeepDiffServ", "resourceBuilder", "requiredResourceFields"
  ($log, DeepDiffServ, resourceBuilder, requiredResourceFields) ->
    (resource, allowedFields = [])->
      angular.extend(resource,
        $cacheData: () ->
          this.$cachedData = this.resourceData()
        $save: ->
          Record = resourceBuilder(this.resourcePath())
          cached = _.cloneDeep this.$cachedData
          record = new Record(DeepDiffServ(cached, resource.resourceData(), allowedFields, requiredResourceFields))
          record.$save()
          this.$cachedData = _.merge(this.$cachedData, record.resourceData())
          this

        save: ->
          Record = resourceBuilder(this.resourcePath())
          record = new Record(DeepDiffServ(this.$cachedData, resource.resourceData(), allowedFields, requiredResourceFields))
          record.save()
          this.$cachedData = _.merge(this.$cachedData, record.resourceData())
          this
      )

      resource.$cacheData()
      resource
]