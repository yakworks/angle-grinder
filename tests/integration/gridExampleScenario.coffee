require("jasmine-only")

utils = require("./helpers/utils")
GridExamplePage = require("./helpers/page_objects/grid_example_page")

describe "Grid example scenario", ->

  page = null

  beforeEach ->
    browser.get "/"
    page = new GridExamplePage()

    # navigate to the basic grid example
    page.navbarTop.examples.click()
    page.sidebar.gridExample.click()

  it "navigates to the correct page", ->
    expect(page.getCurrentUrl()).toMatch /\/examples\/gridExample$/
    expect(page.getTitle()).toEqual "Angle Grinder - Bootstrap and Grid"
    expect(page.heading.getText()).toEqual "Grid example"

  it "displays the grid", ->
    expect(page.grid.isDisplayed()).toBeTruthy()

    # should display 20 rows in the grid
    gridRows = page.grid.rows
    gridRows.then (arr) -> expect(arr.length).toEqual 20

  describe "click on `Add new record`", ->

    beforeEach -> page.gridNavbar.createButton.click()

    it "displays create item dialog", ->
      expect(page.modalForm.isDisplayed()).toBeTruthy()
      expect(page.modalForm.header.getText()).toEqual "Create New Item"

    describe "do not fill and submit the form", ->
      beforeEach -> page.modalForm.submit()

      it "displays validation errors", ->
        # has errors on the name
        customerName = page.modalForm.findField("item.customer.name")
        expect(customerName.hasError()).toBeTruthy()
        expect(customerName.error.getText()).toEqual "This field is required"

        # has errors on the passwords
        passwd = page.modalForm.findField("item.password")
        expect(passwd.hasError()).toBeTruthy()
        expect(passwd.error.getText()).toEqual "This field is required"

        passwd.setValue "123"
        expect(passwd.error.getText()).toEqual "Password must be at least 6 characters"

        # has errors on the password confirmation
        passwdConfirmation = page.modalForm.findField("item.passwordConfirmation")
        expect(passwdConfirmation.hasError()).toBeTruthy()
        expect(passwdConfirmation.error.getText()).toEqual "This field is required"

        passwdConfirmation.setValue "123456"
        expect(passwdConfirmation.error.getText()).toEqual "The password does not match the confirmation"

    describe "fill in and submit the form", ->
      beforeEach ->
        page.modalForm.setFieldValue "item.customer.name", "New Customer Name"
        page.modalForm.setFieldValue "item.password", "password"
        page.modalForm.setFieldValue "item.passwordConfirmation", "password"
        page.modalForm.submit()

      it "creates a new record", ->
        # should add a new row on the top of the grid
        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("customer.name").getText()).toEqual "New Customer Name"

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
        expect(page.modalForm.header.getText()).toEqual "Edit Item Test Customer 1"

        customeName = page.modalForm.findField("item.customer.name")
        expect(customeName.getValue()).toEqual "Test Customer 1"

        noteField = page.modalForm.findField("item.note")
        expect(noteField.getValue()).toEqual "Note number 1"

      describe "update customer name and submit the form", ->

        it "updates the row", ->
          page.modalForm.setFieldValue "item.customer.name", "Updated Customer Name"
          page.modalForm.submit()

          # should add a new row on the top
          firstRow = page.grid.firstRow()
          expect(firstRow.cellByName("id").getText()).toEqual "1"
          expect(firstRow.cellByName("customer.name").getText()).toEqual "Updated Customer Name"

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
          expect(firstRow.cellByName("id").getText()).toEqual "2"
          expect(firstRow.cellByName("customer.name").getText()).toEqual "Test Customer 2"

    describe "click on `delete` row", ->

      it "deletes the row", ->
        popover.deleteButton.click()

        # wait until the first row disappears
        deletedRow = page.grid.firstRow()
        deletedRow.waitUntilFadeOut()

        # should delete the first row
        firstRow = page.grid.firstRow()
        expect(firstRow.cellByName("id").getText()).toEqual "2"
        expect(firstRow.cellByName("customer.name").getText()).toEqual "Test Customer 2"
