class @BaseCtrl

  @register: (app, name) ->
    name ?= @name or @toString().match(/function\s*(.*?)\(/)?[1]
    app = angular.module(app) if typeof app is "string"
    app.controller name, this

  @inject: (annotations...) ->
    ANNOTATION_REG = /^(\S+)(\s+as\s+(\w+))?$/

    @annotations = _.map annotations, (annotation) ->
      match = annotation.match(ANNOTATION_REG)
      name: match[1], identifier: match[3] or match[1]

    @$inject = _.map @annotations, (annotation) -> annotation.name

  # Expose the given fields to the `$scope`
  expose: ($scope, members...) ->

    _.chain(members).map((field) => [field, this[field]]).each ([field, entity]) =>
      ($scope[field] = if typeof entity is "function" then _.bind(entity, this) else entity)
    .value()

  constructor: (dependencies...) ->
    for annotation, index in @constructor.annotations
      this[annotation.identifier] = dependencies[index]

    @initialize?()
