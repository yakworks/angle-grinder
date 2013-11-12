PageObject = require("./../page_object")

class PopoverView extends PageObject

  @has "editButton", ->
    @findElement @By.linkText("edit")

  @has "deleteButton", ->
    @findElement @By.linkText("delete")

module.exports = PopoverView
