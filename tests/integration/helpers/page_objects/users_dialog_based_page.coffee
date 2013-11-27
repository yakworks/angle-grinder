PageWithGrid = require("./page_with_grid")

class UsersDialogBasedPage extends PageWithGrid

  @has "grid", ->
    @getGridView "usersGrid"

module.exports = UsersDialogBasedPage
