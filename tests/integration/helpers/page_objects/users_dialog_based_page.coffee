GridExamplePage = require("./grid_example_page")
GridView = require("./views/grid_view")

class UsersDialogBasedPage extends GridExamplePage

  @has "grid", ->
    element = @findElement @By.css("div[ag-grid-name='usersGrid']")
    new GridView(element, "usersGrid")

module.exports = UsersDialogBasedPage
