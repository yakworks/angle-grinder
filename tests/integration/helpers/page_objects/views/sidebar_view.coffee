PageObject = require("./../page_object")

class SidebarView extends PageObject

  @has "gridExample", ->
    @findElement @By.linkText("Grid example")

module.exports = SidebarView
