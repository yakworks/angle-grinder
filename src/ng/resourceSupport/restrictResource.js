import angular from 'angular'
import resourceModule from './resourceModule'
import { deepDiff } from '../../utils/deepDiff'
import _ from 'lodash'

var app = angular.module(resourceModule)

app.value('requiredResourceFields', ['id'])

app.factory('restrictResource', [
  '$log', 'resourceBuilder', 'requiredResourceFields',
  ($log, resourceBuilder, requiredResourceFields) => function(resource, allowedFields) {
    if (allowedFields == null) { allowedFields = [] }
    angular.extend(resource, {
      $cacheData() {
        return this.$cachedData = this.resourceData()
      },
      $save() {
        const Record = resourceBuilder(this.resourcePath())
        const cached = _.cloneDeep(this.$cachedData)
        const record = new Record(deepDiff(cached, resource.resourceData(), allowedFields, requiredResourceFields))
        record.$save()
        this.$cachedData = _.merge(this.$cachedData, record.resourceData())
        return this
      },

      save() {
        const Record = resourceBuilder(this.resourcePath())
        const record = new Record(deepDiff(this.$cachedData, resource.resourceData(), allowedFields, requiredResourceFields))
        record.save()
        this.$cachedData = _.merge(this.$cachedData, record.resourceData())
        return this
      }
    }
    )

    resource.$cacheData()
    return resource
  }
])
