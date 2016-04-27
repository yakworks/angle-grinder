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

        grid = scope.$eval(attrs.agGridXlsExport)

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
            dataUri = grid.getXlsDataUri()
            link = document.createElement('a')
            link.href = dataUri
            link.setAttribute('download', 'download.xls')
            document.body.appendChild(link)
            click_ev = document.createEvent("MouseEvents")
            # initialize the event
            click_ev.initEvent("click", true, true)
            # trigger the event
            link.dispatchEvent(click_ev)
        else
          NotificationDialogServ.open("Please select at least one row.")
]
