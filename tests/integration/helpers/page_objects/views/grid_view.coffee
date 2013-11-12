PageObject = require("./../page_object")
PopoverView = require("./popover_view")

class GridRowView extends PageObject

  # Retrieve cell element by col name
  # for example `customer.name`
  cellByName: (name) ->
    @findElement @By.css("td[aria-describedby='grid_#{name}']")

  @has "popoverButton", ->
    @findElement @By.css("td[aria-describedby='grid_row_action_col'] a.jqg-row-action")

  showPopover: ->
    @popoverButton.click()
    element = browser.findElement @By.css(".row-action-popover")
    new PopoverView(element)

class GridView extends PageObject

  @has "rows", ->
    @findElements @By.css("tbody tr.jqgrow")

  # Retrieve nth row from the grid.
  # Indexing starts with 0.
  nthRow: (index = 0) ->
    element = @findElement @By.css("tbody tr.jqgrow:nth-child(#{index + 2})")
    new GridRowView(element)

  # Retrieve the first row from the grid.
  firstRow: -> @nthRow(0)

module.exports = GridView
