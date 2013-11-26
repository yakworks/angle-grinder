require("jasmine-only")

utils = require("./helpers/utils")
UsersDialogBasedPage = require("./helpers/page_objects/users_dialog_based_page")

describe "Users dialog based grid scenario", ->

  page = null

  beforeEach ->
    browser.get "/"
    page = new UsersDialogBasedPage()

    # navigate to the basic grid example
    page.navbarTop.examples.click()
    page.sidebar.userDialogBased.click()
    page.grid.waitForData()

  it "navigates to the correct page", ->
    expect(page.getCurrentUrl()).toMatch /\/examples\/usersDialog/
    expect(page.getTitle()).toEqual "Angle Grinder - Bootstrap and Grid"
    expect(page.heading.getText()).toEqual "Users dialog based example"

  describe "search filters", ->
    searchForm = null

    beforeEach ->
      page.gridNavbar.searchButton.click()
      searchForm = page.gridSeachForm

    it "displays search filters", ->
      expect(searchForm.isDisplayed()).toBeTruthy()

    describe "advanced search form", ->

      it "filters by name", ->
        searchForm.fillInAndSubmit name: "Teancum"
        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).toEqual "Teancum"

        searchForm.fillInAndSubmit name: "Nephi"
        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).toEqual "Nephi"

        searchForm.reset()

        firstRow = page.grid.firstRow()
        expect(firstRow.value("login")).toEqual "login-0"
        expect(firstRow.value("name")).toEqual "Moroni"

      it "filters by allowance", ->
        searchForm.fillInAndSubmit allowance: "50"
        firstRow = page.grid.firstRow()
        expect(firstRow.value("allowance")).toEqual "50"

        searchForm.reset()
        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).toEqual "Moroni"
        expect(firstRow.value("allowance")).toNotEqual "50"

      it "filters by birthday", ->
        searchForm.fillInAndSubmit
          "birthday.from": "10/29/2010"
          "birthday.to":   "10/30/2010"

        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).toEqual "Ether"
        expect(firstRow.value("allowance")).toEqual "42"
        expect(firstRow.value("birthday")).toEqual "Oct 29, 2010"

  describe "quick search", ->

    it "filters the grid", ->
      quickSearch = page.gridNavbar.quickSearch

      quickSearch.searchFor "Ether"
      firstRow = page.grid.firstRow()
      expect(firstRow.value("name")).toEqual "Ether"

      quickSearch.clear()
      firstRow = page.grid.firstRow()
      expect(firstRow.value("name")).toEqual "Moroni"
