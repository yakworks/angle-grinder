describe "services", ->
  beforeEach module("angleGrinder.services")

  describe "flatten", ->
    flatten = null
    beforeEach inject ($injector) ->
      flatten = $injector.get("flatten")

    it "is defined", ->
      expect(flatten).toBeDefined()

    it "flattens an object", ->
      target =
        id: 123
        consumer:
          firstName: "Luke"
          lastName: "Sywalker"
        createdAt: "2013-11-11"

      flattened = flatten(target)

      expect(flattened.id).toEqual target.id
      expect(flattened["consumer.firstName"]).toEqual target.consumer.firstName
      expect(flattened["consumer.lastName"]).toEqual target.consumer.lastName
      expect(flattened.createdAt).toEqual target.createdAt
