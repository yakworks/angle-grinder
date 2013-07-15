# TODO this file is obsolete

module = angular.module("admin.services", ["ngResource"])

###
A service for storing one-time messages to be displayed after redirecting to
another view.
###
# TODO replace it by better solution
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
