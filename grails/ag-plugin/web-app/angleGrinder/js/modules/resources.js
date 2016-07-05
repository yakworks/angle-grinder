var resources = angular.module("angleGrinder.resources", [
    "ngResource",
    "ngRoute"
]);

// Build a resource for the given restful url
// TODO cleanup and spec this service
// TODO consider move it to angle-grinder
resources.factory("resourceBuilder", [
  "$resource", "pathWithContext", "$modelFactory", "$cacheFactory", function($resource, pathWithContext, $modelFactory, $cacheFactory) {
    return function(basePath, resourceName) {
      if (resourceName == null) {
        resourceName = basePath.replace(/^(\/+)/, "");
      }
      var pathWithoutContext = basePath;
      basePath = pathWithContext(basePath);
      // TODO check if we can get model object
      if ($cacheFactory.info().hasOwnProperty(basePath)) {
        $cacheFactory.get(basePath).destroy();
      }

      var Resource = $modelFactory(basePath,
        {actions: {
          list: { method: "GET", url: "list", isArray: false, invalidateCache: true},
          get: {method: "GET", url: "get", invalidateCache: true},
          save: { method: "POST", url: "save" , invalidateCache: true},
          update: { method: "POST", url: "update", invalidateCache: true},
          "delete": { method: "POST",url: "delete", headers: {"Content-Type": "application/json;charset=utf-8"}, data: {id: "id"}, beforeRequest: function(model){model.data.id = model.url.split("/").pop()}},
          massUpdate: { method: "POST", url: "massUpdate", wrap: false , invalidateCache: true},
          massDelete: { method: "POST", url: "massDelete", wrap: false, invalidateCache: true},
          post: { method: "POST", url: "save" }
        },
          base: {
            invalidateCache: true
          },
          instance: {
            $persisted: function () {
              return this.id !== null
            }
          }
        }
      );

      angular.extend(Resource.prototype, {
        resourceName: function() {
          return resourceName;
        },

        resourcePath: function() {
          return pathWithoutContext;
        },

        resourceData: function() {
          return angular.fromJson(angular.toJson(this));
        },

        // Returns true if the record is persisted (has an id)
        persisted: function() {
          return this.id != null;
        },

        // Return true if the record is not persisted
        newRecord: function() {
          return !this.persisted();
        }
      });

      return Resource;
    };
  }
]);

// This module defines the resource mappings required by Angular JS to map to a
// standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.
resources.factory("Resource", [
  "$document", "resourceBuilder", function($document, resourceBuilder) {
    var $body = $document.find("body");
    var url = $body.data("resource-path");
    var name = $body.data("resource-name");

    return resourceBuilder(url, name);
  }
]);

// Tries to load an user record with the given id taken from route params
resources.factory("resourceResolver", [
  "$q", "$route", "Resource", function($q, $route, Resource) {
    return function(id) {
      return Resource.get(id);
    };
  }
]);
