require("jasmine-only")

utils = require("./helpers/utils")
UsersDialogBasedPage = require("./helpers/page_objects/users_dialog_based_page")

describe "Users grid example scenario", ->

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
        nameFilter = searchForm.filterFor "name"
        nameFilter.sendKeys "Teancum"
        searchForm.submit()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Teancum"

        nameFilter.clear()
        nameFilter.sendKeys "Nephi"
        searchForm.submit()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Nephi"

        searchForm.reset()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("login").getText()).toEqual "login-0"
        expect(firstRow.cellByName("name").getText()).toEqual "Moroni"

      it "filters by allowance", ->
        allowanceFilter = searchForm.filterFor "allowance"
        allowanceFilter.sendKeys "50"

        searchForm.submit()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("allowance").getText()).toEqual "50"

        searchForm.reset()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Moroni"
        expect(firstRow.cellByName("allowance").getText()).toNotEqual "50"

      it "filters by birthday", ->
        birthdayFromFilter = searchForm.filterFor "birthday.from"
        birthdayFromFilter.sendKeys "10/29/2010"
        birthdayFromFilter.sendKeys protractor.Key.ESCAPE

        birthdayToFilter = searchForm.filterFor "birthday.to"
        birthdayToFilter.sendKeys "10/30/2010"
        birthdayToFilter.sendKeys protractor.Key.ESCAPE

        searchForm.submit()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Ether"
        expect(firstRow.cellByName("allowance").getText()).toEqual "42"
        expect(firstRow.cellByName("birthday").getText()).toEqual "Oct 29, 2010"

  describe "quick search", ->

    it "filters the grid", ->
      quickSearch = page.gridNavbar.quickSearch

      quickSearch.searchFor "Ether"
      firstRow = page.grid.firstRow()
      expect(firstRow.cellByName("name").getText()).toEqual "Ether"

      quickSearch.clear()
      firstRow = page.grid.firstRow()
      expect(firstRow.cellByName("name").getText()).toEqual "Moroni"
