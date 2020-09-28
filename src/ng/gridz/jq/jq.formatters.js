/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { isoDateToDisplay } from '../../../../src/utils/dateSupport'

// Extra formatters for jqGrid
$.extend($.fn.fmatter, {

  date(cellVal, options) {
    const dateVal = isoDateToDisplay(cellVal)
    return columnAligner('date', dateVal, options)
  },

  // use `agCurrencyFilter` for format currencies
  currency(cellVal, options) {
    return columnAligner('currency', window.agCurrencyFilter(cellVal), options)
  },

  // use `agCurrencyFilter` for format currencies, use 0 for empty/null/undefined value
  currencyOrZero(cellVal, options) {
    if ((typeof (cellVal) === 'undefined') || (cellVal === null) || (cellVal === 'null') || (cellVal === '')) {
      cellVal = 0
    }
    return columnAligner('currency', window.agCurrencyFilter(cellVal), options)
  },

  okIcon(cellVal, options, rowdata) {
    return cellVal ? "<i class='fas fa-check'></i>" : ''
  },

  editActionLink(cellVal, options, rowdata) {
    return `<a class="editActionLink" href="#">${cellVal}</a>`
  },

  gridLink(cellVal, options, rowdata) {
    const id = rowdata.id
    return `<a class="gridLink" href="#" >${cellVal}</a>`
  }
})

const currencyUnformatter = function(cellVal) {
  if ((typeof (cellVal) === 'undefined') || (cellVal === null) || (cellVal === 'null') || (cellVal === '')) {
    return 0
  } else {
    return parseFloat(cellVal.replace(/[^0-9\.-]+/g, ''))
  }
}

$.extend($.fn.fmatter?.currency,
  { unformat: currencyUnformatter })

$.extend($.fn.fmatter?.currencyOrZero,
  { unformat: currencyUnformatter })

// Returns the template for data column alignment.
// type    - type of a columns (e.g. currency, date, link)
// content - content of a grid cell
export function columnAligner(type, content, options) {
  if (options?.colModel?.align) {
    return content
  } else {
    return `<div class="${type}-content">${content}</div>`
  }
}
