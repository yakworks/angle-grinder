describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "service: DeepPickServ", ->

    context "for flat keys", ->

      it "returns an object copy", inject (DeepPickServ) ->
        obj = foo: "foo", bar: "bar"
        expect(DeepPickServ(obj, "foo")).to.deep.eq foo: "foo"

        obj = foo: "foo", bar: "bar"
        expect(DeepPickServ(obj, "bar")).to.deep.eq bar: "bar"

        # allow to pick null or falsy values
        obj = foo: null, bar: false
        expect(DeepPickServ(obj, "foo")).to.deep.eq foo: null
        expect(DeepPickServ(obj, "bar")).to.deep.eq bar: false

        obj = foo: "foo", bar: { one: "one", two: "two", three: null }
        expect(DeepPickServ(obj, "bar")).to.deep.eq bar: { one: "one", two: "two", three: null }

    context "for nested keys", ->

      it "returns an object copy", inject (DeepPickServ) ->
        obj = foo: "foo", one: "one", bar: biz: "biz"
        expect(DeepPickServ(obj, "bar.biz")).to.deep.eq bar: biz: "biz"

        obj = foo: "foo", one: "one", bar: biz: "biz"
        expect(DeepPickServ(obj, "one", "bar.biz")).to.deep.eq one: "one", bar: biz: "biz"

        obj =
          foo: "foo"
          one:
            two: three: { four: "four", five: "five" }
        expect(DeepPickServ(obj, "one.two.three")).to.deep.eq one: two: three: { four: "four", five: "five" }

        obj =
          foo: "foo"
          one:
            two: "two"
            three: "three"
            four: five: "five"
        expect(DeepPickServ(obj, "one.three")).to.deep.eq one: three: "three"

    context "when values for the given keys cannot be found", ->

      it "returns an empty object", inject (DeepPickServ) ->
        obj = foo: "foo"
        expect(DeepPickServ(obj, "foo.bar.baz")).to.deep.eq {}
