describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "service: deepDiff", ->

    context "for flat keys", ->

      it "returns an object with changed keys", inject (deepDiff) ->
        obj1 = foo: "foo", bar: "bar"
        obj2 = foo: "foo2", bar: "bar"
        expect(deepDiff(obj1, obj2)).to.deep.eq foo: "foo2"

      it "copies null values", inject (deepDiff) ->
        obj1 = foo: "foo", bar: "bar"
        obj2 = foo: "foo2", bar: null
        expect(deepDiff(obj1, obj2)).to.deep.eq foo: "foo2", bar: null

    context "for nested keys", ->

      it "returns only changed fields", inject (deepDiff) ->
        obj1 = foo: "foo", one: "one", bar: biz: "biz"
        obj2 = foo: "foo", one: "one", bar: biz: "bizNew"

        expect(deepDiff(obj1, obj2)).to.deep.eq bar: biz: "bizNew"

      it "returns only changed fields, when new val is null", inject (deepDiff) ->
        obj1 = foo: "foo", one: "one", bar: biz: "biz"
        obj2 = foo: "foo", one: "one", bar: biz: null

        expect(deepDiff(obj1, obj2)).to.deep.eq bar: biz: null

      it "returns emty object if nothing is changed", inject (deepDiff) ->
        obj1 = foo: "foo", one: "one", bar: biz: "biz"
        obj2 = foo: "foo", one: "one", bar: biz: "biz"

        expect(deepDiff(obj1, obj2)).to.deep.eq {}

    context "check require fields", ->

      it "returns only required and changed fields", inject (deepDiff) ->
        obj1 = id2: 2, foo: "foo", one: "one", bar: biz: "biz"
        obj2 = id2: 2, foo: "foo", one: "one", bar: biz: "bizNew"

        expect(deepDiff(obj1, obj2, [], ["id2"])).to.deep.eq id2: 2, bar: biz: "bizNew"

      it "returns required fields even if there is not in old object", inject (deepDiff) ->
        obj1 = foo: "foo", one: "one", bar: biz: "biz"
        obj2 = id: 2, foo: "foo", one: "one", bar: biz: "bizNew"

        expect(deepDiff(obj1, obj2, [], ["id"])).to.deep.eq id: 2, bar: biz: "bizNew"

      it "returns nested required fields even if there is not in old object", inject (deepDiff) ->
        obj1 = obj: {id:3}, foo: "foo", one: "one", bar: biz: "biz"
        obj2 = obj: {id:3}, foo: "foo", one: "one", bar: biz: "bizNew"

        expect(deepDiff(obj1, obj2, [], ["obj.id"])).to.deep.eq obj: {id: 3}, bar: biz: "bizNew"

    context "check allowed fields", ->

      it "returns only allowed fields", inject (deepDiff) ->
        obj1 = foo: "foo1", one: "one", bar: biz: "biz"
        obj2 = foo: "foo", one: "one", bar: biz: "bizNew"

        expect(deepDiff(obj1, obj2, ["bar"])).to.deep.eq bar: biz: "bizNew"

      it "returns only allowed fields, for nested", inject (deepDiff) ->
        obj1 = foo: "foo1", one: "one", bar: biz: "biz", bla: "bla"
        obj2 = foo: "foo", one: "one", bar: biz: "bizNew", bla: "blaNew"

        expect(deepDiff(obj1, obj2, ["bar.bla"])).to.deep.eq bar: bla: "blaNew"

