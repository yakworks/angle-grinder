import _ from 'lodash'

/**
 * String parsing helpers
 */
export class StringUtils {
  constructor() {}

  /**
   * returns capital words from string
   * @param {*} inString
   */
  capitalWords(inString) {
    if (inString && inString.length > 1) {
      const nohyp = inString.replace(/(-|^)([^-]?)/g, function(_, prep, letter) {
        return (prep && ' ') + letter.toUpperCase()
      })
      return _.upperFirst(nohyp).split(/(?=[A-Z])/).join(' ')
    }
    return inString
  }

  ucwords(str, force) {
    str = force ? str.toLowerCase() : str
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
      function(firstLetter) {
        return firstLetter.toUpperCase()
      }
    )
  }
}

const stringUtils = new StringUtils()
export default stringUtils
