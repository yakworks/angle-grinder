PageObject = require("./../../page_object")

class GridSearchForm extends PageObject

  constructor: (@element, @grid) ->

  @has "submitButton", ->
    @findElement @By.xpath(".//button[contains(., 'Search')]")

  @has "resetButton", ->
    @findElement @By.xpath(".//button[contains(., 'Reset')]")

  findFilterBy: (name) ->
    @findElement @By.model("filters.#{name}")

  setFilterValue: (name, value) ->
    filter = @findFilterBy(name)

    # set the filter value
    filter.clear()
    filter.sendKeys value

    # it will close date pickers
    filter.sendKeys protractor.Key.ESCAPE

  submit: ->
    @submitButton.click()
    @grid.waitForData()

  # Fill in the form with given values
  # ..submit it
  # ..and wait until the grid will be reloaded
  fillInAndSubmit: (filters = {}) ->
    @setFilterValue(name, value) for name, value of filters
    @submit()

  reset: ->
    @resetButton.click()
    @grid.waitForData()

module.exports = GridSearchForm
