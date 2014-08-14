PageObject = require("./../../page_object")

class NavbarTopView extends PageObject

  @has "examples", ->
    @element @By.linkText("Examples")

module.exports = NavbarTopView
