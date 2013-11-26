PageObject = require("./../../page_object")

class GridSearchForm extends PageObject

  constructor: (@element, @grid) ->

  @has "submitButton", ->
    @findElement @By.xpath(".//button[contains(., 'Search')]")

  @has "resetButton", ->
    @findElement @By.xpath(".//button[contains(., 'Reset')]")

  filterFor: (name) ->
    @findElement @By.model("filters.#{name}")

  submit: ->
    @submitButton.click()
    @grid.waitForData()

  reset: ->
    @resetButton.click()
    @grid.waitForData()

module.exports = GridSearchForm
