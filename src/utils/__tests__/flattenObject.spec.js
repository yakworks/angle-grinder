import flattenObject from '../flattenObject'

describe("flattenObject", function() {

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

    expect(flattened.id).toEqual(target.id);
    expect(flattened["consumer.firstName"]).toEqual(target.consumer.firstName);
    expect(flattened["consumer.lastName"]).toEqual(target.consumer.lastName);
    return expect(flattened.createdAt).toEqual(target.createdAt);
  })

});
