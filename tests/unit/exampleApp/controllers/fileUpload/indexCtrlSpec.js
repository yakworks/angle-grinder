/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("controller: fileUpload.IndexCtrl", function() {
  beforeEach(angular.mock.module("exampleApp"));

  let $scope = null;
  const ctrl = null;

  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    $scope = $rootScope.$new();

    $httpBackend.expectGET("/api/upload/list").respond(200, {files: ["foo", "bar"]});

    return $controller("fileUpload.IndexCtrl",
      {$scope});
  })
  );

  it("is defined", () => expect(ctrl).to.not.be.undefined);

  return it("loads files", inject(function($httpBackend) {
    expect($scope.loadingFiles).to.be.true;
    $httpBackend.flush();
    expect($scope.loadingFiles).to.be.false;

    expect($scope.queue).to.have.length(2);
    expect($scope.queue).to.include("foo");
    return expect($scope.queue).to.include("bar");
  })
  );
});

describe("controller: fileUpload.FileDestroyController", function() {
  beforeEach(angular.mock.module("exampleApp"));

  let $scope = null;
  const ctrl = null;

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $scope.file = {url: "/files/foo.jpg", deleteUrl: "/files/foo.jpg/delete", deleteType: "DELETE"};
    $scope.clear = sinon.stub();

    return $controller("fileUpload.FileDestroyController",
      {$scope});
  })
  );

  it("is defined", () => expect(ctrl).to.not.be.undefined);

  return describe("file.$destroy()", () => it("deletes a file", inject(function($httpBackend) {
    // Given
    $httpBackend.expectDELETE("/files/foo.jpg/delete").respond(200);
    expect($scope.file.$destroy).to.be.a("function");

    // When
    $scope.file.$destroy();
    $httpBackend.flush();

    // Then
    return expect($scope.clear).to.have.been.calledWith($scope.file);
  })
  ));
});
