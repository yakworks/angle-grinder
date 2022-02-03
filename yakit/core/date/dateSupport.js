import * as _ from '../dash' // uses babel plugin to only use what is referenced
// see https://mymth.github.io/vanillajs-datepicker/#/
import { parseDate, formatDate } from './date-format'

export { parseDate, formatDate }

const isoFormat = 'yyyy-mm-dd'

// config options updatable by setOptions() and their default values
const datepickerDefaults = {
  autohide: true,
  clearBtn: true,
  showOnFocus: false,
  showOnClick: false,
  updateOnBlur: true,
  todayBtn: true,
  buttonClass: 'button is-white',
  format: 'mm/dd/yyyy'
}

export default datepickerDefaults

/**
 *
 * @param {*} mergeOptions the cloned and merged options for datepicker
 */
export function mergeDatepickerOpts(mergeOptions = {}) {
  return _.merge({}, datepickerDefaults, mergeOptions)
}

export function isoDateToDisplay(isoDate) {
  const dateVal = parseDate(isoDate, isoFormat)
  return formatDate(dateVal, datepickerDefaults.format)
}

export function displayDateToIso(displayDate) {
  const dateVal = parseDate(displayDate, datepickerDefaults.format)
  return formatDate(dateVal, isoFormat)
}

/**
 * returns a date that can be set to input[date]. fudges time to make sure its
 * on the same day
 * @param  {String} dateIsoString the string in yyyy-mm-dd format.
 * @return {Date} the date
 */
 export function parseIsoDate(dateIsoString) {
  const d = new Date(dateIsoString)
  //get it back to Z date to keep same day from browser timezone offset
  d.setMinutes(d.getMinutes()+d.getTimezoneOffset())
  return d
}
