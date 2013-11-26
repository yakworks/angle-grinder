PageWithGrid = require("./page_with_grid")

NavbarTopView = require("./views/navbar_top_view")
SidebarView = require("./views/sidebar_view")
GridNavbarView = require("./views/grid_navbar_view")
GridView = require("./views/grid_view")
ModalFormView = require("./views/modal_form_view")

class GridExamplePage extends PageWithGrid

  @has "grid", ->
    @getGridView "exampleGrid"

module.exports = GridExamplePage
