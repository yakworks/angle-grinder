PageObject = require("./../../page_object")

class GridNavbarView extends PageObject

  @has "createButton", ->
    @findElement @By.css(".create-button")

  @has "searchButton", ->
    @findElement @By.css(".icon-search")

module.exports = GridNavbarView
