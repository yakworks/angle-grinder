/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var common = angular.module('angleGrinder.common')

// Returns true is the given string is null, undefined or empty ("")
common.value('isEmpty', str => _.isNil(str) || _.isString(str) && _.isEmpty(str))

class IsFalsyServClass {
  constructor(isEmpty) {
    return function(value) {
      if (_.isNaN(value)) { return true }
      if (isEmpty(value)) { return true }
      if (_.isNil(value)) { return true }
      if (value === false) { return true }

      return false
    }
  }
}
IsFalsyServClass.$inject = ['isEmpty']
// Returns true if the given values if falsy
common.service('IsFalsyServ', IsFalsyServClass)
