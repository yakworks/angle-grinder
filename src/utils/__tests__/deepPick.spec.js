import {deepPick} from '../deepDiff'

describe("deepPick", function() {

  test("returns an object copy", function() {
    let obj = {foo: "foo", bar: "bar"};
    expect(deepPick(obj, "foo")).toEqual({foo: "foo"});

    obj = {foo: "foo", bar: "bar"};
    expect(deepPick(obj, "bar")).toEqual({bar: "bar"});

    // allow to pick null or falsy values
    obj = {foo: null, bar: false};
    expect(deepPick(obj, "foo")).toEqual({foo: null});
    expect(deepPick(obj, "bar")).toEqual({bar: false});

    obj = {foo: "foo", bar: { one: "one", two: "two", three: null }};
    expect(deepPick(obj, "bar")).toEqual({bar: { one: "one", two: "two", three: null }})
  })

  test("returns an object copy", function() {
    let obj = {foo: "foo", one: "one", bar: {biz: "biz"}};
    expect(deepPick(obj, "bar.biz")).toEqual({bar: {biz: "biz"}});

    obj = {foo: "foo", one: "one", bar: {biz: "biz"}};
    expect(deepPick(obj, "one", "bar.biz")).toEqual({one: "one", bar: {biz: "biz"}});

    obj = {
      foo: "foo",
      one: {
        two: {
          three: {
            four: "four",
            five: "five" }
          }
      }
    };
    expect(deepPick(obj, "one.two.three")).toEqual({one: {two: {three: { four: "four", five: "five" }}}});

    obj = {
      foo: "foo",
      one: {
        two: "two",
        three: "three",
        four: {
          five: "five"
        }
      }
    };
    expect(deepPick(obj, "one.three")).toEqual({one: {three: "three"}});
  })

  test("returns an empty object", function() {
    const obj = {foo: "foo"};
    return expect(deepPick(obj, "foo.bar.baz")).toEqual({});
  })

})
