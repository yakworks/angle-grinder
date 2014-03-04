PageObject = require("./../../page_object")
PopoverView = require("./popover_view")

class GridRowView extends PageObject

  constructor: (@element, @grid) ->

  # Retrieve cell element by col name
  # for example `customer.name`
  cellByName: (name) ->
    @findElement @By.css("td[aria-describedby$='#{@grid.gridName}_#{name}']")

  # Retrieve cell value for the given col name
  value: (name) -> @cellByName(name).getText()

  @has "popoverButton", ->
    @findElement @By.css("td[aria-describedby='#{@grid.gridName}_-row_action_col'] a.jqg-row-action")

  showPopover: ->
    @popoverButton.click()
    element = browser.findElement @By.css(".row-action-popover")
    new PopoverView(element)

  # Wait until the current row disappears from the grid
  waitUntilFadeOut: ->
    @cellByName("id").getText().then (id) =>

      untilTheRowGone = =>
        @grid.findElements(@By.xpath(".//tbody/tr[@id=#{id}]")).then (rows) ->
          rows.length is 0

      browser.wait untilTheRowGone

class GridView extends PageObject

  constructor: (@element, @gridName) ->

  @has "rows", ->
    @findElements @By.css("tbody tr.jqgrow")

  # Retrieve nth row from the grid.
  # Indexing starts with 0.
  nthRow: (index = 0) ->
    element = @findElement @By.css("tbody tr.jqgrow:nth-child(#{index + 2})")
    new GridRowView(element, this)

  # Retrieve the first row from the grid.
  firstRow: -> @nthRow(0)

  # Wait until grid loading is complete
  waitForData: ->
    forGridData = => @findElement(@By.css(".loading")).isDisplayed().then (displayed) ->
      not displayed

    browser.wait forGridData

module.exports = GridView
