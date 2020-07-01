import 'angle-grinder/src/ng/gridz'
import agGridz from 'angle-grinder/src/ng/legacy/ag-grid'

describe("module:angleGrinder.gridz controller: gridCrudCtrl", function() {

  beforeEach(angular.mock.module(agGridz, function($provide) {
    $provide.decorator("resourceBuilder", $delegate => sinon.spy($delegate));
    $provide.value("RestContext", "");
  })
  );

  let directiveScope = null;
  let parentScope = null;
  let grid = null;
  let ctrl = null;

  beforeEach(inject(function($rootScope, $controller, $timeout) {
    parentScope = $rootScope.$new();
    grid = {
      saveRow: sinon.stub(),
      getGridEl(){
        return {
          jqGrid(){
            return {};
          },
          getGridParam(){
            return {colModel: [{name: "name_1"}, {name: "name_2"}, {name: "name_3"}]};
          }
        };
      }
    };
    parentScope.grid = grid;
    parentScope.beforeSave = sinon.stub();

    directiveScope = parentScope.$new();
    return ctrl = $controller("GridCrudCtrl", {
      $scope: directiveScope,
      $element: sinon.stub(),
      $attrs: { template: "/showForm", gridName: "grid", beforeSave: "beforeSave", resource: "arTran"
    }
    }
    );
  })
  );



  it("sets template on directive scope", () => expect(directiveScope.template).to.eq("/showForm"));

  it("Adds editAction on parent scope", function() {
    expect(parentScope.editArTran).to.exist;
    return expect(parentScope.editArTran).to.be.a("function");
  });

  it("Adds createAction on parent scope", function() {
    expect(parentScope.createArTran).to.exist;
    return expect(parentScope.createArTran).to.be.a("function");
  });

  it("creates resource", inject(function(resourceBuilder) {
    expect(resourceBuilder.called).to.be.true;
    const resourcePath = resourceBuilder.getCall(0).args[0];
    const resourceName = resourceBuilder.getCall(0).args[1];
    expect(resourcePath).to.eq("/arTran");
    return expect(resourceName).to.eq("arTran");
  })
  );

  it("does not pollute parentscope", function() {
    expect(parentScope.cancel).to.not.exist;
    expect(parentScope.hideForm).to.not.exist;
    expect(parentScope.showForm).to.not.exist;
    expect(parentScope.createAction).to.not.exist;
    expect(parentScope.editAction).to.not.exist;
    return expect(parentScope.save).to.not.exist;
  });


  describe("#editRecord", function() {
    beforeEach(inject(function($httpBackend) {
      $httpBackend.expectGET("/arTran/get/1").respond(200, {id: 1, name: "test"});
      parentScope.editArTran(1);
      return $httpBackend.flush();
    })
    );

    it("displays form", () => expect(directiveScope.showForm).to.be.true);

    return it("sets resource on directive scope", function() {
      expect(directiveScope.arTran).to.exist;
      expect(directiveScope.arTran.id).to.eq(1);
      return expect(directiveScope.arTran.name).to.eq("test");
    });
  });

  describe("#createRecord", function() {
    beforeEach(() => parentScope.createArTran());

    it("sets new new resource on directive scope", function() {
      expect(directiveScope.arTran).to.exist;
      return expect(directiveScope.arTran.persisted()).to.be.false;
    });

    return it("displays form", () => expect(directiveScope.showForm).to.be.true);
  });


  describe("#save", function() {
    beforeEach(inject(function($httpBackend) {
      const params = {name: "test"};
      $httpBackend.expectPOST("/arTran/save", params).respond(200, {id: 1, name: "test"});
      parentScope.createArTran();
      directiveScope.arTran.name = "test";
      directiveScope.save(directiveScope.arTran);
      return $httpBackend.flush();
    })
    );


    it("calls beforeSave callback on parent scope", () => expect(parentScope.beforeSave.called).to.be.true);

    it("saves grid row", function() {
      expect(grid.saveRow.called).to.be.true;
      const recordId = grid.saveRow.getCall(0).args[0];
      const record = grid.saveRow.getCall(0).args[1];
      expect(recordId).to.eq(1);
      expect(record).to.be.an("object");
      return expect(record.name).to.eq("test");
    });

    return it("hides form", () => expect(directiveScope.showForm).to.be.false);
  });


  describe("#cancel", () => it("hides form", function() {
    directiveScope.showForm = true;
    expect(directiveScope.showForm).to.be.true;
    directiveScope.cancel();
    return expect(directiveScope.showForm).to.be.false;
  }));


  describe("#dblClick", () => it("gets the name of third column", function() {
    const dbClickArgs = {
      rowid: 5,
      iRow: 1,
      iCol: 2,
      e: {
        currentTarget: {
          id: "grid"
        }
      }
    };
    expect(directiveScope.columnNameForFocus).to.not.exist;
    directiveScope.dblClick(dbClickArgs.rowid, dbClickArgs.iRow, dbClickArgs.iCol, dbClickArgs.e);
    return expect(directiveScope.columnNameForFocus).to.eq("name_3");
  }));


  return describe("#setFocus", function() {
    const inputs = `\
<input type="text" id="name_1" name="name_1" ng-model="model.model" class="form-control form-control ng-pristine ng-valid">
<input type="text" id="name_2" name="name_2" ng-model="model.model" class="form-control form-control ng-pristine ng-valid">
<input type="text" id="name_3" name="name_3" ng-model="model.model" class="form-control form-control ng-pristine ng-valid">\
`;
    const element = angular.element(inputs);

    beforeEach(function() {
      // Mock object to get $watch in directive via controller
      directiveScope.$watch(
        () => directiveScope.showForm || false,
        function(newVal) {
          if (newVal) { return directiveScope.setFocus(element); }
      });
      directiveScope.setFocus = sinon.stub();
      return directiveScope.$apply();
    });

    return it("changes showForm var to true and sets focus", function() {
      expect(directiveScope.showForm).to.not.exist;
      directiveScope.showForm = true;
      directiveScope.$apply();
      expect(directiveScope.showForm).to.be.true;
      return expect(directiveScope.setFocus.called).to.be.true;
    });
  });
});


