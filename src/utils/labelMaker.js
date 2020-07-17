/* eslint no-useless-escape: "off" */
import _ from 'lodash'

export function makeLabel(key) {
  return parseWords(lastPathKey(key))
}

export function parseWords(inString) {
  if (inString && inString.length > 1) {
    return _.upperFirst(inString).split(/(?=[A-Z])/).join(' ')
  }
  return inString
}

export function lastPathKey(modelPath) {
  return _.split(modelPath, '.').slice(-1).pop()
}
