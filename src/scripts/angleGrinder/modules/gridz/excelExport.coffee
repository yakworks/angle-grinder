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

# Generates XLS data uri
gridz.service "xlsData", [
  "$document", "$sanitize", "xlsTemplate",
  ($document, $sanitize, xlsTemplate) ->

    (grid) ->
      # get the grid id
      gridElId = grid.getGridId()

      # get grid's table html content
      tableEl = $document.find("##{gridElId}").clone()

      # remove the first row
      tableEl.find("tr.jqgfirstrow").remove()
      # remove action column and checkboxes
      tableEl.find("td[aria-describedby='#{gridElId}_cb']").remove()
      tableEl.find("td[aria-describedby='#{gridElId}_-row_action_col']").remove()
      # unwrap all links
      tableEl.find("td a").contents().unwrap()

      # get the html and remove unsafe elements
      html = $sanitize(tableEl.html())

      # generate the xls file content
      data = xlsTemplate(table: html, worksheet: "Grid export")
      return "data:application/vnd.ms-excel;base64,#{data}"
]
