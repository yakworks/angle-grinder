import angular from 'angular'
import gridzModule from '../module'
import _ from 'lodash'

var gridz = angular.module(gridzModule)

class XlsTemplateClass {
  constructor($window) {
    const fn = function(param) {
      if (param == null) { param = { worksheet: 'Worksheet' } }
      const { worksheet, table } = param
      return $window.btoa(unescape(encodeURIComponent(`\
<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns="http://www.w3.org/TR/REC-html40">
<head>
<!--[if gte mso 9]>
<xml>
<x:ExcelWorkbook>
  <x:ExcelWorksheets>
      <x:ExcelWorksheet>
      <x:Name>${worksheet}</x:Name>
      <x:WorksheetOptions>
        <x:DisplayGridlines/>
      </x:WorksheetOptions>
    </x:ExcelWorksheet>
  </x:ExcelWorksheets>
</x:ExcelWorkbook>
</xml>
<![endif]-->
</head>
<body>
<table>${table}</table>
</body>
</html>\
`)))
    }
    return fn
  }
}
XlsTemplateClass.$inject = ['$window']
// XLS template fot excel export
gridz.service('xlsTemplate', XlsTemplateClass)

class GridDataClass {
  constructor($document) {
    const findGridEl = gridId => $document.find(`div#gbox_${gridId}`)

    const prepareHeading = function(gridId) {
      const gridEl = findGridEl(gridId)

      // get the grid's heading
      const el = gridEl.find('.ui-jqgrid-hbox table').clone()

      // remove unnecessary columns
      el.find(`th#${gridId}_cb`).remove()
      el.find(`th#${gridId}_-row_action_col`).remove()
      el.find("tr[style*='display:none']").remove()

      // Strip unnecessary white spaces from the headers
      el.find('th').each(function(index, th) {
        const thEl = $(th)
        return thEl.html(thEl.text().trim())
      })

      return el.html()
    }

    const prepareRows = function(gridId, selectedIds) {
      const gridEl = findGridEl(gridId)

      // get the grid's table html content
      const el = gridEl.find(`#${gridId}`).clone()

      // remove the first row
      el.find('tr.jqgfirstrow').remove()
      // remove action column and checkboxes
      el.find(`td[aria-describedby='${gridId}_cb']`).remove()
      el.find(`td[aria-describedby='${gridId}_-row_action_col']`).remove()
      // unwrap all links
      el.find('td a').contents().unwrap()

      // include only selected rows otherwise export everything
      if (selectedIds.length > 0) {
        el.find('tr').each(function(index, tr) {
          const rowEl = $(tr)

          const id = rowEl.attr('id')
          if (!_.includes(selectedIds, id)) { return el.find(`tr#${id}`).remove() }
        })
      }

      return el.html()
    }

    // build the result
    return function(gridId, selectedRows) {
      const resultEl = angular.element('<div></div>')
      resultEl.append(prepareHeading(gridId))
      resultEl.append(prepareRows(gridId, selectedRows))

      // remove unnecessary html attributes
      const attrsToRemove = ['id', 'class', 'style', 'title',
        'aria-describedby', 'aria-labelledby', 'aria-multiselectable',
        'role', 'tabindex', 'sort']
      for (const attr of Array.from(attrsToRemove)) { resultEl.find('*').removeAttr(attr) }

      // remove unsafe element
      // $sanitize(resultEl.html()) TODO:check how we can configure to not delete all dom tags
      return resultEl.html()
    }
  }
}

GridDataClass.$inject = ['$document']
gridz.service('gridData', GridDataClass)

class XlsDataClass {
  constructor(xlsTemplate, gridData) {
    return function(gridId, selectedRows) {
      // generate the xls file content
      if (selectedRows == null) { selectedRows = [] }
      const data = xlsTemplate({ table: gridData(gridId, selectedRows), worksheet: 'Grid export' })
      return `data:application/vnd.ms-excel;base64,${data}`
    }
  }
}

XlsDataClass.$inject = ['xlsTemplate', 'gridData']

// Generates XLS data uri
gridz.service('xlsData', XlsDataClass)

class CsvDataClass {
  constructor(gridData) {
    const prepareCsvHeaders = function(data) {
      const headers = []
      const resultEl = angular.element('<div></div>')
      resultEl.append(data)
      resultEl.find('th').each(function(index, th) {
        const thEl = $(th)
        return headers.push(thEl.text().trim())
      })
      return headers.join('|')
    }

    const prepareCsvRows = function(data) {
      let rows = ''
      const resultEl = angular.element('<div></div>')
      resultEl.append(data)
      resultEl.find('tr').each(function(index, tr) {
        const trEl = $(tr)
        const row = []
        trEl.find('td').each(function(index, td) {
          const tdEl = $(td)
          return row.push(tdEl.text().trim())
        })

        return rows += row.join('|') + '\r\n'
      })
      return rows
    }

    return function(gridId, selectedRows) {
      // generate the csv file content
      if (selectedRows == null) { selectedRows = [] }
      return prepareCsvHeaders(gridData(gridId, selectedRows)) + prepareCsvRows(gridData(gridId, selectedRows))
    }
  }
}

CsvDataClass.$inject = ['gridData']

// Generates CSV data
gridz.service('csvData', CsvDataClass)
