import 'angle-grinder/src/ng/gridz'
import agGridz from 'angle-grinder/src/ng/gridz'
import flattenObject from 'angle-grinder/src/gridz/flattenObject'

describe("module: angleGrinder.gridz", function() {

  beforeEach(angular.mock.module(agGridz));

  return describe("service: FlattenServ", function() {

    it("flattens an object",  function() {
      const target = {
        id: 123,
        consumer: {
          firstName: "Luke",
          lastName: "Sywalker"
        },
        createdAt: "2013-11-11"
      };

      const flattened = flattenObject(target);

      expect(flattened.id).to.equal(target.id);
      expect(flattened["consumer.firstName"]).to.equal(target.consumer.firstName);
      expect(flattened["consumer.lastName"]).to.equal(target.consumer.lastName);
      return expect(flattened.createdAt).to.equal(target.createdAt);
    })
  });
});
