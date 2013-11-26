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
    form = null

    beforeEach ->
      page.gridNavbar.searchButton.click()
      form = browser.findElement(protractor.By.css("form[name='searchForm']"))

    it "displays search filters", ->
      expect(form.isDisplayed()).toBeTruthy()

    # TODO create PO for advSearchForm
    describe "advanced search form", ->

      it "filters the grid", ->
        submitButton = form.findElement(protractor.By.xpath(".//button[contains(., 'Search')]"))
        resetButton = form.findElement(protractor.By.xpath(".//button[contains(., 'Reset')]"))

        name = form.findElement(protractor.By.model("filters.name"))
        name.sendKeys "Teancum"

        submitButton.click()
        page.grid.waitForData()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Teancum"

        resetButton.click()
        page.grid.waitForData()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("login").getText()).toEqual "login-0"
        expect(firstRow.cellByName("name").getText()).toEqual "Moroni"

        allowance = form.findElement(protractor.By.model("filters.allowance"))
        allowance.sendKeys "50"

        submitButton.click()
        page.grid.waitForData()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("allowance").getText()).toEqual "50"

        resetButton.click()
        page.grid.waitForData()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Moroni"
        expect(firstRow.cellByName("allowance").getText()).toNotEqual "50"

        birthdayFrom = form.findElement(protractor.By.model("filters.birthday.from"))
        birthdayFrom.sendKeys "10/29/2010"

        birthdayTo = form.findElement(protractor.By.model("filters.birthday.to"))
        birthdayTo.sendKeys "10/30/2010"
        browser.findElement(protractor.By.css("body")).click() # click outside to hide date pickers

        submitButton.click()
        page.grid.waitForData()

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
