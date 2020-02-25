/* eslint-disable no-undef, no-return-assign */
import _ from 'lodash'

export default class BaseCtrl {
  static register(app, name) {
    if (name == null) { name = this.name || __guard__(this.toString().match(/function\s*(.*?)\(/), x => x[1]) }
    if (typeof app === 'string') { app = angular.module(app) }
    return app.controller(name, this)
  }

  static inject(...annotations) {
    const ANNOTATION_REG = /^(\S+)(\s+as\s+(\w+))?$/

    this.annotations = _.map(annotations, function(annotation) {
      const match = annotation.match(ANNOTATION_REG)
      return { name: match[1], identifier: match[3] || match[1] }
    })

    return this.$inject = _.map(this.annotations, annotation => annotation.name)
  }

  // Expose the given fields to the `$scope`
  expose($scope, ...members) {
    // see https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba
    var fmap = _.map(members, (field) => [field, this[field]])
    return _.each(fmap, (...args) => {
      const [field, entity] = Array.from(args[0])
      return $scope[field] = typeof entity === 'function' ? _.bind(entity, this) : entity
    })
    // return _.chain(members)
    //   .map((field) => [field, this[field]])
    //   .each((...args) => {
    //     const [field, entity] = Array.from(args[0])
    //     return $scope[field] = typeof entity === 'function' ? _.bind(entity, this) : entity
    //   })
    //   .value()
  }

  constructor(...dependencies) {
    for (let index = 0; index < this.constructor.annotations.length; index++) {
      const annotation = this.constructor.annotations[index]
      this[annotation.identifier] = dependencies[index]
    }

    if (typeof this.initialize === 'function') {
      this.initialize()
    }
  }
}
