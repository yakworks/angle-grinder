baseUrl = "http://localhost:9000"
scenario = require("./test/casperjs/helpers/scenario").create(baseUrl)

scenario "Basic grid scenario", ->

  @feature "Navigate to the example", ->
    @clickLabel "agGrid directive basic", "a"
    @test.assertUrlMatch /ag_grid_directive$/

  @feature "Display grid with all data", ->
    @test.assertSelectorHasText "section.content h2", "Angular directive example"

    fn = -> document.querySelectorAll("tr.jqgrow").length
    @test.assertEvalEquals fn, 20, "Loads grid data and displays the first 20 rows"

    for id in [1...20]
      row = id + 1
      selector = "tr.jqgrow:nth-child(#{row}) td:nth-child(4)"
      @test.assertSelectorHasText selector, "Test Customer #{id}"

  @feature "Add new item", ->
    @clickLabel "Add Item", "button"

    @then ->
      @test.assertSelectorHasText "h3", "Create New Item", "'Create new item dialog' appears"

      @fill "form[name=editForm]",
        customer_name: "New customer"
        date: "2013-07-03"
        note: "This is the test note"
      @click "button[type=submit]"

    @then ->
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(2) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(4), "New customer"
      @test.assertSelectorHasText selectorForColumn(5), "2013-07-03"
      @test.assertSelectorHasText selectorForColumn(6), "This is the test note"

  @feature "Edit item", ->
    @click "tr.jqgrow:nth-child(3) td:nth-child(4) a"

    @then ->
      @test.assertSelectorHasText "h3", "Edit Item Test Customer 1", "Edit item dialog appears"

      @fill "form[name=editForm]",
        customer_name: "New name for the first customer"
        date: "2013-07-04"
        note: "This is the other note"
      @click "button[type=submit]"

    @then ->
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(3) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(3), "1"
      @test.assertSelectorHasText selectorForColumn(4), "New name for the first customer"
      @test.assertSelectorHasText selectorForColumn(5), "2013-07-04"
      @test.assertSelectorHasText selectorForColumn(6), "This is the other note"

  @feature "Edit item from the dropdown menu", ->
    @click "tr.jqgrow:nth-child(4) td:nth-child(2) a[data-toggle=popover]"

    @then ->
      @click "div.popover a.row_action_edit"

      @test.assertSelectorHasText "h3", "Edit Item Test Customer 2", "Edit item dialog appears"

      @fill "form[name=editForm]",
        customer_name: "Yet another name"
      @click "button[type=submit]"

    @then ->
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(4) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(3), "2"
      @test.assertSelectorHasText selectorForColumn(4), "Yet another name"
      @test.assertSelectorHasText selectorForColumn(6), "Note number 2"

  @feature "Sorting", ->
    clickGridHeaderFor = (columnId) =>
      @click "table.ui-jqgrid-htable th#grid_#{columnId} div.ui-jqgrid-sortable"

    @then ->
      # sort by `id` column descending
      clickGridHeaderFor("id")

      # first row
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(2) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(4), "New customer"
      @test.assertSelectorHasText selectorForColumn(6), "This is the test note"

      # second row
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(3) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(4), "Test Customer 100"
      @test.assertSelectorHasText selectorForColumn(6), "Note number 100"

    @then ->
      # sort by `id` column ascending
      clickGridHeaderFor("id")

      # first row
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(2) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(4), "New name for the first customer"
      @test.assertSelectorHasText selectorForColumn(6), "This is the other note"

  @feature "Pagination", ->

    @then ->
      @click "div#gridPager .ui-icon-seek-next"

      # first row
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(2) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(4), "Test Customer 21"
      @test.assertSelectorHasText selectorForColumn(6), "Note number 21"

    @then ->
      @click "div#gridPager .ui-icon-seek-prev"

      # first row
      selectorForColumn = (nth) -> "tr.jqgrow:nth-child(2) td:nth-child(#{nth})"
      @test.assertSelectorHasText selectorForColumn(4), "New name for the first customer"
      @test.assertSelectorHasText selectorForColumn(6), "This is the other note"
