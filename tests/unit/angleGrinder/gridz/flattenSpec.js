import agGridz from 'angle-grinder/src/ng/gridz'

describe("module: angleGrinder.gridz", function() {

  beforeEach(angular.mock.module(agGridz));

  return describe("service: FlattenServ", function() {

    it("is defined", inject(FlattenServ => expect(FlattenServ).to.not.be.undefined)
    );

    it("flattens an object", inject(function(FlattenServ) {
      const target = {
        id: 123,
        consumer: {
          firstName: "Luke",
          lastName: "Sywalker"
        },
        createdAt: "2013-11-11"
      };

      const flattened = FlattenServ(target);

      expect(flattened.id).to.equal(target.id);
      expect(flattened["consumer.firstName"]).to.equal(target.consumer.firstName);
      expect(flattened["consumer.lastName"]).to.equal(target.consumer.lastName);
      return expect(flattened.createdAt).to.equal(target.createdAt);
    })
    );

    return it("flattens an resourse", inject(function(FlattenServ, $resource) {
      const data = {
        id: 123,
        consumer: {
          firstName: "Luke",
          lastName: "Sywalker"
        },
        createdAt: "2013-11-11"
      };
      const target = $resource('/foo/bar');
      target.id = 123;
      target.createdAt = "2013-11-11";
      target.consumer = {};
      target.consumer.firstName = "Luke";
      target.consumer.lastName = "Sywalker";

      const flattened = FlattenServ(target);

      expect(flattened.id).to.equal(target.id);
      expect(flattened["consumer.firstName"]).to.equal(data.consumer.firstName);
      expect(flattened["consumer.lastName"]).to.equal(data.consumer.lastName);
      return expect(flattened.createdAt).to.equal(target.createdAt);
    })
    );
  });
});
