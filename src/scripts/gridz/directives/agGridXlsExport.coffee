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
            _.each grid.gridEl.jqGrid('getGridParam', 'colModel'), (row) ->
              labels[row.name] = row.label || row.name
            data = _.map grid.getSelectedRows(), (row)->
              _.reduce row, ((result, value, key) ->
                key = labels[key] or key
                if value.toString().indexOf("<") is 0
                  result[key] = angular.element(value).innerText
                else
                  result[key] = value
                result
              ), {}
            console.log data
            ws = XLSX.utils.json_to_sheet(data);
            wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Presidents");
            XLSX.writeFile(wb, "download.xlsx");

        else
          NotificationDialogServ.open("Please select at least one row.")
]
