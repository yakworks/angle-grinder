var module = angular.module("admin.services", ["ngResource"]);

/**
 * This module defines the resource mappings required by Angular JS to map to a
 * standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.
 */
module.factory("Grails", function($resource) {
  var baseUrl = $("body").data("base-url");

  return $resource(baseUrl + ":action/:id", {id: "@id"}, {
    list: {method: "GET", params: {action: "list"}, isArray: true},
    get: {method: "GET", params: {action: "get"}},
    save: {method: "POST", params: {action: "save"}},
    update: {method: "POST", params: {action: "update"}},
    delete: {method: "POST", params: {action: "delete"}}
  });
});

/**
 * A service for storing one-time messages to be displayed after redirecting to
 * another view.
 */
module.factory("Flash", function() {
  var flash = {};

  flash.getMessage = function() {
    var value = this.message;
    this.message = undefined;
    return value;
  };

  flash.error = function(text) {
    this.message = {level: "error", text: text};
  };

  flash.success = function(text) {
    this.message = {level: "success", text: text};
  };

  flash.info = function(text) {
    this.message = {level: "info", text: text};
  };

  return flash;
});

module.service("EditDialog", function($dialog) {
  this.open = function(editTemplateUrl, item, isCreateNew) {
    var dlg = $dialog.dialog({
      backdropFade: false,
      dialogFade: false,
      resolve: {
        item: function() {
          return item;
        },
        isCreateNew: function() {
          return isCreateNew;
        }
      }
    });

    // override so we can intercept form dirty and prevent escape
    dlg.handledEscapeKey = function(e) {
      if (e.which === 27) {
        e.preventDefault();
        if (!dlg.$scope.editForm.$dirty) {
          dlg.close();
          dlg.$scope.$apply();
        }
      }
    };

    // override so we can intercept form dirty and prevent backdrop click
    dlg.handleBackDropClick = function(e) {
      e.preventDefault();
      if (!dlg.$scope.editForm.$dirty) {
        dlg.close();
        dlg.$scope.$apply();
      }
    };

    dlg.open(editTemplateUrl, "EditItemController")
  };
});
