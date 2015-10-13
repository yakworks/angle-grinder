describe "module: angleGrinder.gridz", ->

  beforeEach module "angleGrinder.gridz"

  describe "service: flatten", ->

    it "is defined", inject (flatten) ->
      expect(flatten).to.not.be.undefined

    it "flattens an object", inject (flatten) ->
      target =
        id: 123
        consumer:
          firstName: "Luke"
          lastName: "Sywalker"
        createdAt: "2013-11-11"

      flattened = flatten(target)

      expect(flattened.id).to.equal target.id
      expect(flattened["consumer.firstName"]).to.equal target.consumer.firstName
      expect(flattened["consumer.lastName"]).to.equal target.consumer.lastName
      expect(flattened.createdAt).to.equal target.createdAt

    it "flattens an resourse", inject (flatten, $resource) ->
      data =
        id: 123
        consumer:
          firstName: "Luke"
          lastName: "Sywalker"
        createdAt: "2013-11-11"
      target = $resource('/foo/bar')
      target.id = 123
      target.createdAt = "2013-11-11"
      target.consumer = {}
      target.consumer.firstName = "Luke"
      target.consumer.lastName = "Sywalker"

      flattened = flatten(target)

      expect(flattened.id).to.equal target.id
      expect(flattened["consumer.firstName"]).to.equal data.consumer.firstName
      expect(flattened["consumer.lastName"]).to.equal data.consumer.lastName
      expect(flattened.createdAt).to.equal target.createdAt
