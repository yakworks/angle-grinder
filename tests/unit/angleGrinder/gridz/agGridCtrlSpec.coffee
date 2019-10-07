###
describe "module: angleGrinder.gridz, conroller: AgGridCtrl", ->

  beforeEach module "angleGrinder.gridz", ($provide) ->
    # spy for `FlattenServ` service
    $provide.decorator "FlattenServ", ($delegate) ->
      sinon.spy($delegate)

    # mock `xlsData` service
    $provide.value "xlsData", sinon.mock()

    return

  ctrl = null
  jqGridEl = null

  before ->
    @gridParams =
      colModel: [{ name: "foo", hidden: true }, { name: "bar", hidden: false }]

  beforeEach inject ($controller) ->
    jqGridEl = sinon.stub($().jqGrid())

    # stub some grid element methods
    jqGridEl.attr = (name) -> "gridId"
    jqGridEl.getGridParam = (name) => @gridParams[name]

    # stub jQuery element
    $element =
      find: (->
        stub = sinon.stub()
        stub.withArgs("table.gridz").returns(jqGridEl)
        return stub
      )()

    # initialzie the controller
    ctrl = $controller "AgGridCtrl",
      $element: $element, $attrs: {agGrid: 'gridId'}

    sinon.stub(ctrl, "flashOnSuccess")

  describe "#getGridId", ->

    it "returns grid element id", ->
      expect(ctrl.getGridId()).to.eq "gridId"

  describe "#reload", ->

    it "reloads the grid", ->
      # When
      ctrl.reload()

      # Then
      expect(jqGridEl.trigger).to.have.been.called
      expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

    it "returns a promise", inject ($rootScope) ->
      # When
      promise = ctrl.reload()
      $rootScope.$broadcast "gridz:loadComplete", foo: "bar"

      # Then
      resolvedValue = null
      promise.then (data) -> resolvedValue = data

      expect(resolvedValue).to.be.null
      $rootScope.$digest()
      expect(resolvedValue).to.have.property "foo", "bar"

  describe "#getParam", ->
    before -> @gridParams.foo = "bar"

    it "retrieves a particular grid parameter", ->
      expect(ctrl.getParam("foo")).to.eq "bar"

  describe "#setParam", ->
    it "sets a particular grid parameter", ->
      # When
      ctrl.setParam(foo: "bar")

      # Then
      expect(jqGridEl.setGridParam).to.have.been.called
      expect(jqGridEl.setGridParam).to.have.been.calledWith(foo: "bar")

  describe "#updateRow", ->

    context "simple update", ->

      it "updates a row with the given id", ->
        # When
        ctrl.updateRow(123, foo: "bar")

        # Then
        expect(jqGridEl.setRowData).to.have.been.called
        expect(jqGridEl.setRowData).to.have.been.calledWith(123, foo: "bar")

      it "flattens data before inserting it to the grid", inject (FlattenServ) ->
        # When
        ctrl.updateRow(123, foo: bar: "biz")

        # Then
        expect(FlattenServ).to.have.been.called
        expect(FlattenServ).to.have.been.calledWith(foo: bar: "biz")

      it "flashes the updated row", ->
        # Given
        ctrl.updateRow(123, foo: "bar")

        # Then
        expect(ctrl.flashOnSuccess).to.have.been.called
        expect(ctrl.flashOnSuccess).to.have.been.calledWith(123)

    context "when the new data contain empty values", ->
      beforeEach ->
        # stub previous row data
        jqGridEl.getRowData.withArgs(123).returns
          "-row_action_col": "html code for the popup"
          foo: "foo", "bar.baz": "baz", "bar.biz": "biz"

      it "clears the empty values", ->
        # When
        ctrl.updateRow(123, foo: "bar", baz: "baz", bar: {})

        # Then
        expect(jqGridEl.setRowData).to.have.been.called

        args = jqGridEl.setRowData.getCall(0).args
        expect(args[0]).to.eq 123

        expect(args[1]).to.have.property "foo", "bar"
        expect(args[1]).to.have.property "baz", "baz"
        expect(args[1]).to.have.property "bar.baz", null
        expect(args[1]).to.have.property "bar.biz", null

  describe "#addRow", ->

    describe "when the position is not specified", ->
      it "adds a row at the first position", ->
        # When
        ctrl.addRow(234, foo: "biz")

        # Then
        expect(jqGridEl.addRowData).to.have.been.called
        expect(jqGridEl.addRowData).to.have.been.calledWith(234, foo: "biz", "first")

    describe "when the position is specified", ->
      it "adds a row at the specified position", ->
        # When
        ctrl.addRow(234, foo: "biz", "last")

        # Then
        expect(jqGridEl.addRowData).to.have.been.called
        expect(jqGridEl.addRowData).to.have.been.calledWith(234, foo: "biz", "last")

    it "flattens data before inserting it to the grid", inject (FlattenServ) ->
      # When
      ctrl.addRow(234, foo: bar: "baz")

      # Then
      expect(FlattenServ).to.have.been.called
      expect(FlattenServ).to.have.been.calledWith(foo: bar: "baz")

    it "flashes the inserted row", ->
      # When
      ctrl.addRow(234, foo: "bar")

      # Then
      expect(ctrl.flashOnSuccess).to.have.been.called
      expect(ctrl.flashOnSuccess).to.have.been.calledWith(234)

    it "broadcasts `gridz:rowAdded` event", inject ($rootScope) ->
      # Given
      sinon.spy($rootScope, "$broadcast")

      # When
      ctrl.addRow(234, foo: "bar")
      expect($rootScope.$broadcast).to.have.been.called
      expect($rootScope.$broadcast).to.have.been.calledWith("gridz:rowAdded", "gridId", 234, foo: "bar")

      # stop spying
      $rootScope.$broadcast.restore()

  describe "#saveRow", ->

    describe "when a row exists in the grid", ->
      beforeEach -> jqGridEl.getInd.returns(true)

      it "updates a row with the given id", ->
        # When
        ctrl.saveRow(123, foo: "bar")

        # Then
        expect(jqGridEl.setRowData).to.have.been.called
        expect(jqGridEl.setRowData).to.have.been.calledWith(123, foo: "bar")

        expect(jqGridEl.addRowData).to.not.have.been.called

    describe "otherwise", ->
      beforeEach -> jqGridEl.getInd.returns(false)

      it "inserts a new row at the beginning", ->
        # When
        ctrl.saveRow(234, foo: "biz")

        # Then
        expect(jqGridEl.addRowData).to.have.been.called
        expect(jqGridEl.addRowData).to.have.been.calledWith(234, foo: "biz", "first")

        expect(jqGridEl.setRowData).to.not.have.been.called

  describe "#hasRow", ->

    describe "if a row with the given id exists", ->
      it "returns true", ->
        # Given
        jqGridEl.getInd.returns(id: 123, foo: "bar")

        # When
        expect(ctrl.hasRow(123)).to.be.true

        # Then
        expect(jqGridEl.getInd).to.have.been.called
        expect(jqGridEl.getInd).to.have.been.calledWith(123)

    describe "otherwise", ->
      it "returns false", ->
        # Given
        jqGridEl.getInd.returns(false)

        # When
        expect(ctrl.hasRow(234)).to.be.false

        # Then
        expect(jqGridEl.getInd).to.have.been.called
        expect(jqGridEl.getInd).to.have.been.calledWith(234)

  describe "#getIds", ->
    it "returns an array of the id's in the current grid view", ->
      # Given
      jqGridEl.getDataIDs.returns([1, 2, 3])

      # When
      expect(ctrl.getIds()).to.deep.eq [1, 2, 3]

      # Then
      expect(jqGridEl.getDataIDs).to.have.been.called

  describe "#removeRow", ->
    it "removes a row with the given id", ->
      # Given stub with callback
      ctrl.flashOnSuccess.restore()
      sinon.stub(ctrl, "flashOnSuccess", (id, callback) -> callback())

      # When
      ctrl.removeRow(123)

      # Then
      expect(jqGridEl.delRowData).to.have.been.called
      expect(jqGridEl.delRowData).to.have.been.calledWith(123)

    it "flashes the removed row", ->
      # Given
      ctrl.removeRow(345)

      # Then
      expect(ctrl.flashOnSuccess).to.have.been.called
      expect(ctrl.flashOnSuccess).to.have.been.calledWith(345)

  describe "#search", ->
    it "sets search filters and triggers grid reload", ->
      # When
      ctrl.search(login: "foo")

      # Then
      expect(jqGridEl.setGridParam).to.have.been.called
      expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 1, search: true, postData: filters: '{"login":"foo"}')

      expect(jqGridEl.trigger).to.have.been.called
      expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

    it "returns a promise", inject ($rootScope) ->
      # Given
      promise = ctrl.search(login: "foo")
      $rootScope.$broadcast "gridz:loadComplete", {}, foo: "bar"

      resolvedValue = null
      promise.then (data) -> resolvedValue = data
      expect(resolvedValue).to.be.null

      # When
      $rootScope.$apply()

      # Then
      expect(resolvedValue).to.not.be.null
      expect(resolvedValue).to.deep.equal login: "foo"

  describe "#getSelectedRowIds", ->
    before -> @gridParams.selarrrow = [1, 2, 3]

    it "returns a list of selected row ids", ->
      expect(ctrl.getSelectedRowIds()).to.deep.eq [1, 2, 3]

  describe "#getSelectedRows", ->
    beforeEach ->
      jqGridEl.getRowData.withArgs(1).returns id:1
      jqGridEl.getRowData.withArgs(2).returns id:2
      jqGridEl.getRowData.withArgs(3).returns id:3

    it "returns empty array when no rows are selected", ->
      @gridParams.selarrrow = []
      data = ctrl.getSelectedRows()
      expect(data.length).to.eq 0


    it "returns selected row objects", ->
      @gridParams.selarrrow = [1, 2, 3]
      data = ctrl.getSelectedRows()
      expect(data.length).to.eq 3
      expect(jqGridEl.getRowData.getCall(0).calledWith(1)).to.be.true
      expect(jqGridEl.getRowData.getCall(1).calledWith(2)).to.be.true
      expect(jqGridEl.getRowData.getCall(2).calledWith(3)).to.be.true


  describe "#getRowData", ->

    it "returns a row data for the given id", ->
      # When
      ctrl.getRowData(567)

      # Then
      expect(jqGridEl.getRowData).to.have.been.called
      expect(jqGridEl.getRowData).to.have.been.calledWith(567)

  describe "#addJSONData", ->
    stub = null

    beforeEach inject ($rootScope) ->
      stub = sinon.stub()
      jqGridEl.get.withArgs(0).returns(addJSONData: stub)

      sinon.spy($rootScope, "$broadcast")
      ctrl.addJSONData(page: 1, rows: [{name: "foo"}, {name: "bar"}])

    afterEach inject ($rootScope) ->
      $rootScope.$broadcast.restore()

    it "poulates the grid with the given data", ->
      expect(stub).to.have.been.called

    it "broadcasts `gridz:loadComplete` event", inject ($rootScope) ->
      expect($rootScope.$broadcast).to.have.been.called

  describe "#isColumnHidden", ->

    it "is defined", ->
      expect(ctrl.isColumnHidden).to.not.be.undefined

    describe "when a column with the given id is hidden", ->

      it "returns true", ->
        expect(ctrl.isColumnHidden("foo")).to.be.true

    describe "when a column with the given id is not hidden", ->

      it "returns true", ->
        expect(ctrl.isColumnHidden("bar")).to.be.false

    describe "when a column with is missing", ->

      it "returns undefined", ->
        expect(ctrl.isColumnHidden("fooBar")).to.be.undefined

  describe "#toggleColumn", ->
    it "is defined", ->
      expect(ctrl.toggleColumn).to.not.be.undefined

    describe "when the column is hidden", ->
      beforeEach -> ctrl.toggleColumn("foo")

      it "shows the column", ->
        expect(jqGridEl.jqGrid).to.have.been.called
        expect(jqGridEl.jqGrid).to.have.been.calledWith("showCol", "foo")

      it "resizes the grid", ->
        expect(jqGridEl.trigger).to.have.been.called
        expect(jqGridEl.trigger).to.have.been.calledWith("resize")

    describe "when the column is not hidden", ->
      beforeEach -> ctrl.toggleColumn("bar")

      it "hides the column", ->
        expect(jqGridEl.jqGrid).to.have.been.called
        expect(jqGridEl.jqGrid).to.have.been.calledWith("hideCol", "bar")

      it "resizes the grid", ->
        expect(jqGridEl.trigger).to.have.been.called
        expect(jqGridEl.trigger).to.have.been.calledWith("resize")

  describe "#columnChooser", ->
    it "is defined", ->
      expect(ctrl.columnChooser).to.not.be.undefined

    it "calls `columnChooser` method on the jqGrid", ->
      # When
      ctrl.columnChooser()

      # Then
      expect(jqGridEl.jqGrid).to.have.been.called
      expect(jqGridEl.jqGrid).to.have.been.calledWith("columnChooser")

  describe "pagination", ->

    describe "#getCurrentPage", ->
      before -> @gridParams.page = 2

      it "returns the current page", ->
        expect(ctrl.getCurrentPage()).to.eq 2

    describe "#getTotalRecords", ->
      before -> @gridParams.records = 20

      it "returns the total number of records", ->
        expect(ctrl.getTotalRecords()).to.eq 20

    describe "#getPageSize", ->
      before -> @gridParams.rowNum = 10

      it "returns the total number of records", ->
        expect(ctrl.getPageSize()).to.eq 10

    describe "#getTotalPages", ->
      before ->
        @gridParams.records = 999
        @gridParams.rowNum = 10

      it "return the total number of pages", ->
        expect(ctrl.getTotalPages()).to.eq 100

    describe "#isFirstPage", ->

      context "if the current grid view displays the first page", ->
        before -> @gridParams.page = 1

        it "returns true", ->
          expect(ctrl.isFirstPage()).to.be.true

      context "otherwise", ->
        before -> @gridParams.page = 2

        it "returns true", ->
          expect(ctrl.isFirstPage()).to.be.false

    describe "#isLastPage", ->
      before ->
        @gridParams.records = 30
        @gridParams.rowNum = 10

      context "if the current grid view displays the last page", ->
        before -> @gridParams.page = 3

        it "returns true", ->
          expect(ctrl.isLastPage()).to.be.true

      context "otherwise", ->
        before -> @gridParams.page = 1

        it "returns true", ->
          expect(ctrl.isLastPage()).to.be.false

    describe "#firstPage", ->

      it "loads the first page", ->
        # When
        ctrl.firstPage()

        # Then
        expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 1)
        expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

      it "returns a promise", ->
        promise = ctrl.firstPage()
        expect(promise.then).to.be.a "function"

    describe "#prevPage", ->
      before ->
        @gridParams.records = 999
        @gridParams.rowNum = 10

      context "on the other than the first", ->
        before -> @gridParams.page = 3

        it "loads the previous page", ->
          # When
          ctrl.prevPage()

          # Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 2)
          expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

        it "returns a promise", ->
          promise = ctrl.prevPage()
          expect(promise.then).to.be.a "function"

      context "on the first page", ->
        before -> @gridParams.page = 1

        it "loads the last page", ->
          # When
          ctrl.prevPage()

          # Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 100)
          expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

        it "returns a promise", ->
          promise = ctrl.prevPage()
          expect(promise.then).to.be.a "function"

    describe "#nextPage", ->
      before ->
        @gridParams.records = 6
        @gridParams.rowNum = 2

      context "on the page other then the last one", ->
        before -> @gridParams.page = 2

        it "loads the next page", ->
          # When
          ctrl.nextPage()

          # Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 3)
          expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

        it "returns a promise", ->
          promise = ctrl.nextPage()
          expect(promise.then).to.be.a "function"

      context "on the last page", ->
        before -> @gridParams.page = 3

        it "loads the first page", ->
          # When
          ctrl.nextPage()

          # Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 1)
          expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

        it "returns a promise", ->
          promise = ctrl.nextPage()
          expect(promise.then).to.be.a "function"

    describe "#lastPage", ->
      before ->
        @gridParams.records = 999
        @gridParams.rowNum = 5

      it "loads the last page", ->
        # When
        ctrl.lastPage()

        # Then
        expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 200)
        expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

      it "returns a promise", ->
        promise = ctrl.lastPage()
        expect(promise.then).to.be.a "function"

    describe "#loadPage", ->

      it "loads the specific page", ->
        # When
        ctrl.loadPage(123)

        # Then
        expect(jqGridEl.setGridParam).to.have.been.calledWith(page: 123)
        expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid")

      it "returns a promise", inject ($rootScope) ->
        # When
        promise = ctrl.loadPage(123)
        $rootScope.$broadcast "gridz:loadComplete", foo: "bar"

        resolvedValue = null
        promise.then (data) -> resolvedValue = data

        expect(resolvedValue).to.be.null
        $rootScope.$apply()
        expect(resolvedValue).to.have.property "foo", "bar"

  describe "#getXlsDataUri", ->

    it "returns data url for xls export", inject (xlsData) ->
      ctrl.getXlsDataUri()

      expect(xlsData.called).to.be.true

      args = xlsData.getCall(0).args
      expect(args[0]).to.eq "gridId"
      expect(args[1]).to.deep.eq [1, 2, 3]
###
