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
      el.find("tr[style*='display:none']").remove()

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

