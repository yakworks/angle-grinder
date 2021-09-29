import 'angle-grinder/src/ng/gridz'
import agGridz from 'angle-grinder/src/ng/gridz'
import agGridCtrl from 'angle-grinder/src/gridz/GridCtrl'

xdescribe("module: angleGrinder.gridz, conroller: AgGridCtrl", function() {

  beforeEach(angular.mock.module(agGridz, function($provide)  {
      // spy for `FlattenServ` service
      $provide.decorator("FlattenServ", $delegate => sinon.spy($delegate));

      // mock `xlsData` service
      $provide.value("xlsData", sinon.mock());

    })
  );

  let ctrl = null;
  let jqGridEl = null;

  before(function() {
    return this.gridParams = {colModel: [{ name: "foo", hidden: true }, { name: "bar", hidden: false }]};});

  beforeEach(inject(function($rootScope, $q, hasSearchFilters, FlattenServ, xlsData, csvData) {
      jqGridEl = sinon.stub($().jqGrid());

      // stub some grid element methods
      jqGridEl.attr = name => "gridId";
      jqGridEl.getGridParam = name => this.gridParams[name];

      // stub jQuery element
      const $element = {
        find: (function() {
          const stub = sinon.stub();
          stub.withArgs("table.gridz").returns(jqGridEl);
          return stub;
        })()
      };

      // initialzie the controller
      ctrl = new agGridCtrl($rootScope, $element, {agGrid: 'gridId'}, $q, hasSearchFilters, FlattenServ, xlsData, csvData)
        //$controller(agGridCtrl, {$element, $attrs: {agGrid: 'gridId'}})

      return sinon.stub(ctrl, "flashOnSuccess");
    })
  );

  describe("#getGridId", () => it("returns grid element id", () => expect(ctrl.getGridId()).to.eq("gridId")));

  describe("#reload", function() {

    it("reloads the grid", function() {
      // When
      ctrl.reload();

      // Then
      expect(jqGridEl.trigger).to.have.been.called;
      return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
    });

    return it("returns a promise", inject(function($rootScope) {
        // When
        const promise = ctrl.reload();
        $rootScope.$broadcast("gridz:loadComplete", {foo: "bar"});

        // Then
        let resolvedValue = null;
        promise.then(data => resolvedValue = data);

        expect(resolvedValue).to.be.null;
        $rootScope.$digest();
        return expect(resolvedValue).to.have.property("foo", "bar");
      })
    );
  });

  describe("#getParam", function() {
    before(function() { return this.gridParams.foo = "bar"; });

    return it("retrieves a particular grid parameter", () => expect(ctrl.getParam("foo")).to.eq("bar"));
  });

  describe("#setParam", () => it("sets a particular grid parameter", function() {
    // When
    ctrl.setParam({foo: "bar"});

    // Then
    expect(jqGridEl.setGridParam).to.have.been.called;
    return expect(jqGridEl.setGridParam).to.have.been.calledWith({foo: "bar"});
  }));

  describe("#updateRow", function() {

    context("simple update", function() {

      it("updates a row with the given id", function() {
        // When
        ctrl.updateRow(123, {foo: "bar"});

        // Then
        expect(jqGridEl.setRowData).to.have.been.called;
        return expect(jqGridEl.setRowData).to.have.been.calledWith(123, {foo: "bar"});
      });

      it("flattens data before inserting it to the grid", inject(function(FlattenServ) {
          // When
          ctrl.updateRow(123, {foo: {bar: "biz"}});

          // Then
          expect(FlattenServ).to.have.been.called;
          return expect(FlattenServ).to.have.been.calledWith({foo: {bar: "biz"}});
        })
      );

      return it("flashes the updated row", function() {
        // Given
        ctrl.updateRow(123, {foo: "bar"});

        // Then
        expect(ctrl.flashOnSuccess).to.have.been.called;
        return expect(ctrl.flashOnSuccess).to.have.been.calledWith(123);
      });
    });

    return context("when the new data contain empty values", function() {
      beforeEach(() => // stub previous row data
        jqGridEl.getRowData.withArgs(123).returns({
          "-row_action_col": "html code for the popup",
          foo: "foo", "bar.baz": "baz", "bar.biz": "biz"
        }));

      return it("clears the empty values", function() {
        // When
        ctrl.updateRow(123, {foo: "bar", baz: "baz", bar: {}});

        // Then
        expect(jqGridEl.setRowData).to.have.been.called;

        const {
          args
        } = jqGridEl.setRowData.getCall(0);
        expect(args[0]).to.eq(123);

        expect(args[1]).to.have.property("foo", "bar");
        expect(args[1]).to.have.property("baz", "baz");
        expect(args[1]).to.have.property("bar.baz", null);
        return expect(args[1]).to.have.property("bar.biz", null);
      });
    });
  });

  describe("#addRow", function() {

    describe("when the position is not specified", () => it("adds a row at the first position", function() {
      // When
      ctrl.addRow(234, {foo: "biz"});

      // Then
      expect(jqGridEl.addRowData).to.have.been.called;
      return expect(jqGridEl.addRowData).to.have.been.calledWith(234, {foo: "biz"}, "first");
    }));

    describe("when the position is specified", () => it("adds a row at the specified position", function() {
      // When
      ctrl.addRow(234, {foo: "biz"}, "last");

      // Then
      expect(jqGridEl.addRowData).to.have.been.called;
      return expect(jqGridEl.addRowData).to.have.been.calledWith(234, {foo: "biz"}, "last");
    }));

    it("flattens data before inserting it to the grid", inject(function(FlattenServ) {
        // When
        ctrl.addRow(234, {foo: {bar: "baz"}});

        // Then
        expect(FlattenServ).to.have.been.called;
        return expect(FlattenServ).to.have.been.calledWith({foo: {bar: "baz"}});
      })
    );

    it("flashes the inserted row", function() {
      // When
      ctrl.addRow(234, {foo: "bar"});

      // Then
      expect(ctrl.flashOnSuccess).to.have.been.called;
      return expect(ctrl.flashOnSuccess).to.have.been.calledWith(234);
    });

    return it("broadcasts `gridz:rowAdded` event", inject(function($rootScope) {
        // Given
        sinon.spy($rootScope, "$broadcast");

        // When
        ctrl.addRow(234, {foo: "bar"});
        expect($rootScope.$broadcast).to.have.been.called;
        expect($rootScope.$broadcast).to.have.been.calledWith("gridz:rowAdded", "gridId", 234, {foo: "bar"});

        // stop spying
        return $rootScope.$broadcast.restore();
      })
    );
  });

  describe("#saveRow", function() {

    describe("when a row exists in the grid", function() {
      beforeEach(() => jqGridEl.getInd.returns(true));

      return it("updates a row with the given id", function() {
        // When
        ctrl.saveRow(123, {foo: "bar"});

        // Then
        expect(jqGridEl.setRowData).to.have.been.called;
        expect(jqGridEl.setRowData).to.have.been.calledWith(123, {foo: "bar"});

        return expect(jqGridEl.addRowData).to.not.have.been.called;
      });
    });

    return describe("otherwise", function() {
      beforeEach(() => jqGridEl.getInd.returns(false));

      return it("inserts a new row at the beginning", function() {
        // When
        ctrl.saveRow(234, {foo: "biz"});

        // Then
        expect(jqGridEl.addRowData).to.have.been.called;
        expect(jqGridEl.addRowData).to.have.been.calledWith(234, {foo: "biz"}, "first");

        return expect(jqGridEl.setRowData).to.not.have.been.called;
      });
    });
  });

  describe("#hasRow", function() {

    describe("if a row with the given id exists", () => it("returns true", function() {
      // Given
      jqGridEl.getInd.returns({id: 123, foo: "bar"});

      // When
      expect(ctrl.hasRow(123)).to.be.true;

      // Then
      expect(jqGridEl.getInd).to.have.been.called;
      return expect(jqGridEl.getInd).to.have.been.calledWith(123);
    }));

    return describe("otherwise", () => it("returns false", function() {
      // Given
      jqGridEl.getInd.returns(false);

      // When
      expect(ctrl.hasRow(234)).to.be.false;

      // Then
      expect(jqGridEl.getInd).to.have.been.called;
      return expect(jqGridEl.getInd).to.have.been.calledWith(234);
    }));
  });

  describe("#getIds", () => it("returns an array of the id's in the current grid view", function() {
    // Given
    jqGridEl.getDataIDs.returns([1, 2, 3]);

    // When
    expect(ctrl.getIds()).to.deep.eq([1, 2, 3]);

    // Then
    return expect(jqGridEl.getDataIDs).to.have.been.called;
  }));

  describe("#removeRow", function() {
    it("removes a row with the given id", function() {
      // Given stub with callback
      ctrl.flashOnSuccess.restore();

      sinon.stub(ctrl, "flashOnSuccess")
      ctrl.flashOnSuccess = (id, callback) => callback()

      // When
      ctrl.removeRow(123);

      // Then
      expect(jqGridEl.delRowData).to.have.been.called;
      return expect(jqGridEl.delRowData).to.have.been.calledWith(123);
    });

    return it("flashes the removed row", function() {
      // Given
      ctrl.removeRow(345);

      // Then
      expect(ctrl.flashOnSuccess).to.have.been.called;
      return expect(ctrl.flashOnSuccess).to.have.been.calledWith(345);
    });
  });

  describe("#search", function() {
    it("sets search filters and triggers grid reload", function() {
      // When
      ctrl.search({login: "foo"});

      // Then
      expect(jqGridEl.setGridParam).to.have.been.called;
      expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 1, search: true, postData: {filters: '{"login":"foo"}'}});

      expect(jqGridEl.trigger).to.have.been.called;
      return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
    });

    return it("returns a promise", inject(function($rootScope) {
        // Given
        const promise = ctrl.search({login: "foo"});
        $rootScope.$broadcast("gridz:loadComplete", {}, {foo: "bar"});

        let resolvedValue = null;
        promise.then(data => resolvedValue = data);
        expect(resolvedValue).to.be.null;

        // When
        $rootScope.$apply();

        // Then
        expect(resolvedValue).to.not.be.null;
        return expect(resolvedValue).to.deep.equal({login: "foo"});
      })
    );
  });

  describe("#getSelectedRowIds", function() {
    before(function() { return this.gridParams.selarrrow = [1, 2, 3]; });

    return it("returns a list of selected row ids", () => expect(ctrl.getSelectedRowIds()).to.deep.eq([1, 2, 3]));
  });

  describe("#getSelectedRows", function() {
    beforeEach(function() {
      jqGridEl.getRowData.withArgs(1).returns({id:1});
      jqGridEl.getRowData.withArgs(2).returns({id:2});
      return jqGridEl.getRowData.withArgs(3).returns({id:3});
    });

    it("returns empty array when no rows are selected", function() {
      this.gridParams.selarrrow = [];
      const data = ctrl.getSelectedRows();
      return expect(data.length).to.eq(0);
    });


    return it("returns selected row objects", function() {
      this.gridParams.selarrrow = [1, 2, 3];
      const data = ctrl.getSelectedRows();
      expect(data.length).to.eq(3);
      expect(jqGridEl.getRowData.getCall(0).calledWith(1)).to.be.true;
      expect(jqGridEl.getRowData.getCall(1).calledWith(2)).to.be.true;
      return expect(jqGridEl.getRowData.getCall(2).calledWith(3)).to.be.true;
    });
  });


  describe("#getRowData", () => it("returns a row data for the given id", function() {
    // When
    ctrl.getRowData(567);

    // Then
    expect(jqGridEl.getRowData).to.have.been.called;
    return expect(jqGridEl.getRowData).to.have.been.calledWith(567);
  }));

  describe("#addJSONData", function() {
    let stub = null;

    beforeEach(inject(function($rootScope) {
        stub = sinon.stub();
        jqGridEl.get.withArgs(0).returns({addJSONData: stub});

        sinon.spy($rootScope, "$broadcast");
        return ctrl.addJSONData({page: 1, rows: [{name: "foo"}, {name: "bar"}]});
      })
    );

    afterEach(inject($rootScope => $rootScope.$broadcast.restore())
    );

    it("poulates the grid with the given data", () => expect(stub).to.have.been.called);

    return it("broadcasts `gridz:loadComplete` event", inject($rootScope => expect($rootScope.$broadcast).to.have.been.called)
    );
  });

  describe("#isColumnHidden", function() {

    it("is defined", () => expect(ctrl.isColumnHidden).to.not.be.undefined);

    describe("when a column with the given id is hidden", () => it("returns true", () => expect(ctrl.isColumnHidden("foo")).to.be.true));

    describe("when a column with the given id is not hidden", () => it("returns true", () => expect(ctrl.isColumnHidden("bar")).to.be.false));

    return describe("when a column with is missing", () => it("returns undefined", () => expect(ctrl.isColumnHidden("fooBar")).to.be.undefined));
  });

  describe("#toggleColumn", function() {
    it("is defined", () => expect(ctrl.toggleColumn).to.not.be.undefined);

    describe("when the column is hidden", function() {
      beforeEach(() => ctrl.toggleColumn("foo"));

      it("shows the column", function() {
        expect(jqGridEl.jqGrid).to.have.been.called;
        return expect(jqGridEl.jqGrid).to.have.been.calledWith("showCol", "foo");
      });

      return it("resizes the grid", function() {
        expect(jqGridEl.trigger).to.have.been.called;
        return expect(jqGridEl.trigger).to.have.been.calledWith("resize");
      });
    });

    return describe("when the column is not hidden", function() {
      beforeEach(() => ctrl.toggleColumn("bar"));

      it("hides the column", function() {
        expect(jqGridEl.jqGrid).to.have.been.called;
        return expect(jqGridEl.jqGrid).to.have.been.calledWith("hideCol", "bar");
      });

      return it("resizes the grid", function() {
        expect(jqGridEl.trigger).to.have.been.called;
        return expect(jqGridEl.trigger).to.have.been.calledWith("resize");
      });
    });
  });

  describe("pagination", function() {

    describe("#getCurrentPage", function() {
      before(function() { return this.gridParams.page = 2; });

      return it("returns the current page", () => expect(ctrl.getCurrentPage()).to.eq(2));
    });

    describe("#getTotalRecords", function() {
      before(function() { return this.gridParams.records = 20; });

      return it("returns the total number of records", () => expect(ctrl.getTotalRecords()).to.eq(20));
    });

    describe("#getPageSize", function() {
      before(function() { return this.gridParams.rowNum = 10; });

      return it("returns the total number of records", () => expect(ctrl.getPageSize()).to.eq(10));
    });

    describe("#getTotalPages", function() {
      before(function() {
        this.gridParams.records = 999;
        return this.gridParams.rowNum = 10;
      });

      return it("return the total number of pages", () => expect(ctrl.getTotalPages()).to.eq(100));
    });

    describe("#isFirstPage", function() {

      context("if the current grid view displays the first page", function() {
        before(function() { return this.gridParams.page = 1; });

        return it("returns true", () => expect(ctrl.isFirstPage()).to.be.true);
      });

      return context("otherwise", function() {
        before(function() { return this.gridParams.page = 2; });

        return it("returns true", () => expect(ctrl.isFirstPage()).to.be.false);
      });
    });

    describe("#isLastPage", function() {
      before(function() {
        this.gridParams.records = 30;
        return this.gridParams.rowNum = 10;
      });

      context("if the current grid view displays the last page", function() {
        before(function() { return this.gridParams.page = 3; });

        return it("returns true", () => expect(ctrl.isLastPage()).to.be.true);
      });

      return context("otherwise", function() {
        before(function() { return this.gridParams.page = 1; });

        return it("returns true", () => expect(ctrl.isLastPage()).to.be.false);
      });
    });

    describe("#firstPage", function() {

      it("loads the first page", function() {
        // When
        ctrl.firstPage();

        // Then
        expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 1});
        return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
      });

      return it("returns a promise", function() {
        const promise = ctrl.firstPage();
        return expect(promise.then).to.be.a("function");
      });
    });

    describe("#prevPage", function() {
      before(function() {
        this.gridParams.records = 999;
        return this.gridParams.rowNum = 10;
      });

      context("on the other than the first", function() {
        before(function() { return this.gridParams.page = 3; });

        it("loads the previous page", function() {
          // When
          ctrl.prevPage();

          // Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 2});
          return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
        });

        return it("returns a promise", function() {
          const promise = ctrl.prevPage();
          return expect(promise.then).to.be.a("function");
        });
      });

      return context("on the first page", function() {
        before(function() { return this.gridParams.page = 1; });

        it("loads the last page", function() {
          // When
          ctrl.prevPage();

          // Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 100});
          return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
        });

        return it("returns a promise", function() {
          const promise = ctrl.prevPage();
          return expect(promise.then).to.be.a("function");
        });
      });
    });

    describe("#nextPage", function() {
      before(function() {
        this.gridParams.records = 6;
        return this.gridParams.rowNum = 2;
      });

      context("on the page other then the last one", function() {
        before(function() { return this.gridParams.page = 2; });

        it("loads the next page", function() {
          // When
          ctrl.nextPage();

          // Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 3});
          return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
        });

        return it("returns a promise", function() {
          const promise = ctrl.nextPage();
          return expect(promise.then).to.be.a("function");
        });
      });

      return context("on the last page", function() {
        before(function() { return this.gridParams.page = 3; });

        it("loads the first page", function() {
          // When
          ctrl.nextPage();

          // Then
          expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 1});
          return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
        });

        return it("returns a promise", function() {
          const promise = ctrl.nextPage();
          return expect(promise.then).to.be.a("function");
        });
      });
    });

    describe("#lastPage", function() {
      before(function() {
        this.gridParams.records = 999;
        return this.gridParams.rowNum = 5;
      });

      it("loads the last page", function() {
        // When
        ctrl.lastPage();

        // Then
        expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 200});
        return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
      });

      return it("returns a promise", function() {
        const promise = ctrl.lastPage();
        return expect(promise.then).to.be.a("function");
      });
    });

    return describe("#loadPage", function() {

      it("loads the specific page", function() {
        // When
        ctrl.loadPage(123);

        // Then
        expect(jqGridEl.setGridParam).to.have.been.calledWith({page: 123});
        return expect(jqGridEl.trigger).to.have.been.calledWith("reloadGrid");
      });

      return it("returns a promise", inject(function($rootScope) {
          // When
          const promise = ctrl.loadPage(123);
          $rootScope.$broadcast("gridz:loadComplete", {foo: "bar"});

          let resolvedValue = null;
          promise.then(data => resolvedValue = data);

          expect(resolvedValue).to.be.null;
          $rootScope.$apply();
          return expect(resolvedValue).to.have.property("foo", "bar");
        })
      );
    });
  });

  return describe("#getXlsDataUri", () => it("returns data url for xls export", inject(function(xlsData) {
    ctrl.getXlsDataUri();

    expect(xlsData.called).to.be.true;

    const {
      args
    } = xlsData.getCall(0);
    expect(args[0]).to.eq("gridId");
    return expect(args[1]).to.deep.eq([1, 2, 3]);})));
});
