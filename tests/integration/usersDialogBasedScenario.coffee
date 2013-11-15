require("jasmine-only")

utils = require("./helpers/utils")
UsersDialogBasedPage = require("./helpers/page_objects/users_dialog_based_page")

describe "Grid example scenario", ->

  page = null

  beforeEach ->
    browser.get "/"
    page = new UsersDialogBasedPage()

    # navigate to the basic grid example
    page.navbarTop.examples.click()
    page.sidebar.userDialogBased.click()

  it "navigates to the correct page", ->
    expect(page.getCurrentUrl()).toMatch /\/examples\/usersDialog/
    expect(page.getTitle()).toEqual "Angle Grinder - Bootstrap and Grid"
    expect(page.heading.getText()).toEqual "Users dialog based example"

  describe "serach filters", ->
    form = null

    beforeEach ->
      page.gridNavbar.searchButton.click()
      form = browser.findElement(protractor.By.css("form[name='searchForm']"))

    it "displays search filters", ->
      expect(form.isDisplayed()).toBeTruthy()

    describe "advanced search form", ->

      it "filters the grid", ->
        submitButton = form.findElement(protractor.By.xpath(".//button[contains(., 'Search')]"))
        resetButton = form.findElement(protractor.By.xpath(".//button[contains(., 'Reset')]"))

        name = form.findElement(protractor.By.model("filters.name"))
        name.sendKeys "Teancum"

        submitButton.click()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Teancum"

        resetButton.click()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("login").getText()).toEqual "login-0"
        expect(firstRow.cellByName("name").getText()).toEqual "Moroni"

        allowance = form.findElement(protractor.By.model("filters.allowance"))
        allowance.sendKeys "50"

        submitButton.click()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("allowance").getText()).toEqual "50"

        resetButton.click()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Moroni"
        expect(firstRow.cellByName("allowance").getText()).toNotEqual "50"

        birthdayFrom = form.findElement(protractor.By.model("filters.birthday.from"))
        birthdayFrom.sendKeys "10/29/2010"

        birthdayTo = form.findElement(protractor.By.model("filters.birthday.to"))
        birthdayTo.sendKeys "10/30/2010"

        submitButton.click()

        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("name").getText()).toEqual "Ether"
        expect(firstRow.cellByName("allowance").getText()).toEqual "42"
        expect(firstRow.cellByName("birthday").getText()).toEqual "Oct 29, 2010"

  describe "quick search", ->

    it "filters the grid", ->
      quickSearch = browser.findElement(protractor.By.model("filters.quickSearch"))

      # search for "Ether"
      quickSearch.sendKeys "Ether"
      quickSearch.sendKeys protractor.Key.ENTER

      utils.takeScreenshot()

      firstRow = page.grid.firstRow()
      expect(firstRow.cellByName("name").getText()).toEqual "Ether"

      # clear quick search
      quickSearch.clear()
      quickSearch.sendKeys " "
      quickSearch.sendKeys protractor.Key.ENTER

      firstRow = page.grid.firstRow()
      expect(firstRow.cellByName("name").getText()).toEqual "Moroni"
