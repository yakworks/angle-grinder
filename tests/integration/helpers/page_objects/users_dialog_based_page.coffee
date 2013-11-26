PageWithGrid = require("./page_with_grid")
GridView = require("./views/grid_view")

class UsersDialogBasedPage extends PageWithGrid

  @has "grid", ->
    @getGridView "usersGrid"

module.exports = UsersDialogBasedPage
