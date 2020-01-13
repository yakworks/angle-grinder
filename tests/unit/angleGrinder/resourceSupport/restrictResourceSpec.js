import resourceSupport from '~/scripts/resourceSupport'

describe("restrictResourceSpec", function() {

  beforeEach(angular.mock.module(resourceSupport, function($provide) {
    $provide.value("arBatch", sinon.stub());
    $provide.value("requiredResourceFields", ['id']);
    $provide.value("RestContext", "");
  })
  );

  const scope = null;
  let batchResource = null;

  beforeEach(inject(function(resourceBuilder, $document) {
    const body = sinon.stub();
    body.withArgs("resource-path").returns("/arBatch");
    body.withArgs("resource-name").returns("arBatch");
    sinon.stub($document, "find").withArgs("body").returns({
      data: body});

    const batch = {
      id: 111,
      bla: 123,
      amount: 32,
      foo: "test"
    };

    const ArBatch = resourceBuilder("/arBatch");
    return batchResource = new ArBatch(batch);
  })
  );


  return describe("service: restrictResource", function() {

    it("check that only changed and required field will be send in request", inject(function(restrictResource, $httpBackend) {
      restrictResource(batchResource);
      batchResource.amount = 33;
      batchResource.bla = 321;
      $httpBackend.expectPOST("/arBatch/save/111", {id:111, amount: 33, bla: 321} ).respond(200);
      batchResource.$save();
      $httpBackend.flush();
      expect(batchResource.id).eq(111);
      expect(batchResource.amount).eq(33);
      return expect(batchResource.bla).eq(321);
    })
    );

    return it("check that only changed from allowed list fields will be send in request", inject(function(restrictResource, $httpBackend) {
      const allowed = ["amount", "bla"];
      restrictResource(batchResource, allowed);
      batchResource.amount = 33;
      batchResource.bla = 321;
      batchResource.foo = "new test";
      $httpBackend.expectPOST("/arBatch/save/111", {id:111, amount: 33, bla: 321} ).respond(200);
      batchResource.$save();
      $httpBackend.flush();
      expect(batchResource.id).eq(111);
      expect(batchResource.amount).eq(33);
      return expect(batchResource.bla).eq(321);
    })
    );
  });
});
