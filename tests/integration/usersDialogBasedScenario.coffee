require("jasmine-only")

utils = require("./helpers/utils")
UsersDialogBasedPage = require("./helpers/page_objects/users_dialog_based_page")

describe "Users dialog based grid scenario", ->
  beforeEach -> utils.loadFixtures -> browser.get "/"

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
        expect(firstRow.value("login")).toEqual "login-1"
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

  describe "click on `New user`", ->

    beforeEach -> page.gridNavbar.createButton.click()

    it "displays create item dialog", ->
      expect(page.modalForm.isDisplayed()).toBeTruthy()
      expect(page.modalForm.header.getText()).toEqual "Create New User"

    describe "fill in and submit the form", ->
      beforeEach ->
        # TODO this API is ugly
        page.modalForm.setFieldValue "item.name", "New User Name"
        page.modalForm.setFieldValue "item.login", "new-user"
        page.modalForm.setFieldValue "item.info.email", "new-user@email.com"
        page.modalForm.setFieldValue "item.allowance", "99.99"
        page.modalForm.setFieldValue "item.birthday", "03/04/1983"
        page.modalForm.setFieldValue "item.password", "password"
        page.modalForm.setFieldValue "item.passwordConfirmation", "password"

        page.modalForm.submit()

      it "creates a new record", ->
        # should add a new row on the top of the grid
        firstRow = page.grid.firstRow()

        expect(firstRow.value("login")).toEqual "new-user"
        expect(firstRow.value("info.email")).toEqual "new-user@email.com"
        expect(firstRow.value("name")).toEqual "New User Name"
        expect(firstRow.value("allowance")).toEqual "99.99"
        expect(firstRow.value("birthday")).toEqual "Mar 4, 1983"

  describe "grid row popover", ->
    popover = null

    beforeEach ->
      # open the popover for the first row
      firstRow = page.grid.firstRow()
      popover = firstRow.showPopover()

    describe "click on `edit` row", ->

      beforeEach -> popover.editButton.click()

      it "displays edit item dialog", ->
        expect(page.modalForm.isDisplayed()).toBeTruthy()
        expect(page.modalForm.header.getText()).toEqual "Edit User Moroni"

        customeName = page.modalForm.findField("item.name")
        expect(customeName.getValue()).toEqual "Moroni"

        noteField = page.modalForm.findField("item.login")
        expect(noteField.getValue()).toEqual "login-1"

      describe "update customer name and submit the form", ->

        it "updates the row", ->
          page.modalForm.setFieldValue "item.name", "Lukasz"
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
        modal = browser.findElement(protractor.By.css(".modal"))
        expect(modal.findElement(protractor.By.css(".modal-body")).getText()).toEqual "Are you sure?"
        # click OK button
        modal.findElement(protractor.By.css(".modal-footer .btn-primary")).click()

        # wait until the first row disappears
        deletedRow = page.grid.firstRow()
        deletedRow.waitUntilFadeOut()

        # should delete the first row
        firstRow = page.grid.firstRow()
        expect(firstRow.value("login")).toEqual "login-2"
