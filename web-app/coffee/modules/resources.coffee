resources = angular.module("angleGrinder.resources", [
  "ngResource"
  "ngRoute"
])

# Build a resource for the given restful url
resources.factory "resourceBuilder", [
  "$resource", "pathWithContext", ($resource, pathWithContext) ->
    (basePath, resourceName = null) ->
      basePath = pathWithContext(basePath)

      Resource = $resource "#{basePath}/:action/:id", { id: "@id" },
        list:   { method: "GET",  params: { action: "list" }, isArray: true }
        get:    { method: "GET",  params: action: "get" }
        save:   { method: "POST", params: action: "save" }
        update: { method: "POST", params: action: "update" }
        delete: { method: "POST", params: action: "delete" }

      angular.extend Resource.prototype,
        resourceName: -> resourceName

        # Retunrs true if the record is persisted (has an id)
        persisted: -> @id?

        # Return true if the record is not persisted
        newRecord: -> not @persisted()

        # Backbone style save() that inserts or updated the record
        # based on the presence of an id.
        save: (options) ->
          method = if @persisted() then "update" else "save"
          Resource[method]({}, this, options.success, options.error)

        delete: (options) ->
          Resource.delete({}, this, options.success, options.error)

      Resource
]

# This module defines the resource mappings required by Angular JS to map to a
# standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.
resources.factory "Resource", [
  "$document", "resourceBuilder", ($document, resourceBuilder) ->
    $body = $document.find("body")

    url = $body.data("resource-path")ls
    name = $body.data("resource-name")

    resourceBuilder(url, name)
]

# Tries to load an user record with the given id taken from route params
resources.factory "resourceResolver", [
  "$q", "$route", "Resource", ($q, $route, Resource) ->
    (id) ->
      deferred = $q.defer()

      onSuccess = (user) -> deferred.resolve(user)
      onError = -> deferred.reject()
      Resource.get id: id, onSuccess, onError

      deferred.promise
]
