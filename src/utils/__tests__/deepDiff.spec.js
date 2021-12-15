import {deepDiff} from '../deepDiff'

describe("deepDiff", function() {
  test("returns an object with changed keys", () => {
    const obj1 = {foo: "foo", bar: "bar"};
    const obj2 = {foo: "foo2", bar: "bar"};
    expect(deepDiff(obj1, obj2)).toEqual({foo: "foo2"});
  })

  test("copies null values", () => {
    const obj1 = {foo: "foo", bar: "bar"};
    const obj2 = {foo: "foo2", bar: null};
    expect(deepDiff(obj1, obj2)).toEqual({foo: "foo2", bar: null});
  })


  test("returns only changed fields", () => {
    const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
    const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew"}};

    expect(deepDiff(obj1, obj2)).toEqual({bar: {biz: "bizNew"}});
  })


  test("returns only changed fields, when new val is null", () => {
    const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
    const obj2 = {foo: "foo", one: "one", bar: {biz: null}};

    expect(deepDiff(obj1, obj2)).toEqual({bar: {biz: null}});
  })

  test("returns emty object if nothing is changed", () => {
    const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
    const obj2 = {foo: "foo", one: "one", bar: {biz: "biz"}};

    expect(deepDiff(obj1, obj2)).toEqual({})
  })

  test("returns only required and changed fields",  () => {
    const obj1 = {id2: 2, foo: "foo", one: "one", bar: {biz: "biz"}};
    const obj2 = {id2: 2, foo: "foo", one: "one", bar: {biz: "bizNew"}};

    return expect(deepDiff(obj1, obj2, [], ["id2"])).toEqual({id2: 2, bar: {biz: "bizNew"}});
  })


  test("returns required fields even if there is not in old object",  () => {
    const obj1 = {foo: "foo", one: "one", bar: {biz: "biz"}};
    const obj2 = {id: 2, foo: "foo", one: "one", bar: {biz: "bizNew"}};

    return expect(deepDiff(obj1, obj2, [], ["id"])).toEqual({id: 2, bar: {biz: "bizNew"}});
  })


  test("returns nested required fields even if there is not in old object",  () => {
    const obj1 = {obj: {id:3}, foo: "foo", one: "one", bar: {biz: "biz"}};
    const obj2 = {obj: {id:3}, foo: "foo", one: "one", bar: {biz: "bizNew"}};

    return expect(deepDiff(obj1, obj2, [], ["obj.id"])).toEqual({obj: {id: 3}, bar: {biz: "bizNew"}});
  })

  test("returns only allowed fields", () => {
    const obj1 = {foo: "foo1", one: "one", bar: {biz: "biz"}};
    const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew"}};

    return expect(deepDiff(obj1, obj2, ["bar"])).toEqual({bar: {biz: "bizNew"}});
  })


  test("returns only allowed fields, for nested", () => {
    const obj1 = {foo: "foo1", one: "one", bar: {biz: "biz", bla: "bla"}};
    const obj2 = {foo: "foo", one: "one", bar: {biz: "bizNew", bla: "blaNew"}};

    return expect(deepDiff(obj1, obj2, ["bar.bla"])).toEqual({bar: {bla: "blaNew"}});
  })

})

