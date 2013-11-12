require("jasmine-only")

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

    grid = browser.findElement(protractor.By.css("div[ag-grid-name=grid]"))

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
      form = modal.findElement(protractor.By.css("form[name=editForm]"))

    it "displays a form inside a popup window", ->
      expect(modal.isDisplayed()).toBeTruthy()

      modalHeader = modal.findElement(protractor.By.css(".modal-header h3"))
      expect(modalHeader.getText()).toEqual "Create New Item"

      expect(form.isDisplayed()).toBeTruthy()

    describe "do not fill and submit the form", ->

      it "displays validation errors", ->
        # sumit the form
        form.findElement(protractor.By.css("button[type=submit]")).click()

        customerNameField = form.findElement(protractor.By.model("item.customer.name"))
        customerNameField.getAttribute("class").then (cls) ->
          expect(cls.split(" ")).toContain "ng-invalid"

        errorMsg = form.findElement(protractor.By.css("ag-validation-errors[for=customerName]"))
        expect(errorMsg.getText()).toEqual "This field is required"

        passwordField = form.findElement(protractor.By.model("item.password"))
        passwordField.getAttribute("class").then (cls) ->
          expect(cls.split(" ")).toContain "ng-invalid"

        passwordConfirmationField = form.findElement(protractor.By.model("item.passwordConfirmation"))
        passwordConfirmationField.getAttribute("class").then (cls) ->
          expect(cls.split(" ")).toContain "ng-invalid"

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
