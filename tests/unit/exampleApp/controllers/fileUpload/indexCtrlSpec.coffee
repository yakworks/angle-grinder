describe "controller: fileUpload.IndexCtrl", ->
  beforeEach module "exampleApp"

  $scope = null
  ctrl = null

  beforeEach inject ($rootScope, $controller, $httpBackend) ->
    $scope = $rootScope.$new()

    $httpBackend.expectGET("/api/upload/list").respond(200, files: ["foo", "bar"])

    $controller "fileUpload.IndexCtrl",
      $scope: $scope

  it "is defined", ->
    expect(ctrl).to.not.be.undefined

  it "loads files", inject ($httpBackend) ->
    expect($scope.loadingFiles).to.be.true
    $httpBackend.flush()
    expect($scope.loadingFiles).to.be.false

    expect($scope.queue).to.have.length 2
    expect($scope.queue).to.include "foo"
    expect($scope.queue).to.include "bar"

describe "controller: fileUpload.FileDestroyController", ->
  beforeEach module "exampleApp"

  $scope = null
  ctrl = null

  beforeEach inject ($rootScope, $controller) ->
    $scope = $rootScope.$new()
    $scope.file = url: "/files/foo.jpg", deleteUrl: "/files/foo.jpg/delete", deleteType: "DELETE"
    $scope.clear = sinon.stub()

    $controller "fileUpload.FileDestroyController",
      $scope: $scope

  it "is defined", ->
    expect(ctrl).to.not.be.undefined

  describe "file.$destroy()", ->

    it "deletes a file", inject ($httpBackend) ->
      # Given
      $httpBackend.expectDELETE("/files/foo.jpg/delete").respond(200)
      expect($scope.file.$destroy).to.be.a "function"

      # When
      $scope.file.$destroy()
      $httpBackend.flush()

      # Then
      expect($scope.clear).to.have.been.calledWith($scope.file)
