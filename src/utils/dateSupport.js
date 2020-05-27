import _ from 'lodash' // uses babel plugin to only use what is referenced
// see https://mymth.github.io/vanillajs-datepicker/#/
import { Datepicker } from 'vanillajs-datepicker'

const isoFormat = 'yyyy-mm-dd'

// config options updatable by setOptions() and their default values
const datepickerDefaults = {
  autohide: true,
  clearBtn: true,
  showOnFocus: false,
  todayBtn: true,
  buttonClass: 'button is-white',
  format: 'mm/dd/yyyy'
}

export default datepickerDefaults

/**
 *
 * @param {*} the cloned and merged options for datepicker
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
 * Pasre date string
 * @param  {String|Date|Number} dateStr - date string, Date object or time
 * value to parse
 * @param  {String|Object} format - format string or object that contains
 * toValue() custom parser, whose signature is
 * - args:
 *   - dateStr: {String|Date|Number} - the dateStr passed to the method
 *   - format: {Object} - the format object passed to the method
 *   - locale: {Object} - locale for the language specified by `lang`
 * - return:
 *     {Date|Number} parsed date or its time value
 * @param  {String} [lang=en] - language code for the locale to use
 * @return {Number} time value of parsed date
 */
export function parseDate(dateStr, format, lang) {
  return Datepicker.parseDate(dateStr, format, lang)
}

/**
 * Format Date object or time value in given format and language
 * @param  {Date|Number} date - date or time value to format
 * @param  {String|Object} format - format string or object that contains
 * toDisplay() custom formatter, whose signature is
 * - args:
 *   - date: {Date} - Date instance of the date passed to the method
 *   - format: {Object} - the format object passed to the method
 *   - locale: {Object} - locale for the language specified by `lang`
 * - return:
 *     {String} formatted date
 * @param  {String} [lang=en] - language code for the locale to use
 * @return {String} formatted date
 */
export function formatDate(date, format, lang) {
  return Datepicker.formatDate(date, format, lang)
}
