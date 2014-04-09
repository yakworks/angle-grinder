describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "service: deepPick", ->

    context "for flat keys", ->

      it "returs an object copy", inject (deepPick) ->
        obj = foo: "foo", bar: "bar"
        expect(deepPick(obj, "foo")).to.deep.eq foo: "foo"

        obj = foo: "foo", bar: "bar"
        expect(deepPick(obj, "bar")).to.deep.eq bar: "bar"

        obj = foo: "foo", bar: { one: "one", two: "two" }
        expect(deepPick(obj, "bar")).to.deep.eq bar: { one: "one", two: "two" }

    context "for nested keys", ->

      it "returs an object copy", inject (deepPick) ->
        obj = foo: "foo", one: "one", bar: biz: "biz"
        expect(deepPick(obj, "bar.biz")).to.deep.eq bar: biz: "biz"

        obj = foo: "foo", one: "one", bar: biz: "biz"
        expect(deepPick(obj, "one", "bar.biz")).to.deep.eq one: "one", bar: biz: "biz"

        obj =
          foo: "foo"
          one:
            two: three: { four: "four", five: "five" }
        expect(deepPick(obj, "one.two.three")).to.deep.eq one: two: three: { four: "four", five: "five" }

        obj =
          foo: "foo"
          one:
            two: "two"
            three: "three"
            four: five: "five"
        expect(deepPick(obj, "one.three")).to.deep.eq one: three: "three"

    context "when values for the given keys cannot be found", ->

      it "returns an empty object", inject (deepPick) ->
        obj = foo: "foo"
        expect(deepPick(obj, "foo.bar.baz")).to.deep.eq {}
