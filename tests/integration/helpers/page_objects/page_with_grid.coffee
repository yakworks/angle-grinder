PageObject = require("./../page_object")

NavbarTopView = require("./views/navbar_top_view")
SidebarView = require("./views/sidebar_view")
ModalFormView = require("./views/modal_form_view")

GridNavbarView = require("./views/grid_navbar_view")
GridView = require("./views/grid_view")
GridSearchFormView = require("./views/grid_search_form_view")

# Common Page Object for all pages with the grid
class PageWithGrid extends PageObject

  @has "navbarTop", ->
    el = @element @By.css(".navbar-fixed-top")
    new NavbarTopView(el)

  @has "sidebar", ->
    el = @element @By.css(".bs-docs-sidebar")
    new SidebarView(el)

  @has "heading", ->
    @element @By.css("section.content h2")

  @has "modalForm", ->
    el = @element @By.css(".modal-dialog")
    new ModalFormView(el)

  @has "gridNavbar", ->
    el = @element @By.css(".navbar-grid")
    new GridNavbarView(el, @grid)

  @has "gridSearchForm", ->
    el = @element @By.css("form[name='searchForm']")
    new GridSearchFormView(el, @grid)

  getGridView: (name) ->
    el = @element @By.css("div[ag-grid-name='#{name}']")
    new GridView(el, name)

module.exports = PageWithGrid
