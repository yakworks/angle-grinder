require("jasmine-only")
fs = require("fs")

takeScreenshot = (fileName = "screenshot-#{new Date()}") ->
  browser.takeScreenshot().then (screenshot) ->
    fs.writeFileSync("#{fileName}.png", screenshot, "base64")

describe "Basic Grid", ->

  grid = null

  beforeEach ->
    browser.get "/"

    # Click `Examples`
    navbarTop = browser.findElement(protractor.By.css(".navbar-fixed-top"))
    navbarTop.findElement(protractor.By.linkText("Examples")).click()

    # Click `Grid example`
    sidebar = browser.findElement(protractor.By.css(".bs-docs-sidebar"))
    sidebar.findElement(protractor.By.linkText("Grid example")).click()

    grid = browser.findElement(protractor.By.css("div[ag-grid-name='grid']"))

  it "navigates to the correct page", ->
    expect(browser.getCurrentUrl()).toMatch /gridExample/
    expect(browser.getTitle()).toEqual "Angle Grinder - Bootstrap and Grid"
    expect(browser.findElement(protractor.By.css("section.content h2")).getText()).toEqual "Grid example"

  it "displays the grid", ->
    expect(grid.isDisplayed()).toBeTruthy()

    rows = grid.findElements(protractor.By.css("tbody tr.jqgrow"))
    rows.then (arr) ->
      expect(arr.length).toEqual 20

  describe "click on `Add new record`", ->
    modal = null
    form = null

    beforeEach ->
      navbarGrid = browser.findElement(protractor.By.css(".navbar-grid"))
      navbarGrid.findElement(protractor.By.linkText("Add new record")).click()

      modal = browser.findElement(protractor.By.css(".modal"))
      form = modal.findElement(protractor.By.css("form[name='editForm']"))

    it "displays create item dialog", ->
      expect(modal.isDisplayed()).toBeTruthy()

      modalHeader = modal.findElement(protractor.By.css(".modal-header h3"))
      expect(modalHeader.getText()).toEqual "Create New Item"

      expect(form.isDisplayed()).toBeTruthy()

    describe "do not fill and submit the form", ->

      it "displays validation errors", ->
        # sumit the form
        form.findElement(protractor.By.css("button[type=submit]")).click()

        # has errors on name
        controlGroup = form.findElement(protractor.By.css("div.control-group[for='customerName']"))
        customerNameField = controlGroup.findElement(protractor.By.model("item.customer.name"))
        customerNameField.getAttribute("class").then (cls) ->
          expect(cls.split(" ")).toContain "ng-invalid"

        errorMsg = controlGroup.findElement(protractor.By.css("ag-validation-errors[for='customerName']"))
        expect(errorMsg.getText()).toEqual "This field is required"

        # has errors on passwords
        controlGroup = form.findElement(protractor.By.css("div.control-group[for='password,passwordConfirmation']"))

        passwordField = controlGroup.findElement(protractor.By.model("item.password"))
        passwordField.getAttribute("class").then (cls) ->
          expect(cls.split(" ")).toContain "ng-invalid"

        errorMsg = controlGroup.findElement(protractor.By.css("ag-validation-errors[for='password']"))
        expect(errorMsg.getText()).toEqual "This field is required"

        passwordField.sendKeys "123"
        errorMsg = controlGroup.findElement(protractor.By.css("ag-validation-errors[for='password']"))
        expect(errorMsg.getText()).toEqual "Password must be at least 6 characters"

        passwordConfirmationField = controlGroup.findElement(protractor.By.model("item.passwordConfirmation"))
        passwordConfirmationField.getAttribute("class").then (cls) ->
          expect(cls.split(" ")).toContain "ng-invalid"

        errorMsg = controlGroup.findElement(protractor.By.css("ag-validation-errors[for='passwordConfirmation']"))
        expect(errorMsg.getText()).toEqual "This field is required"

        passwordConfirmationField.sendKeys "123456"
        errorMsg = controlGroup.findElement(protractor.By.css("ag-validation-errors[for='passwordConfirmation']"))
        expect(errorMsg.getText()).toEqual "The password does not match the confirmation"

    describe "fill in and submit the form", ->

      it "creates a new record", ->
        customerNameField = form.findElement(protractor.By.model("item.customer.name"))
        customerNameField.sendKeys "New Customer Name"

        passwordField = form.findElement(protractor.By.model("item.password"))
        passwordField.sendKeys "password"

        passwordConfirmationField = form.findElement(protractor.By.model("item.passwordConfirmation"))
        passwordConfirmationField.sendKeys "password"

        # sumit the form
        form.findElement(protractor.By.css("button[type=submit]")).click()

        # should add a new row on the top
        firstRow = grid.findElement(protractor.By.css("tbody tr.jqgrow:nth-child(2)"))
        expect(firstRow.findElement(protractor.By.css("td[aria-describedby='grid_customer.name']")).getText())
          .toEqual "New Customer Name"

  describe "grid row popover", ->
    popover = null

    beforeEach ->
      # open the popover
      firstRow = grid.findElement(protractor.By.css("tbody tr.jqgrow:nth-child(2)"))
      firstRow.findElement(protractor.By.css("td[aria-describedby='grid_row_action_col'] a.jqg-row-action")).click()

      # click edit button
      popover = browser.findElement(protractor.By.css(".row-action-popover"))

    describe "click on `edit` row", ->
      modal = null
      form = null

      beforeEach ->
        popover.findElement(protractor.By.linkText("edit")).click()

        modal = browser.findElement(protractor.By.css(".modal"))
        form = modal.findElement(protractor.By.css("form[name='editForm']"))

      it "displays edit item dialog", ->
        expect(modal.isDisplayed()).toBeTruthy()

        modalHeader = modal.findElement(protractor.By.css(".modal-header h3"))
        expect(modalHeader.getText()).toEqual "Edit Item Test Customer 1"

        expect(form.isDisplayed()).toBeTruthy()

        customerNameField = form.findElement(protractor.By.model("item.customer.name"))
        expect(customerNameField.getAttribute("value")).toEqual "Test Customer 1"

        noteField = form.findElement(protractor.By.model("item.note"))
        expect(noteField.getAttribute("value")).toEqual "Note number 1"

      describe "update customer name and submit the form", ->

        it "updates the row", ->
          customerNameField = form.findElement(protractor.By.model("item.customer.name"))
          customerNameField.clear()
          customerNameField.sendKeys "Updated Customer Name"

          # sumit the form
          form.findElement(protractor.By.css("button[type=submit]")).click()

          # should add a new row on the top
          firstRow = grid.findElement(protractor.By.css("tbody tr.jqgrow:nth-child(2)"))
          expect(firstRow.findElement(protractor.By.css("td[aria-describedby='grid_id']")).getText())
            .toEqual "1"
          expect(firstRow.findElement(protractor.By.css("td[aria-describedby='grid_customer.name']")).getText())
            .toEqual "Updated Customer Name"

      describe "click `delete` button inside the modal dialog", ->

        it "deletes the row", ->
          button = form.findElement(protractor.By.css("button.ag-delete-button"))

          expect(button.getText()).toEqual "Delete"
          button.click()

          expect(button.getText()).toEqual "Are you sure?"
          button.click()

          # wait until row for witem with id=1 disappears
          browser.wait ->
            grid.findElements(protractor.By.id("1")).then (arr) -> arr.length is 0

          # should delete the first row
          firstRow = grid.findElement(protractor.By.css("tbody tr.jqgrow:nth-child(2)"))
          expect(firstRow.findElement(protractor.By.css("td[aria-describedby='grid_id']")).getText())
            .toEqual "2"
          expect(firstRow.findElement(protractor.By.css("td[aria-describedby='grid_customer.name']")).getText())
            .toEqual "Test Customer 2"

    describe "click on `delete` row", ->

      it "deletes the row", ->
        # click delete button
        popover.findElement(protractor.By.linkText("delete")).click()

        # wait until row for witem with id=1 disappears
        browser.wait ->
          grid.findElements(protractor.By.id("1")).then (arr) -> arr.length is 0

        # should delete the first row
        firstRow = grid.findElement(protractor.By.css("tbody tr.jqgrow:nth-child(2)"))
        expect(firstRow.findElement(protractor.By.css("td[aria-describedby='grid_id']")).getText())
          .toEqual "2"
        expect(firstRow.findElement(protractor.By.css("td[aria-describedby='grid_customer.name']")).getText())
          .toEqual "Test Customer 2"
