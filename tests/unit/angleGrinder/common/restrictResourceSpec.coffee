describe "module: angleGrinder.common, service: restrictResource", ->

  beforeEach module "angleGrinder.common", ($provide) ->
    $provide.value "arBatch", sinon.stub()
    $provide.value "requiredResourceFields", ['id']
    $provide.value "RestContext", ""
    return

  scope = null
  batchResource = null

  beforeEach inject (resourceBuilder, $document) ->
    body = sinon.stub()
    body.withArgs("resource-path").returns("/arBatch")
    body.withArgs("resource-name").returns "arBatch"
    sinon.stub($document, "find").withArgs("body").returns
      data: body

    batch =
      id: 111
      bla: 123
      amount: 32
      foo: "test"

    ArBatch = resourceBuilder "/arBatch"
    batchResource = new ArBatch(batch)


  describe "service: restrictResource", ->

    it "check that only changed and required field will be send in request", inject (restrictResource, $httpBackend) ->
      restrictResource(batchResource)
      batchResource.amount = 33
      batchResource.bla = 321
      $httpBackend.expectPOST("/arBatch/save/111", {id:111, amount: 33, bla: 321} ).respond(200)
      batchResource.$save()
      $httpBackend.flush()
      expect(batchResource.id).eq 111
      expect(batchResource.amount).eq 33
      expect(batchResource.bla).eq 321

    it "check that only changed from allowed list fields will be send in request", inject (restrictResource, $httpBackend) ->
      allowed = ["amount", "bla"]
      restrictResource(batchResource, allowed)
      batchResource.amount = 33
      batchResource.bla = 321
      batchResource.foo = "new test"
      $httpBackend.expectPOST("/arBatch/save/111", {id:111, amount: 33, bla: 321} ).respond(200)
      batchResource.$save()
      $httpBackend.flush()
      expect(batchResource.id).eq 111
      expect(batchResource.amount).eq 33
      expect(batchResource.bla).eq 321
