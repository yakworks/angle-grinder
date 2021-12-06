/* eslint no-useless-escape: "off" */
import * as _ from './dash'

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

/**
 * Converts a property name into its natural language equivalent
 * eg ('firstName' becomes 'First Name')
 */
export function naturalName(inString) {
  if (inString && inString.length > 1) {
    const nohyp = inString.replace(/(-|_|^)([^-]?)/g, function(_, prep, letter) {
      return (prep && '') + letter.toUpperCase()
    })
    return _.upperFirst(nohyp).split(/(?=[A-Z])/).join(' ')
  }
  return inString
}

//legacy not sure what this does
function ucwords(str, force){
  str = force ? str.toLowerCase() : str
  return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    function(firstLetter) {
      return firstLetter.toUpperCase()
    }
  )
}
