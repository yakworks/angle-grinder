PageObject = require("./../page_object")

NavbarTopView = require("./views/navbar_top_view")
SidebarView = require("./views/sidebar_view")
GridNavbarView = require("./views/grid_navbar_view")
GridView = require("./views/grid_view")
ModalFormView = require("./views/modal_form_view")

class PageWithGrid extends PageObject

  @has "navbarTop", ->
    element = @findElement @By.css(".navbar-fixed-top")
    new NavbarTopView(element)

  @has "sidebar", ->
    element = @findElement @By.css(".bs-docs-sidebar")
    new SidebarView(element)

  @has "heading", ->
    @findElement @By.css("section.content h2")

  @has "gridNavbar", ->
    element = @findElement @By.css(".navbar-grid")
    new GridNavbarView(element, @grid)

  @has "modalForm", ->
    element = @findElement @By.css(".modal")
    new ModalFormView(element)

  getGridView: (name) ->
    element = @findElement @By.css("div[ag-grid-name='#{name}']")
    new GridView(element, name)

module.exports = PageWithGrid
