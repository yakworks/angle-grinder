PageObject = require("./../../page_object")

class SidebarView extends PageObject

  @has "gridExample", ->
    @element @By.linkText("Grid example")

  @has "userDialogBased", ->
    @element @By.linkText("Users (dialog based)")

module.exports = SidebarView
