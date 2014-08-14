utils = require("./helpers/utils")
GridExamplePage = require("./helpers/page_objects/grid_example_page")

describe "Grid example scenario", ->

  page = null

  beforeEach ->
    browser.driver.manage().window().setSize(1440, 900)
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
    expect(page.grid.isDisplayed()).toBe(true)

    # should display 20 rows in the grid
    gridRows = page.grid.rows
    gridRows.then (arr) -> expect(arr.length).toEqual 20

  describe "click on `Add new record`", ->

    beforeEach -> page.gridNavbar.createButton.click()

    it "displays create record dialog", ->
      expect(page.modalForm.isDisplayed()).toBe(true)
      expect(page.modalForm.header.getText()).toEqual "Create new record"

    describe "do not fill and submit the form", ->
      beforeEach -> page.modalForm.submit()

      it "displays validation errors", ->
        # has errors on the name
        customerName = page.modalForm.findField("record.customer.name")
        expect(customerName.hasError()).toBe(true)
        expect(customerName.error.getText()).toEqual "This field is required"

        # has errors on the passwords
        passwd = page.modalForm.findField("record.password")
        expect(passwd.hasError()).toBe(true)
        expect(passwd.error.getText()).toEqual "This field is required"

        passwd.setValue "123"
        expect(passwd.error.getText()).toEqual "Password must be at least 6 characters"

        # has errors on the password confirmation
        passwdConfirmation = page.modalForm.findField("record.passwordConfirmation")
        expect(passwdConfirmation.hasError()).toBe(true)
        expect(passwdConfirmation.error.getText()).toEqual "This field is required"

        passwdConfirmation.setValue "123456"
        expect(passwdConfirmation.error.getText()).toEqual "The password does not match the confirmation"

    describe "fill in and submit the form", ->
      beforeEach ->
        page.modalForm.setFieldValue "record.customer.name", "New Customer Name"
        page.modalForm.setFieldValue "record.password", "password"
        page.modalForm.setFieldValue "record.passwordConfirmation", "password"
        page.modalForm.submit()

      it "creates a new record", ->
        # should add a new row on the top of the grid
        firstRow = page.grid.firstRow()
        expect(firstRow.value("customer.name")).toEqual "New Customer Name"

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
        expect(page.modalForm.header.getText()).toEqual "Edit record Test Customer 1"

        customerName = page.modalForm.findField("record.customer.name")
        expect(customerName.getValue()).toEqual "Test Customer 1"

        noteField = page.modalForm.findField("record.note")
        expect(noteField.getValue()).toEqual "Note number 1"

      describe "update customer name and submit the form", ->

        it "updates the row", ->
          page.modalForm.setFieldValue "record.customer.name", "Updated Customer Name"
          page.modalForm.submit()

          # should add a new row on the top
          firstRow = page.grid.firstRow()
          expect(firstRow.value("id")).toEqual "1"
          expect(firstRow.value("customer.name")).toEqual "Updated Customer Name"

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
          expect(firstRow.value("id")).toEqual "2"
          expect(firstRow.value("customer.name")).toEqual "Test Customer 2"

    describe "click on `delete` row", ->

      it "deletes the row", ->
        popover.deleteButton.click()

        # wait until the first row disappears
        deletedRow = page.grid.firstRow()
        deletedRow.waitUntilFadeOut()

        # should delete the first row
        firstRow = page.grid.firstRow()
        expect(firstRow.value("id")).toEqual "2"
        expect(firstRow.value("customer.name")).toEqual "Test Customer 2"
