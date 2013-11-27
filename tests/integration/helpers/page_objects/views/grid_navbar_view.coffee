PageObject = require("./../../page_object")

class QuickSeachView extends PageObject

  constructor: (@element, @grid) ->

  @has "input", ->
    @findElement @By.model("filters.quickSearch")

  searchFor: (filter) ->
    @input.sendKeys filter
    @input.sendKeys protractor.Key.ENTER
    @grid.waitForData()

  clear: ->
    @input.clear()
    @input.sendKeys " "
    @input.sendKeys protractor.Key.ENTER
    @grid.waitForData()

class GridNavbarView extends PageObject

  constructor: (@element, @grid) ->

  @has "createButton", ->
    @findElement @By.css(".create-button")

  @has "searchButton", ->
    @findElement @By.css(".icon-search")

  @has "quickSearch", ->
    element = @findElement @By.css("form.navbar-search")
    new QuickSeachView(element, @grid)

module.exports = GridNavbarView
