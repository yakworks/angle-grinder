/* eslint-disable no-unused-vars */
import { isoDateToDisplay } from '@yakit/core/date/dateSupport'
import fmt from '@yakit/core/formatters'

// Extra formatters for jqGrid
$.extend($.fn.fmatter, {

  date(cellVal, options) {
    const dateVal = fmt.date(cellVal)
    return columnAligner('date', dateVal, options)
  },

  // use `agCurrencyFilter` for format currencies
  currency(cellVal, options) {
    return columnAligner('currency', fmt.amount(cellVal), options)
  },

  currencyOrZero(cellVal, options) {
    return columnAligner('currency', fmt.amount(cellVal), options)
  },

  okIcon(cellVal, options, rowdata) {
    return cellVal ? "<i class='material-icons text-base font-bold'>check</i>" : ''
  },
  /** deprecated, old angular way */
  editActionLink(cellVal, options, rowdata) {
    return `<a class="editActionLink" href="#">${cellVal}</a>`
  },
  /** for the Svelte popovers */
  editPopoverLink(cellVal, options, rowdata) {
    // console.log("editPopoverLink", cellVal, options, rowdata)
    if (!cellVal) cellVal = '...'
    const ident = rowdata['id']
    const popoverId = `#${options.gid}-popover-edit`
    return `<a class="editPopoverLink popover-open" href="#" data-id="${ident}" data-popover="${popoverId}">${cellVal}</a>`
  },

  gridLink(cellVal, options, rowdata) {
    const id = rowdata.id
    return `<a class="gridLink" href="#" >${cellVal}</a>`
  },

  showLink(cellVal, options, rowdata) {
    const ident = rowdata.id
    return `<a class="showLink" data-id="${ident}" href="#" >${cellVal}</a>`
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
