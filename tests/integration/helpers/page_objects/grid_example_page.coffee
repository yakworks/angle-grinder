PageWithGrid = require("./page_with_grid")

class GridExamplePage extends PageWithGrid

  @has "grid", ->
    @getGridView "exampleGrid"

module.exports = GridExamplePage
