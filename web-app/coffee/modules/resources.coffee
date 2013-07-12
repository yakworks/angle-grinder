resources = angular.module("admin.resources", ["ngResource"])

# This module defines the resource mappings required by Angular JS to map to a
# standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.
resources.factory "Grails", [
  "$resource", "$document", ($resource, $document) ->
    baseUrl = $document.find("body").data("base-url")

    Grails = $resource "#{baseUrl}:action/:id", { id: "@id" },
      list:   { method: "GET",  params: { action: "list" }, isArray: true }
      get:    { method: "GET",  params: action: "get" }
      save:   { method: "POST", params: action: "save" }
      update: { method: "POST", params: action: "update" }
      delete: { method: "POST", params: action: "delete" }

    angular.extend Grails.prototype,
      # Returns true if the record is persisted (has an id)
      persisted: -> @id?

      # BackboneJS-style save() that inserts or updated the record
      # based on the presence of an id.
      save: (onComplete = ->) ->
        if @persisted()
          @$update(onComplete)
        else
          @$save(onComplete)

    Grails
]
