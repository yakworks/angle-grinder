describe "module: angleGrinder.gridz, service: agGridDataLoader", ->

  loadingEl = null

  beforeEach module "ng", ($provide) ->
    loadingEl =
      show: sinon.stub()
      hide: sinon.stub()

    # stub a selector for the loading animation
    $provide.decorator "$document", ($delegate) ->
      stub = sinon.stub($delegate, "find")
      stub.withArgs("#usersGrid").returns loadingEl

      $delegate

  beforeEach module "angleGrinder.gridz"

  gridCtrl = null
  loader = null

  beforeEach inject ($httpBackend, agGridDataLoader) ->
    gridCtrl = addJSONData: sinon.stub()

    loader = agGridDataLoader("/api/users", gridCtrl)
    $httpBackend.expectGET("/api/users?page=1").respond(201, [])

  it "loads the grid data", inject ($httpBackend) ->
    # When
    loader(page: 1, "usersGrid")
    $httpBackend.flush()

    # Then
    expect(gridCtrl.addJSONData).to.have.been.called

  it "show and hide the loading animation", inject ($httpBackend) ->
    # When
    loader(page: 1, "usersGrid")

    # Then
    expect(loadingEl.show).to.have.been.called
    expect(loadingEl.hide).to.not.have.been.called

    # When
    $httpBackend.flush()

    # Then
    expect(loadingEl.hide).to.have.been.called
