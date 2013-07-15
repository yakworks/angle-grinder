baseUrl = "http://localhost:9001"
scenario = require("./test/casperjs/helpers/scenario").create(baseUrl)

# Page objects
EditDialog = require("./test/casperjs/helpers/page_objects/edit_dialog").EditDialog
Grid = require("./test/casperjs/helpers/page_objects/grid").Grid

scenario "Basic grid scenario", ->
  grid = new Grid(this)
  dialog = new EditDialog(this)

  @feature "Navigate to the example", ->
    @clickLabel "agGrid directive basic", "a"
    @then ->
      @test.assertUrlMatch /ag_grid_directive$/
      @test.assertSelectorHasText "section.content h2", "Angular directive example"

  @feature "Display the grid with all data", ->
    @test.assertEquals grid.getRowsCount(), 20, "Loads the data and displays the first 20 rows"

    for id in [1...20]
      customerName = grid.getCellText(id - 1, "customer.name")
      @test.assertEquals customerName, "Test Customer #{id}"

  @feature "Add new item", ->
    @click "a.create-button"

    @then ->
      @test.assertTruthy dialog.isVisible(), "'Create new item dialog' appears"
      @test.assertEquals dialog.getTitle(), "Create New Item"

      dialog.fillFormWith
        customerName: "New customer"
        date: "2013-07-03"
        note: "This is the test note"
      dialog.clickSave()
      @test.assertFalsy dialog.isVisible()

    @then ->
      newRow = grid.getRow(0)
      @test.assertEquals newRow["customer.name"], "New customer"
      @test.assertEquals newRow["invoiceDate"], "2013-07-03"
      @test.assertEquals newRow["note"], "This is the test note"

  @feature "Edit item", ->
    # click the customer name in the second row
    grid.clickCell(1, "customer.name")

    @then ->
      @test.assertTruthy dialog.isVisible(), "Edit item dialog appears"
      @test.assertEquals dialog.getTitle(), "Edit Item Test Customer 1"

      dialog.fillFormWith
        customerName: "New name for the first customer"
        date: "2013-07-04"
        note: "This is the other note"
      dialog.clickSave()
      @test.assertFalsy dialog.isVisible()

    @then ->
      updatedRow = grid.getRow(1)
      @test.assertEquals updatedRow["id"], "1"
      @test.assertEquals updatedRow["customer.name"], "New name for the first customer"
      @test.assertEquals updatedRow["invoiceDate"], "2013-07-04"
      @test.assertEquals updatedRow["note"], "This is the other note"

  @feature "Edit item from the dropdown menu", ->
    grid.clickEditRow(2)

    @then ->
      @test.assertTruthy dialog.isVisible(), "Edit item dialog appears"
      @test.assertEquals dialog.getTitle(), "Edit Item Test Customer 2"

      dialog.fillFormWith
        customerName: "Yet another name"
      dialog.clickSave()
      @test.assertFalsy dialog.isVisible()

    @then ->
      updatedRow = grid.getRow(2)
      @test.assertEquals updatedRow["id"], "2"
      @test.assertEquals updatedRow["customer.name"], "Yet another name"
      @test.assertEquals updatedRow["note"], "Note number 2"

  @feature "Sorting", ->
    @then ->
      # sort by `id` column descending
      grid.clickHeader("id")

      firstRow = grid.getRow(0)
      @test.assertEquals firstRow["customer.name"], "New customer"
      @test.assertEquals firstRow["note"], "This is the test note"

      secondRow = grid.getRow(1)
      @test.assertEquals secondRow["id"], "100"
      @test.assertEquals secondRow["customer.name"], "Test Customer 100"
      @test.assertEquals secondRow["note"], "Note number 100"

    @then ->
      # sort by `id` column ascending
      grid.clickHeader("id")

      firstRow = grid.getRow(0)
      @test.assertEquals firstRow["customer.name"], "New name for the first customer"
      @test.assertEquals firstRow["note"], "This is the other note"

  @feature "Pagination", ->
    shouldDisplayTheFirstPage = =>
      firstRow = grid.getRow(0)
      @test.assertEquals firstRow["customer.name"], "New name for the first customer"
      @test.assertEquals firstRow["note"], "This is the other note"

    shouldDisplayTheSecondPage = =>
      firstRow = grid.getRow(0)
      @test.assertEquals firstRow["customer.name"], "Test Customer 21"
      @test.assertEquals firstRow["note"], "Note number 21"

    @then ->
      shouldDisplayTheFirstPage()

    @then ->
      grid.clickNextPage()
      shouldDisplayTheSecondPage()

    @then ->
      grid.clickPrevPage()
      shouldDisplayTheFirstPage()
