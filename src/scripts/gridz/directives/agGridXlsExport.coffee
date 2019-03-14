gridz = angular.module("angleGrinder.gridz")
# Generates xls export button for the given grid.
# Usage:
#   <a href="" ag-grid-xls-export="usersGrid">
#     <i class="fa fa-download"></i> Export to XLS
#   </a>
#   If nothing is specified table icon will be added
#   <a href="" ag-grid-xls-export="usersGrid"></a>
gridz.directive "agGridXlsExport", [
  "$window", "NotificationDialogServ", "$compile",  ($window, NotificationDialogServ, $compile) ->
    restrict: "A"

    link: (scope, element, attrs) ->
      cellFormatter = (ws, range, format="#,##0.00")->
        R = range.s.r
        while R <= range.e.r
          C = range.s.c
          while C <= range.e.c
            cell = ws[XLSX.utils.encode_cell(
              r: R
              c: C)]
            if !cell or cell.t != 'n'
              ++C
              continue
            # only format numeric cells
            cell.z = format
            ++C
          ++R

      # Add table symbol if no child is specified
      if not element[0].firstChild
        exp = angular.element($compile("""<i class="fa fa-table" uib-tooltip="Export to Excel"></i>""")(scope))
        element.append(exp)
      element.on "click", (event) ->
        event.preventDefault()

        grid = scope.$grid

        if grid.getSelectedRowIds().length isnt 0
          # if browser is IE then open new window and show SaveAs dialog, else use dataUri approach
          if $window.navigator.userAgent.indexOf("MSIE ") > 0 || !!$window.navigator.userAgent.match(/Trident.*rv\:11\./)
            iframe = document.createElement("IFRAME")
            iframe.style.display = "none"
            document.body.appendChild(iframe)
            iframe = iframe.contentWindow || iframe.contentDocument
            csvData = 'sep=|\r\n' + grid.getCsvData()
            iframe.document.open("text/html", "replace")
            iframe.document.write(csvData)
            iframe.document.close()
            iframe.focus()
            iframe.document.execCommand('SaveAs', true, 'download.csv')
          else
            labels = {}
            selectedRows = grid.getSelectedRows(true)
            #{wch: 6}, // "characters"
            #{wpx: 50}, // "pixels"
            wscols = []
            currencyColumns = []
            exclude = ['cb', '-row_action_col', ' ']
            colMod = angular.copy(grid.gridEl.jqGrid('getGridParam', 'colModel'))
            headers =[]
            i = 0
            _.remove(colMod, (row)->
              row.hidden or row.name in exclude
            )
            _.each colMod, (row) ->
              range =
                s:
                  r: 1
                  c: 0
                e:
                  r: selectedRows.length + 5
                  c: 0
              labels[row.name] = row.label || row.name
              headers.push(labels[row.name])
              wscols.push(if row.width then {wpx: row.width} else {wch: labels[row.name].length + 3})
              if row.formatter and (row.formatter.toString().indexOf("currency") > -1)
                range.s.c = i
                range.e.c = i
                currencyColumns.push(range)
              i++
            console.log selectedRows
            data = _.map selectedRows, (row)->
              result = {}
              _.each colMod, ((v, k) ->
                key = v['label'] or v['name']
                key = key.toString()
                value = row[v['name']]
                if not value?
                  return
                val
                if value.toString().indexOf("<") is 0
                  val = angular.element(value)[0].innerText
                else
                  val = value
                if key not in exclude
                  if isNaN(val) or val is "" or not val?
                    result[key] = val
                  else
                    result[key] = Number(val)
              )
              result
            ws = XLSX.utils.json_to_sheet(data, {header:headers})
            _.each currencyColumns, (range)->
              cellFormatter(ws, range)
            ws['!cols'] = wscols
            wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "Sheet 1")
            XLSX.writeFile(wb, "download.xlsx")

        else
          NotificationDialogServ.open("Please select at least one row.")
]
