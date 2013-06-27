module = angular.module("admin.services", ["ngResource"])

###
This module defines the resource mappings required by Angular JS to map to a
standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.
###
module.factory "Grails", ($resource) ->
  baseUrl = $("body").data("base-url")
  $resource "#{baseUrl}:action/:id", { id: "@id" },
    list:   { method: "GET",  params: { action: "list" }, isArray: true }
    get:    { method: "GET",  params: action: "get" }
    save:   { method: "POST", params: action: "save" }
    update: { method: "POST", params: action: "update" }
    delete: { method: "POST", params: action: "delete" }

###
A service for storing one-time messages to be displayed after redirecting to
another view.
###
module.factory "Flash", ->
  flash = {}
  flash.getMessage = ->
    value = @message
    @message = `undefined`
    value

  flash.error = (text) ->
    @message =
      level: "error"
      text: text

  flash.success = (text) ->
    @message =
      level: "success"
      text: text

  flash.info = (text) ->
    @message =
      level: "info"
      text: text

  flash

module.service "EditDialog", ($dialog) ->
  @open = (editTemplateUrl, item, isCreateNew) ->
    dlg = $dialog.dialog(
      backdropFade: false
      dialogFade: false
      resolve:
        item: ->
          item

        isCreateNew: ->
          isCreateNew
    )

    # override so we can intercept form dirty and prevent escape
    dlg.handledEscapeKey = (e) ->
      if e.which is 27
        e.preventDefault()
        unless dlg.$scope.editForm.$dirty
          dlg.close()
          dlg.$scope.$apply()

    # override so we can intercept form dirty and prevent backdrop click
    dlg.handleBackDropClick = (e) ->
      e.preventDefault()
      unless dlg.$scope.editForm.$dirty
        dlg.close()
        dlg.$scope.$apply()

    dlg.open editTemplateUrl, "EditItemController"
