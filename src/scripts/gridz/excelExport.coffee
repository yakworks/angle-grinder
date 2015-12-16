gridz = angular.module "angleGrinder.gridz"

# XLS template fot excel export
gridz.service "xlsTemplate", [
  "$window", ($window) ->

    ({worksheet, table} = { worksheet: "Worksheet" }) ->
      $window.btoa(unescape(encodeURIComponent("""
        <html xmlns:o="urn:schemas-microsoft-com:office:office"
              xmlns:x="urn:schemas-microsoft-com:office:excel"
              xmlns="http://www.w3.org/TR/REC-html40">
          <head>
          <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                  <x:ExcelWorksheet>
                  <x:Name>#{worksheet}</x:Name>
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
            <table>#{table}</table>
          </body>
        </html>
      """)))

]

gridz.service "gridData", [
  "$document", "$sanitize",
  ($document, $sanitize) ->
    findGridEl = (gridId) -> $document.find("div#gbox_#{gridId}")

    prepareHeading = (gridId) ->
      gridEl = findGridEl(gridId)

      # get the grid's heading
      el = gridEl.find(".ui-jqgrid-hbox table").clone()

      # remove unnecessary columns
      el.find("th##{gridId}_cb").remove()
      el.find("th##{gridId}_-row_action_col").remove()

      # Strip unnecessary white spaces from the headers
      el.find("th").each (index, th) ->
        thEl = $(th)
        thEl.html thEl.text().trim()

      el.html()

    prepareRows = (gridId, selectedIds) ->
      gridEl = findGridEl(gridId)

      # get the grid's table html content
      el = gridEl.find("##{gridId}").clone()

      # remove the first row
      el.find("tr.jqgfirstrow").remove()
      # remove action column and checkboxes
      el.find("td[aria-describedby='#{gridId}_cb']").remove()
      el.find("td[aria-describedby='#{gridId}_-row_action_col']").remove()
      # unwrap all links
      el.find("td a").contents().unwrap()

      # include only selected rows otherwise export everything
      if selectedIds.length > 0
        el.find("tr").each (index, tr) ->
          rowEl = $(tr)

          id = rowEl.attr("id")
          el.find("tr##{id}").remove() unless _.include selectedIds, id

      el.html()

    # build the result
    (gridId, selectedRows) ->
      resultEl = angular.element("<div></div>")
      resultEl.append(prepareHeading(gridId))
      resultEl.append(prepareRows(gridId, selectedRows))

      # remove unnecessary html attributes
      attrsToRemove = ["id", "class", "style", "title",
                       "aria-describedby", "aria-labelledby", "aria-multiselectable",
                       "role", "tabindex", "sort"]
      resultEl.find("*").removeAttr(attr) for attr in attrsToRemove

      # remove unsafe element
      $sanitize(resultEl.html())

]

# Generates XLS data uri
gridz.service "xlsData", [
  "xlsTemplate", "gridData",
  (xlsTemplate, gridData) ->

    (gridId, selectedRows = []) ->
      # generate the xls file content
      data = xlsTemplate(table: gridData(gridId, selectedRows), worksheet: "Grid export")
      return "data:application/vnd.ms-excel;base64,#{data}"
]

# Generates CSV data
gridz.service "csvData", [
  "gridData",
  (gridData) ->
    prepareCsvHeaders = (data)->
      headers=[]
      resultEl = angular.element("<div></div>")
      resultEl.append(data)
      resultEl.find("th").each (index, th) ->
        thEl = $(th)
        headers.push(thEl.text().trim())
      headers.join("|")

    prepareCsvRows = (data) ->
      rows=""
      resultEl = angular.element("<div></div>")
      resultEl.append(data)
      resultEl.find("tr").each (index, tr) ->
        trEl = $(tr)
        row=[]
        trEl.find("td").each (index, td) ->
          tdEl = $(td)
          row.push tdEl.text().trim()

        rows +=row.join("|") + "\r\n"
      rows

    (gridId, selectedRows = []) ->
      # generate the csv file content
      return prepareCsvHeaders(gridData(gridId, selectedRows)) + prepareCsvRows(gridData(gridId, selectedRows))
]

# Generates xls export button for the given grid.
# Usage:
#   <a href="" ag-grid-xls-export="usersGrid">
#     <i class="fa fa-download"></i> Export to XLS
#   </a>
#   If nothing is specified table icon will be added
#   <a href="" ag-grid-xls-export="usersGrid"></a>
gridz.directive "agGridXlsExport", [
  "$window", "notificationDialog", "$compile",  ($window, notificationDialog, $compile) ->
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
          notificationDialog.open("Please select at least one row.")
]
