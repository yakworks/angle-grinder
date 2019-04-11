describe "module:angleGrinder.gridz controller: gridCrudCtrl", ->

  beforeEach module "angleGrinder.gridz", ($provide) ->
    $provide.decorator "resourceBuilder", ($delegate) -> sinon.spy($delegate)
    $provide.value "RestContext", ""
    return

  directiveScope = null
  parentScope = null
  grid = null
  ctrl = null

  beforeEach inject ($rootScope, $controller) ->
    parentScope = $rootScope.$new()
    grid =
      saveRow: sinon.stub()
      getGridEl: ()->
        getGridParam: ()->
          {colModel: [{name: "name_1"}, {name: "name_2"}, {name: "name_3"}]}
    parentScope.grid = grid
    parentScope.beforeSave = sinon.stub()

    directiveScope = parentScope.$new()
    ctrl = $controller "GridCrudCtrl",
      $scope: directiveScope
      $element: sinon.stub()
      $attrs: template: "/showForm", gridName: "grid", beforeSave: "beforeSave", resource: "arTran"



  it "sets template on directive scope", ->
    expect(directiveScope.template).to.eq "/showForm"

  it "Adds editAction on parent scope", ->
    expect(parentScope.editArTran).to.exist
    expect(parentScope.editArTran).to.be.a "function"

  it "Adds createAction on parent scope", ->
    expect(parentScope.createArTran).to.exist
    expect(parentScope.createArTran).to.be.a "function"

  it "creates resource", inject (resourceBuilder) ->
    expect(resourceBuilder.called).to.be.true
    resourcePath = resourceBuilder.getCall(0).args[0]
    resourceName = resourceBuilder.getCall(0).args[1]
    expect(resourcePath).to.eq "/arTran"
    expect(resourceName).to.eq "arTran"

  it "does not pollute parentscope", ->
    expect(parentScope.cancel).to.not.exist
    expect(parentScope.hideForm).to.not.exist
    expect(parentScope.showForm).to.not.exist
    expect(parentScope.createAction).to.not.exist
    expect(parentScope.editAction).to.not.exist
    expect(parentScope.save).to.not.exist


  describe "#editRecord", ->
    beforeEach inject ($httpBackend) ->
      $httpBackend.expectGET("/arTran/get/1").respond 200, id: 1, name: "test"
      parentScope.editArTran 1
      $httpBackend.flush()

    it "displays form", ->
      expect(directiveScope.showForm).to.be.true

    it "sets resource on directive scope", ->
      expect(directiveScope.arTran).to.exist
      expect(directiveScope.arTran.id).to.eq 1
      expect(directiveScope.arTran.name).to.eq "test"

  describe "#createRecord", ->
    beforeEach ->
      parentScope.createArTran()

    it "sets new new resource on directive scope", ->
      expect(directiveScope.arTran).to.exist
      expect(directiveScope.arTran.persisted()).to.be.false

    it "displays form", ->
      expect(directiveScope.showForm).to.be.true


  describe "#save", ->
    beforeEach inject ($httpBackend) ->
      params = name: "test"
      $httpBackend.expectPOST("/arTran/save", params).respond 200, id: 1, name: "test"
      parentScope.createArTran()
      directiveScope.arTran.name = "test"
      directiveScope.save(directiveScope.arTran)
      $httpBackend.flush()


    it "calls beforeSave callback on parent scope", ->
      expect(parentScope.beforeSave.called).to.be.true

    it "saves grid row", ->
      expect(grid.saveRow.called).to.be.true
      recordId = grid.saveRow.getCall(0).args[0]
      record = grid.saveRow.getCall(0).args[1]
      expect(recordId).to.eq 1
      expect(record).to.be.an "object"
      expect(record.name).to.eq "test"

    it "hides form", ->
      expect(directiveScope.showForm).to.be.false


  describe "#cancel", ->
    it "hides form", ->
      directiveScope.showForm = true
      expect(directiveScope.showForm).to.be.true
      directiveScope.cancel()
      expect(directiveScope.showForm).to.be.false


  describe "#dblClick", ->
    it "gets the name of third column", ->
      dbClickArgs =
        rowid: 5
        iRow: 1
        iCol: 2
        e:
          currentTarget:
            id: "grid"
      expect(directiveScope.columnNameForFocus).to.not.exist
      directiveScope.dblClick(dbClickArgs.rowid, dbClickArgs.iRow, dbClickArgs.iCol, dbClickArgs.e)
      expect(directiveScope.columnNameForFocus).to.eq "name_3"


  describe "#setFocus", ->
    inputs = """
        <input type="text" id="name_1" name="name_1" ng-model="model.model" class="form-control form-control ng-pristine ng-valid">
        <input type="text" id="name_2" name="name_2" ng-model="model.model" class="form-control form-control ng-pristine ng-valid">
        <input type="text" id="name_3" name="name_3" ng-model="model.model" class="form-control form-control ng-pristine ng-valid">
      """
    element = angular.element(inputs)

    beforeEach ->
      # Mock object to get $watch in directive via controller
      directiveScope.$watch(
        () ->
          directiveScope.showForm or false
        (newVal) ->
          if newVal then directiveScope.setFocus(element)
      )
      directiveScope.setFocus = sinon.stub()
      directiveScope.$apply()

    it "changes showForm var to true and sets focus", ->
      expect(directiveScope.showForm).to.not.exist
      directiveScope.showForm = true
      directiveScope.$apply()
      expect(directiveScope.showForm).to.be.true
      expect(directiveScope.setFocus.called).to.be.true


