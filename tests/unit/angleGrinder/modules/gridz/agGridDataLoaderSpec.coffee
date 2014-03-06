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
    expect(gridCtrl.addJSONData.called).to.be.true

  it "show and hide the loading animation", inject ($httpBackend) ->
    # When
    loader(page: 1, "usersGrid")

    # Then
    expect(loadingEl.show.called).to.be.true
    expect(loadingEl.hide.called).to.be.false

    # When
    $httpBackend.flush()

    # Then
    expect(loadingEl.hide.called).to.be.true
