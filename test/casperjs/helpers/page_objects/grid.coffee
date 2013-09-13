exports.Grid = class
  constructor: (@casper, @gridName = "grid") ->
    @selector = "div.ui-jqgrid"

  # Click the cell with the given row number and name.
  clickCell: (row, name) ->
    @casper.click "#{@selector} tr.jqgrow:nth-child(#{row + 2}) td[aria-describedby='#{@gridName}_#{name}'] a"

  # Click edit button inside the popover for the given row.
  clickEditRow: (row) ->
    @invokePopover(row)
    @casper.click "#{@selector} div.popover a.row_action_edit"

  # Invoke the popover for the given row.
  invokePopover: (row) ->
    @casper.click "#{@selector} tr.jqgrow:nth-child(#{row + 2}) td:nth-child(2) a[data-toggle=popover]"

  # Click next page.
  clickNextPage: ->
    @casper.click "#{@selector} div##{@gridName}-pager .ui-icon-seek-next"

  # Click prev page.
  clickPrevPage: ->
    @casper.click "#{@selector} div##{@gridName}-pager .ui-icon-seek-prev"

  # Click the heder for the given column name.
  clickHeader: (name) ->
    @casper.click "#{@selector} table.ui-jqgrid-htable th##{@gridName}_#{name} div.ui-jqgrid-sortable"

  # Returns the number of loaded rows.
  getRowsCount: ->
    @casper.evaluate (selector) ->
      document.querySelectorAll("#{selector} tr.jqgrow").length
    , @selector

  # Retrieves cell text
  getCellText: (row, name) ->
    @getRow(row)[name]

  # Retrieves data for the given row number.
  # Rows numeration starts from 0.
  getRow: (row) ->
    @casper.evaluate (selector, row, gridName) ->
      $row = $("#{selector} tbody tr.jqgrow:nth-child(#{row + 2})")

      row = {}
      $row.find("td[aria-describedby]").each (index, cell) ->
        $cell = $(cell)

        key = $cell.attr("aria-describedby")
        key = key.substring(gridName.length + 1, key.length)

        row[key] = $cell.text()
      row

    , @selector, row, @gridName
