/* eslint no-useless-escape: "off" */
import * as _ from './dash'

/**
 * Helpers for form inputs, mostly for password checking
 */
export class StringUtility {

  isEmailValid(email) {
    if (!email) {
      return true
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(email)) {
      return true
    }
    return false
  }

  isUrlValid(url) {
    if (!url) {
      return true
    }

    if (/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(url)) {
      return true
    }
    return false
  }

  // great post on password strength checking
  // http://stackoverflow.com/questions/948172/password-strength-meter
  /*
  Password Text Range:
  >= 90: Very Secure
  >= 80: Secure
  >= 70: Very Strong
  >= 60: Strong
  >= 50: Average
  >= 25: Weak
  >= 0: Very Weak
  */
  checkPassword(password) {
    const UpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const Numbers = '0123456789'
    const Characters = '!@#$%^&*?_~'

    if (!password) {
      return 'is very weak'
    }

    let score = 0

    if (password.length < 5) {
      score += 5
    } else if (password.length > 4 && password.length < 8) {
      score += 10
    } else if (password.length > 7) {
      score += 25
    }

    const upperCount = this.countContain(password, UpperCase)
    const lowerCount = this.countContain(password, LowerCase)
    const lowerUpperCount = upperCount + lowerCount

    if (upperCount === 0 && lowerCount !== 0) {
      score += 10
    } else if (upperCount !== 0 && lowerCount !== 0) {
      score += 20
    }

    const numberCount = this.countContain(password, Numbers)

    if (numberCount === 1) {
      score += 10
    }

    if (numberCount >= 3) {
      score += 20
    }

    const characterCount = this.countContain(password, Characters)

    if (characterCount === 1) {
      score += 10
    }

    if (characterCount > 1) {
      score += 25
    }

    if (numberCount !== 0 && lowerUpperCount !== 0) {
      score += 2
    }

    if (numberCount !== 0 && lowerUpperCount !== 0 && characterCount !== 0) {
      score += 3
    }

    if (numberCount !== 0 && upperCount !== 0 && lowerCount !== 0 && characterCount !== 0) {
      score += 5
    }

    return score
  }

  getPasswordStrengthClass(score) {
    switch (true) {
      case (score < 50):
        return 'red'
      case (score < 60):
        return 'gold'
      case (score < 80):
        return 'dark-green'
      default:
        return 'lime'
    }
  }

  getPasswordScoreText(score) {
    switch (true) {
      case (score < 25):
        return ' is very weak'
      case (score < 50):
        return ' is weak'
      case (score < 60):
        return ' is average'
      case (score < 70):
        return ' is strong'
      case (score < 80):
        return 'is very strong'
      case (score < 90):
        return ' is secure'
      default:
        return ' is very secure'
    }
  }

  countContain(password, check) {
    let count = 0

    for (let i = 0; i < password.length; i++) {
      if (check.indexOf(password.charAt(i)) > -1) {
        count++
      }
    }

    return count
  }
}

const stringFormUtils = new StringUtility()
export default stringFormUtils
