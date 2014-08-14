utils = require("./helpers/utils")
UsersDialogBasedPage = require("./helpers/page_objects/users_dialog_based_page")

describe "Users dialog based grid scenario", ->
  beforeEach ->
    utils.loadFixtures()

    browser.driver.manage().window().setSize(1440, 900)
    browser.get "/"

  page = null

  beforeEach ->
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
      searchForm = page.gridSearchForm

    it "displays search filters", ->
      expect(searchForm.isDisplayed()).toBe(true)

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
        expect(firstRow.value("login")).toEqual "login-1"
        expect(firstRow.value("name")).toEqual "Moroni"

      it "filters by allowance", ->
        searchForm.fillInAndSubmit allowance: "50"
        firstRow = page.grid.firstRow()
        expect(firstRow.value("creditInfo.allowance")).toEqual "50"

        searchForm.reset()
        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).toEqual "Moroni"
        expect(firstRow.value("creditInfo.allowance")).not.toEqual "50"

      it "filters by birthday", ->
        searchForm.fillInAndSubmit
          "birthday.from": "10/28/2010"
          "birthday.to":   "10/31/2010"

        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).toEqual "Ether"
        expect(firstRow.value("creditInfo.allowance")).toEqual "42"

  describe "quick search", ->

    it "filters the grid", ->
      quickSearch = page.gridNavbar.quickSearch

      quickSearch.searchFor "Ether"
      firstRow = page.grid.firstRow()
      expect(firstRow.value("name")).toEqual "Ether"

      quickSearch.clear()
      firstRow = page.grid.firstRow()
      expect(firstRow.value("name")).toEqual "Moroni"

  describe "click on `New user`", ->

    beforeEach -> page.gridNavbar.createButton.click()

    it "displays create item dialog", ->
      expect(page.modalForm.isDisplayed()).toBe(true)
      expect(page.modalForm.header.getText()).toEqual "Create user"

    describe "fill in and submit the form", ->
      beforeEach ->

        page.modalForm.fillInAndSubmit
          "user.name": "New User Name"
          "user.login": "new-user"
          "user.info.email": "new-user@email.com"
          "user.creditInfo.allowance": "99.99"
          "user.birthday": "03/04/1983"
          "user.password": "password"
          "user.passwordConfirmation": "password"

      it "creates a new record", ->
        # should add a new row on the top of the grid
        firstRow = page.grid.firstRow()

        expect(firstRow.value("login")).toEqual "new-user"
        expect(firstRow.value("info.email")).toEqual "new-user@email.com"
        expect(firstRow.value("name")).toEqual "New User Name"
        expect(firstRow.value("creditInfo.allowance")).toEqual "99.99"
        expect(firstRow.value("birthday")).toEqual "3/4/83 12:00 AM"

  describe "grid row popover", ->
    popover = null

    beforeEach ->
      # open the popover for the first row
      firstRow = page.grid.firstRow()
      popover = firstRow.showPopover()

    describe "click on `edit` row", ->

      beforeEach -> popover.editButton.click()

      it "displays edit item dialog", ->
        expect(page.modalForm.isDisplayed()).toBe(true)
        expect(page.modalForm.header.getText()).toEqual "Edit user Moroni"

        customerName = page.modalForm.findField("user.name")
        expect(customerName.getValue()).toEqual "Moroni"

        noteField = page.modalForm.findField("user.login")
        expect(noteField.getValue()).toEqual "login-1"

      describe "update customer name and submit the form", ->

        it "updates the row", ->
          page.modalForm.setFieldValue "user.name", "Lukasz"
          page.modalForm.submit()

          # should add a new row on the top
          firstRow = page.grid.firstRow()
          expect(firstRow.value("name")).toEqual "Lukasz"

      describe "click `delete` button inside the modal dialog", ->

        it "deletes the row", ->
          deleteButton = page.modalForm.deleteButton

          expect(deleteButton.getText()).toEqual "Delete"
          deleteButton.click()

          expect(deleteButton.getText()).toEqual "Are you sure?"
          deleteButton.click()

          # wait until the first row disappears
          deletedRow = page.grid.firstRow()
          deletedRow.waitUntilFadeOut()

          # should delete the first row
          firstRow = page.grid.firstRow()
          expect(firstRow.value("login")).toEqual "login-2"

    describe "click on `delete` row", ->

      it "deletes the row", ->
        popover.deleteButton.click()

        # should display confirmation dialog
        modal = element(protractor.By.css(".modal"))
        expect(modal.element(protractor.By.css(".modal-body")).getText()).toEqual "Are you sure?"
        # click OK button
        modal.element(protractor.By.css(".modal-footer .btn-primary")).click()

        # wait until the first row disappears
        deletedRow = page.grid.firstRow()
        deletedRow.waitUntilFadeOut()

        # should delete the first row
        firstRow = page.grid.firstRow()
        expect(firstRow.value("login")).toEqual "login-2"
