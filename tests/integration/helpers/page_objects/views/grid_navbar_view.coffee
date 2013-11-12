PageObject = require("./../page_object")

class GridNavbarView extends PageObject

  @has "createButton", ->
    @findElement @By.css(".create-button")

module.exports = GridNavbarView
