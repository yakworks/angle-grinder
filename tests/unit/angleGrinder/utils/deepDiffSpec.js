import {deepDiff} from 'angle-grinder/src/utils/deepDiff'

describe("deepDiff", function() {

  describe("for flat keys", function() {

    it("returns an object with changed keys", () => {
      const obj1 = {foo: "foo", bar: "bar"};
      const obj2 = {foo: "foo2", bar: "bar"};
      expect(deepDiff(obj1, obj2)).to.deep.eq({foo: "foo2"});
    })

    it("copies null values", () => {
      const obj1 = {foo: "foo", bar: "bar"};
      const obj2 = {foo: "foo2", bar: null};
      expect(deepDiff(obj1, obj2)).to.deep.eq({foo: "foo2", bar: null});
    })
  })

  describe("for nested keys", function() {

    it("returns only changed fields", () => {
      const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
      const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew"}};

      expect(deepDiff(obj1, obj2)).to.deep.eq({bar: {biz: "bizNew"}});
    })


    it("returns only changed fields, when new val is null", () => {
      const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
      const obj2 = {foo: "foo", one: "one", bar: {biz: null}};

      expect(deepDiff(obj1, obj2)).to.deep.eq({bar: {biz: null}});
    })


    it("returns emty object if nothing is changed", () => {
      const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
      const obj2 = {foo: "foo", one: "one", bar: {biz: "biz"}};

      expect(deepDiff(obj1, obj2)).to.deep.eq({})
    })
  })

  context("check require fields", function() {

    it("returns only required and changed fields",  () => {
      const obj1 = {id2: 2, foo: "foo", one: "one", bar: {biz: "biz"}};
      const obj2 = {id2: 2, foo: "foo", one: "one", bar: {biz: "bizNew"}};

      return expect(deepDiff(obj1, obj2, [], ["id2"])).to.deep.eq({id2: 2, bar: {biz: "bizNew"}});
    })


    it("returns required fields even if there is not in old object",  () => {
      const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
      const obj2 = {id: 2, foo: "foo", one: "one", bar: {biz: "bizNew"}};

      return expect(deepDiff(obj1, obj2, [], ["id"])).to.deep.eq({id: 2, bar: {biz: "bizNew"}});
    })


    return it("returns nested required fields even if there is not in old object",  () => {
      const obj1 = {obj: {id:3}, foo: "foo", one: "one", bar: {biz: "biz"}};
      const obj2 = {obj: {id:3}, foo: "foo", one: "one", bar: {biz: "bizNew"}};

      return expect(deepDiff(obj1, obj2, [], ["obj.id"])).to.deep.eq({obj: {id: 3}, bar: {biz: "bizNew"}});
    })
  });

  context("check allowed fields", function() {

    it("returns only allowed fields", () => {
      const obj1 = {foo: "foo1", one: "one", bar: {biz: "biz"}};
      const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew"}};

      return expect(deepDiff(obj1, obj2, ["bar"])).to.deep.eq({bar: {biz: "bizNew"}});
    })


    return it("returns only allowed fields, for nested", () => {
      const obj1 = {foo: "foo1", one: "one", bar: {biz: "biz", bla: "bla"}};
      const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew", bla: "blaNew"}};

      return expect(deepDiff(obj1, obj2, ["bar.bla"])).to.deep.eq({bar: {bla: "blaNew"}});
    })

  })
})

