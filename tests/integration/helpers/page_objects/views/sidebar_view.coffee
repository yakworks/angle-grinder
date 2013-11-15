PageObject = require("./../page_object")

class SidebarView extends PageObject

  @has "gridExample", ->
    @findElement @By.linkText("Grid example")

  @has "userDialogBased", ->
    @findElement @By.linkText("Users (dialog based)")

module.exports = SidebarView
