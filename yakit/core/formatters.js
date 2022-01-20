import { isFalsy } from './truthy'
import * as _ from './dash'
import { isoDateToDisplay } from './date/dateSupport'
// import { parseDate, formatDate } from './date/date-format'

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 * standard 2 digit amount format with no currency indicator
 * If its falsy then it defaults to 0
 * 1000 -> 1,000.00
 * 1.2 -> 1.20
 * undefined -> 0
 */
export function formatNumber(val){
  if(isFalsy(val)) return '0'
  if(_.isString(val) ){
    if (val === 'undefined' || val === 'null' || val.trim() === '') {
      return '0'
    } else {
      //replace comma, convert to number with +
      return numberFormatter.format(+val.replace(/,/g, ''))
    }
  }

  return numberFormatter.format(val)
}

const o = {
  amount(val){
    if(isFalsy(val)) return '0'
    if(_.isString(val) ){
      if (val === 'undefined' || val === 'null' || val.trim() === '') {
        return '0'
      } else {
        //replace comma, convert to number with +
        let num = +val.replace(/,/g, '')
        return numberFormatter.format(num)
      }
    }
    return numberFormatter.format(val)
  },
  number(val){
    return o.amount(val)
  },
  percent(val){
    if(isFalsy(val)) return '0'
    if(_.isString(val) ){
      if (val === 'undefined' || val === 'null' || val.trim() === '') {
        return '0'
      } else {
        //replace comma, convert to number with +
        let num = +val.replace(/,/g, '')
        return percentFormatter.format(num*100)
      }
    }
    return percentFormatter.format(val*100)
  },
  integer(val){
    return isNaN(val) ? val : parseInt(val, 10);
  },
  date(val){
    return isoDateToDisplay(val)
  }
}

export default o
// export { isoDateToDisplay }  from './dateSupport'
