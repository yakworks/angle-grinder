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
      gridId = grid.getGridId()

      gboxEl = $document.find("div#gbox_#{gridId}")

      headingEl = gboxEl.find(".ui-jqgrid-hbox table").clone()
      headingEl.find("th##{gridId}_cb").remove()
      headingEl.find("th##{gridId}_-row_action_col").remove()

      # Strip unnecessary white spaces
      headingEl.find("th").each (index, el) ->
        thEl = $(el)
        thEl.html $(thEl).text().trim()

      # get the grid's table html content
      tableEl = gboxEl.find("##{gridId}").clone()

      # remove the first row
      tableEl.find("tr.jqgfirstrow").remove()
      # remove action column and checkboxes
      tableEl.find("td[aria-describedby='#{gridId}_cb']").remove()
      tableEl.find("td[aria-describedby='#{gridId}_-row_action_col']").remove()
      # unwrap all links
      tableEl.find("td a").contents().unwrap()

      # build the result
      resultEl = angular.element("<div></div>")
      resultEl.append(headingEl.html())
      resultEl.append(tableEl.html())

      # remove unsafe and unnecessary html attributes
      attrsToRemove = ["id", "class", "style", "title",
                       "aria-describedby", "aria-labelledby", "aria-multiselectable",
                       "role", "tabindex", "sort"]
      resultEl.find("*").removeAttr(attr) for attr in attrsToRemove

      html = $sanitize(resultEl.html())

      # generate the xls file content
      data = xlsTemplate(table: html, worksheet: "Grid export")
      return "data:application/vnd.ms-excel;base64,#{data}"
]
