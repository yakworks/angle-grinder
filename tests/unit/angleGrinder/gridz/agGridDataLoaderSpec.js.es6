/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.gridz, service: agGridDataLoader", function() {

  let loadingEl = null;

  beforeEach(module("ng", function($provide) {
    loadingEl = {
      show: sinon.stub(),
      hide: sinon.stub()
    };

    // stub a selector for the loading animation
    return $provide.decorator("$document", function($delegate) {
      const stub = sinon.stub($delegate, "find");
      stub.withArgs("#usersGrid").returns(loadingEl);

      return $delegate;
    });
  })
  );

  beforeEach(module("angleGrinder.gridz"));

  let gridCtrl = null;
  let loader = null;

  beforeEach(inject(function($httpBackend, agGridDataLoader) {
    gridCtrl = {addJSONData: sinon.stub()};

    loader = agGridDataLoader("/api/users", gridCtrl);
    return $httpBackend.expectGET("/api/users?page=1").respond(201, []);
  })
  );

  it("loads the grid data", inject(function($httpBackend) {
    // When
    loader({page: 1}, "usersGrid");
    $httpBackend.flush();

    // Then
    return expect(gridCtrl.addJSONData).to.have.been.called;
  })
  );

  return it("show and hide the loading animation", inject(function($httpBackend) {
    // When
    loader({page: 1}, "usersGrid");

    // Then
    expect(loadingEl.show).to.have.been.called;
    expect(loadingEl.hide).to.not.have.been.called;

    // When
    $httpBackend.flush();

    // Then
    return expect(loadingEl.hide).to.have.been.called;
  })
  );
});
