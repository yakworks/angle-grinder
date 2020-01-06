/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.common", function() {

  beforeEach(module("angleGrinder.common"));

  return describe("service: DeepDiffServ", function() {

    context("for flat keys", function() {

      it("returns an object with changed keys", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo", bar: "bar"};
        const obj2 = {foo: "foo2", bar: "bar"};
        return expect(DeepDiffServ(obj1, obj2)).to.deep.eq({foo: "foo2"});
      })
      );

      return it("copies null values", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo", bar: "bar"};
        const obj2 = {foo: "foo2", bar: null};
        return expect(DeepDiffServ(obj1, obj2)).to.deep.eq({foo: "foo2", bar: null});
      })
      );
    });

    context("for nested keys", function() {

      it("returns only changed fields", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
        const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew"}};

        return expect(DeepDiffServ(obj1, obj2)).to.deep.eq({bar: {biz: "bizNew"}});
      })
      );

      it("returns only changed fields, when new val is null", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
        const obj2 = {foo: "foo", one: "one", bar: {biz: null}};

        return expect(DeepDiffServ(obj1, obj2)).to.deep.eq({bar: {biz: null}});
      })
      );

      return it("returns emty object if nothing is changed", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
        const obj2 = {foo: "foo", one: "one", bar: {biz: "biz"}};

        return expect(DeepDiffServ(obj1, obj2)).to.deep.eq({});}));
  });

    context("check require fields", function() {

      it("returns only required and changed fields", inject(function(DeepDiffServ) {
        const obj1 = {id2: 2, foo: "foo", one: "one", bar: {biz: "biz"}};
        const obj2 = {id2: 2, foo: "foo", one: "one", bar: {biz: "bizNew"}};

        return expect(DeepDiffServ(obj1, obj2, [], ["id2"])).to.deep.eq({id2: 2, bar: {biz: "bizNew"}});
      })
      );

      it("returns required fields even if there is not in old object", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
        const obj2 = {id: 2, foo: "foo", one: "one", bar: {biz: "bizNew"}};

        return expect(DeepDiffServ(obj1, obj2, [], ["id"])).to.deep.eq({id: 2, bar: {biz: "bizNew"}});
      })
      );

      return it("returns nested required fields even if there is not in old object", inject(function(DeepDiffServ) {
        const obj1 = {obj: {id:3}, foo: "foo", one: "one", bar: {biz: "biz"}};
        const obj2 = {obj: {id:3}, foo: "foo", one: "one", bar: {biz: "bizNew"}};

        return expect(DeepDiffServ(obj1, obj2, [], ["obj.id"])).to.deep.eq({obj: {id: 3}, bar: {biz: "bizNew"}});
      })
      );
    });

    return context("check allowed fields", function() {

      it("returns only allowed fields", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo1", one: "one", bar: {biz: "biz"}};
        const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew"}};

        return expect(DeepDiffServ(obj1, obj2, ["bar"])).to.deep.eq({bar: {biz: "bizNew"}});
      })
      );

      return it("returns only allowed fields, for nested", inject(function(DeepDiffServ) {
        const obj1 = {foo: "foo1", one: "one", bar: {biz: "biz", bla: "bla"}};
        const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew", bla: "blaNew"}};

        return expect(DeepDiffServ(obj1, obj2, ["bar.bla"])).to.deep.eq({bar: {bla: "blaNew"}});
      })
      );
    });
  });
});

