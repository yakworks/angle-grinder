import { isFalsy } from './truthy'
import * as _ from './dash'

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
export function formatAmount(val){
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

// export { isoDateToDisplay }  from './dateSupport'
