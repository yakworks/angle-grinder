PageObject = require("./../../page_object")

class QuickSearchView extends PageObject

  constructor: (@el, @grid) ->

  @has "input", ->
    @element @By.model("filters.quickSearch")

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

  constructor: (@el, @grid) ->

  @has "createButton", ->
    @element @By.css(".create-button")

  @has "searchButton", ->
    @element @By.css(".fa-search")

  @has "quickSearch", ->
    el = @element @By.css("form.navbar-search")
    new QuickSearchView(el, @grid)

module.exports = GridNavbarView
