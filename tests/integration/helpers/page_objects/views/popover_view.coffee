PageObject = require("./../../page_object")

class PopoverView extends PageObject

  @has "editButton", ->
    @element @By.linkText("edit")

  @has "deleteButton", ->
    @element @By.linkText("delete")

module.exports = PopoverView
