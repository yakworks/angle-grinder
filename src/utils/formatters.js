import { isFalsy } from './truthy'
import * as _ from './dash'
import { isoDateToDisplay } from './dateSupport'

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
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
        return numberFormatter.format(+val.replace(/,/g, ''))
      }
    }
    return formatNumber(val)
  },
  decimal(val){
    return formatNumber(val)
  },
  date(val){
    isoDateToDisplay(val)
  }
}

export default o
// export { isoDateToDisplay }  from './dateSupport'
