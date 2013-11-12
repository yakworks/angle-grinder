PageObject = require("./../page_object")

class NavbarTopView extends PageObject

  @has "examples", ->
    @findElement @By.linkText("Examples")

module.exports = NavbarTopView
