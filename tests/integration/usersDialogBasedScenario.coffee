expect = require("./helpers/expect")

utils = require("./helpers/utils")
UsersDialogBasedPage = require("./helpers/page_objects/users_dialog_based_page")

describe "Users dialog based grid scenario", ->
  beforeEach ->
    utils.loadFixtures()
    browser.get "/"

  page = null

  beforeEach ->
    page = new UsersDialogBasedPage()

    # navigate to the basic grid example
    page.navbarTop.examples.click()
    page.sidebar.userDialogBased.click()
    page.grid.waitForData()

  it "navigates to the correct page", ->
    expect(page.getCurrentUrl()).to.eventually.match /\/examples\/usersDialog/
    expect(page.getTitle()).to.eventually.eq "Angle Grinder - Bootstrap and Grid"
    expect(page.heading.getText()).to.eventually.eq "Users dialog based example"

  describe "search filters", ->
    searchForm = null

    beforeEach ->
      page.gridNavbar.searchButton.click()
      searchForm = page.gridSeachForm

    it "displays search filters", ->
      expect(searchForm.isDisplayed()).to.eventually.be.true

    describe "advanced search form", ->

      it "filters by name", ->
        searchForm.fillInAndSubmit name: "Teancum"
        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).to.eventually.eq "Teancum"

        searchForm.fillInAndSubmit name: "Nephi"
        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).to.eventually.eq "Nephi"

        searchForm.reset()

        firstRow = page.grid.firstRow()
        expect(firstRow.value("login")).to.eventually.eq "login-1"
        expect(firstRow.value("name")).to.eventually.eq "Moroni"

      it "filters by allowance", ->
        searchForm.fillInAndSubmit allowance: "50"
        firstRow = page.grid.firstRow()
        expect(firstRow.value("allowance")).to.eventually.eq "50"

        searchForm.reset()
        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).to.eventually.eq "Moroni"
        expect(firstRow.value("allowance")).to.not.eventually.eq "50"

      it "filters by birthday", ->
        searchForm.fillInAndSubmit
          "birthday.from": "10/29/2010"
          "birthday.to":   "10/30/2010"

        firstRow = page.grid.firstRow()
        expect(firstRow.value("name")).to.eventually.eq "Ether"
        expect(firstRow.value("allowance")).to.eventually.eq "42"
        expect(firstRow.value("birthday")).to.eventually.eq "Oct 29, 2010"

  describe "quick search", ->

    it "filters the grid", ->
      quickSearch = page.gridNavbar.quickSearch

      quickSearch.searchFor "Ether"
      firstRow = page.grid.firstRow()
      expect(firstRow.value("name")).to.eventually.eq "Ether"

      quickSearch.clear()
      firstRow = page.grid.firstRow()
      expect(firstRow.value("name")).to.eventually.eq "Moroni"

  describe "click on `New user`", ->

    beforeEach -> page.gridNavbar.createButton.click()

    it "displays create item dialog", ->
      expect(page.modalForm.isDisplayed()).to.eventually.be.true
      expect(page.modalForm.header.getText()).to.eventually.eq "Create New User"

    describe "fill in and submit the form", ->
      beforeEach ->

        page.modalForm.fillInAndSubmit
          "item.name": "New User Name"
          "item.login": "new-user"
          "item.info.email": "new-user@email.com"
          "item.allowance": "99.99"
          "item.birthday": "03/04/1983"
          "item.password": "password"
          "item.passwordConfirmation": "password"

      it "creates a new record", ->
        # should add a new row on the top of the grid
        firstRow = page.grid.firstRow()

        expect(firstRow.value("login")).to.eventually.eq "new-user"
        expect(firstRow.value("info.email")).to.eventually.eq "new-user@email.com"
        expect(firstRow.value("name")).to.eventually.eq "New User Name"
        expect(firstRow.value("allowance")).to.eventually.eq "99.99"
        expect(firstRow.value("birthday")).to.eventually.eq "Mar 4, 1983"

  describe "grid row popover", ->
    popover = null

    beforeEach ->
      # open the popover for the first row
      firstRow = page.grid.firstRow()
      popover = firstRow.showPopover()

    describe "click on `edit` row", ->

      beforeEach -> popover.editButton.click()

      it "displays edit item dialog", ->
        expect(page.modalForm.isDisplayed()).to.eventually.be.true
        expect(page.modalForm.header.getText()).to.eventually.eq "Edit User Moroni"

        customeName = page.modalForm.findField("item.name")
        expect(customeName.getValue()).to.eventually.eq "Moroni"

        noteField = page.modalForm.findField("item.login")
        expect(noteField.getValue()).to.eventually.eq "login-1"

      describe "update customer name and submit the form", ->

        it "updates the row", ->
          page.modalForm.setFieldValue "item.name", "Lukasz"
          page.modalForm.submit()

          # should add a new row on the top
          firstRow = page.grid.firstRow()
          expect(firstRow.value("name")).to.eventually.eq "Lukasz"

      describe "click `delete` button inside the modal dialog", ->

        it "deletes the row", ->
          deleteButton = page.modalForm.deleteButton

          expect(deleteButton.getText()).to.eventually.eq "Delete"
          deleteButton.click()

          expect(deleteButton.getText()).to.eventually.eq "Are you sure?"
          deleteButton.click()

          # wait until the first row disappears
          deletedRow = page.grid.firstRow()
          deletedRow.waitUntilFadeOut()

          # should delete the first row
          firstRow = page.grid.firstRow()
          expect(firstRow.value("login")).to.eventually.eq "login-2"

    describe "click on `delete` row", ->

      it "deletes the row", ->
        popover.deleteButton.click()

        # should display confirmation dialog
        modal = browser.findElement(protractor.By.css(".modal"))
        expect(modal.findElement(protractor.By.css(".modal-body")).getText()).to.eventually.eq "Are you sure?"
        # click OK button
        modal.findElement(protractor.By.css(".modal-footer .btn-primary")).click()

        # wait until the first row disappears
        deletedRow = page.grid.firstRow()
        deletedRow.waitUntilFadeOut()

        # should delete the first row
        firstRow = page.grid.firstRow()
        expect(firstRow.value("login")).to.eventually.eq "login-2"
