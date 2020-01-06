/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var gridz = angular.module("angleGrinder.gridz")
// Generates xls export button for the given grid.
// Usage:
//   <a href="" ag-grid-xls-export="usersGrid">
//     <i class="fa fa-download"></i> Export to XLS
//   </a>
//   If nothing is specified table icon will be added
//   <a href="" ag-grid-xls-export="usersGrid"></a>
gridz.directive("agGridXlsExport", [
  "$window", "NotificationDialogServ", "$compile",  ($window, NotificationDialogServ, $compile) => ({
  restrict: "A",

  link(scope, element, attrs) {
    // Add table symbol if no child is specified
    if (!element[0].firstChild) {
      const exp = angular.element($compile("<i class=\"fa fa-table\" uib-tooltip=\"Export to Excel\"></i>")(scope))
      element.append(exp)
    }
    return element.on("click", function(event) {
      event.preventDefault()

      const grid = scope.$grid

      if (grid.getSelectedRowIds().length !== 0) {
        // if browser is IE then open new window and show SaveAs dialog, else use dataUri approach
        if (($window.navigator.userAgent.indexOf("MSIE ") > 0) || !!$window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
          let iframe = document.createElement("IFRAME")
          iframe.style.display = "none"
          document.body.appendChild(iframe)
          iframe = iframe.contentWindow || iframe.contentDocument
          const csvData = 'sep=|\r\n' + grid.getCsvData()
          iframe.document.open("text/html", "replace")
          iframe.document.write(csvData)
          iframe.document.close()
          iframe.focus()
          return iframe.document.execCommand('SaveAs', true, 'download.csv')
        } else {
          const dataUri = grid.getXlsDataUri()
          const link = document.createElement('a')
          link.href = dataUri
          link.setAttribute('download', 'download.xls')
          document.body.appendChild(link)
          const click_ev = document.createEvent("MouseEvents")
          // initialize the event
          click_ev.initEvent("click", true, true)
          // trigger the event
          return link.dispatchEvent(click_ev)
        }
      } else {
        return NotificationDialogServ.open("Please select at least one row.")
      }
    })
  }
})
])
