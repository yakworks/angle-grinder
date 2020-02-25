import _ from 'lodash' // uses babel plugin to only use what is referenced

export function isEmpty(str) {
  return _.isNil(str) || (_.isString(str) && _.isEmpty(str))
}

export function isFalsy(value) {
  if (_.isNaN(value)) { return true }
  if (_.isNil(value)) { return true }
  if (_.isString(value) && _.isEmpty(value)) { return true }
  if (value === false) { return true }
  return false
}
