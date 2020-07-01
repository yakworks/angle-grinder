import 'angle-grinder/src/ng/gridz'
import agGridz from 'angle-grinder/src/ng/legacy/ag-grid'

describe("module: angleGrinder.gridz, service: GridDataLoader", function() {

  let loadingEl = null;

  beforeEach(angular.mock.module("ng", function($provide) {
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

  beforeEach(angular.mock.module(agGridz));

  let gridCtrl = null;
  let loader = null;

  beforeEach(inject(function($httpBackend, GridDataLoader) {
    gridCtrl = {addJSONData: sinon.stub()};

    loader = GridDataLoader("/api/users", gridCtrl);
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
