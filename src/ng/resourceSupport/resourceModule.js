import angular from 'angular'
import ngResource from 'angular-resource'
import ngRoute from 'angular-route'
import agPathWithContext from '../pathWithContext'

const MOD_NAME = 'ag.resourceSupport'
export default MOD_NAME
var resources = angular.module(MOD_NAME, [
  ngResource,
  ngRoute,
  agPathWithContext
])

resources.constant('RestContext', '')
// Build a resource for the given restful url
// TODO cleanup and spec this service
// TODO consider move it to angle-grinder
resources.provider('resourceBuilder', function() {
  let restContext = ''
  return {
    setRestContext: function(context) {
      restContext = context
    },
    $get: [
      '$resource', 'pathWithContext', function($resource, pathWithContext) {
        return function(basePath, resourceName, restCont = '') {
          if (resourceName == null) {
            resourceName = basePath.replace(/^(\/+)/, '')
          }
          if (restCont.length > 0) {
            restContext = restCont
          }
          if (restContext.length > 0) {
            basePath = restContext + basePath
          }
          var pathWithoutContext = basePath
          basePath = pathWithContext(basePath)
          var Resource = null
          if (restContext.length > 0) {
            Resource = $resource(basePath + '/:id', { id: '@id' }, {
              list: { method: 'GET', isArray: false },
              get: { method: 'GET' },
              save: { method: 'POST' },
              update: { method: 'PUT' },
              delete: { method: 'DELETE' },

              // mass actions (for selected rows)
              massUpdate: { method: 'POST', url: basePath + "/massUpdate"},
              massDelete: { method: 'POST', url: basePath + "/massDelete"}
            })
          } else {
            Resource = $resource(basePath + '/:action/:id', { id: '@id' }, {
              list: { method: 'GET', params: { action: 'list' }, isArray: false },
              get: { method: 'GET', params: { action: 'get' } },
              save: { method: 'POST', params: { action: 'save' } },
              update: { method: 'POST', params: { action: 'update' } },
              delete: { method: 'POST', params: { action: 'delete' } },

              // mass actions (for selected rows)
              massUpdate: { method: 'POST', params: { action: 'massUpdate' } },
              massDelete: { method: 'POST', params: { action: 'massDelete' } }
            })
          }

          angular.extend(Resource.prototype, {
            resourceName: function() {
              return resourceName
            },

            resourcePath: function() {
              return pathWithoutContext
            },

            resourceData: function() {
              return angular.fromJson(angular.toJson(this))
            },

            // Returns true if the record is persisted (has an id)
            persisted: function() {
              return this.id != null
            },

            // Return true if the record is not persisted
            newRecord: function() {
              return !this.persisted()
            },

            // Backbone style save() that inserts or updated the record
            // based on the presence of an id.
            save: function(options) {
              if (options == null) { options = {} }

              var method
              method = this.persisted() ? 'update' : 'save'
              return Resource[method]({}, this, options.success, options.error)
            },

            delete: function(options) {
              if (options == null) { options = {} }

              return Resource.delete({}, this, options.success, options.error)
            }
          })

          return Resource
        }
      }
    ]
  }
})

// This module defines the resource mappings required by Angular JS to map to a
// standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.
resources.factory('Resource', [
  '$document', 'resourceBuilder', function($document, resourceBuilder) {
    var $body = $document.find('body')
    var url = $body.data('resource-path')
    var name = $body.data('resource-name')

    return resourceBuilder(url, name)
  }
])

// Tries to load an user record with the given id taken from route params
resources.factory('resourceResolver', [
  '$q', '$route', 'Resource', function($q, $route, Resource) {
    return function(id) {
      var deferred = $q.defer()

      var onSuccess = function(user) {
        return deferred.resolve(user)
      }

      var onError = function() {
        return deferred.reject()
      }

      Resource.get({ id: id }, onSuccess, onError)
      return deferred.promise
    }
  }
])
