
import {
  apply,
  isApplicationOf,
  wrap,
  unwrap,
  hasMixin,
  Mixin,
  BareMixin,
  Cache,
  DeDupe,
  HasInstance,
  mix,
} from '../mixClass';

describe('mixwith.js', () => {

  describe('apply() and isApplicationOf()', () => {

    test('apply() applies a mixin function', () => {
      const M = (s) => class extends s {
        test() {
          return true;
        }
      };
      class Test extends apply(Object, M) {}
      const i = new Test();
      expect(i.test()).toBe(true);
    });

    test('isApplication() returns true for a mixin applied by apply()', () => {
      const M = (s) => class extends s {};
      expect(isApplicationOf(apply(Object, M).prototype, M)).toBe(true);
    });

    test('isApplication() works with wrapped mixins', () => {
      const M = (s) => class extends s {};
      const WrappedM = wrap(M, (superclass) => apply(superclass, M));
      expect(isApplicationOf(WrappedM(Object).prototype, WrappedM)).toBe(true);
    });

    test('isApplication() returns false when it should', () => {
      const M = (s) => class extends s {};
      const X = (s) => class extends s {};
      expect(isApplicationOf(apply(Object, M).prototype, X)).toBe(false);
    });

  });

  describe('hasMixin()', () => {
    test('hasMixin() returns true for a mixin applied by apply()', () => {
      const M = (s) => class extends s {};
      expect(hasMixin(apply(Object, M).prototype, M)).toBe(true);
    });

  });

  describe('wrap() and unwrap()', () => {

    test('wrap() sets the prototype', () => {
      const f = (x) => x*x;
      f.test = true;
      const wrapper = (x) => f(x);
      wrap(f, wrapper);
      expect(wrapper.test).toBe(true);
      expect(Object.getPrototypeOf(wrapper)).toEqual(f);
    });

    test('unwrap() returns the wrapped function', () => {
      const f = (x) => x*x;
      const wrapper = (x) => f(x);
      wrap(f, wrapper);
      expect(unwrap(wrapper)).toEqual(f);
    });

  });

  describe('BareMixin', () => {

    test('mixin application is on prototype chain', () => {
      const M = BareMixin((s) => class extends s {});
      class C extends M(Object) {}
      const i = new C();
      expect(hasMixin(i, M)).toBe(true)
    });

    test('methods on mixin are present', () => {
      const M = BareMixin((s) => class extends s {
        foo() { return 'foo'; }
      });
      class C extends M(Object) {}
      const i = new C();
      expect(i.foo()).toEqual('foo');
    });

    test('methods on superclass are present', () => {
      const M = BareMixin((s) => class extends s {});
      class S {
        foo() { return 'foo'; }
      }
      class C extends M(S) {}
      const i = new C();
      expect(i.foo()).toEqual('foo');
    });

    test('methods on subclass are present', () => {
      const M = BareMixin((s) => class extends s {});
      class C extends M(Object) {
        foo() { return 'foo'; }
      }
      const i = new C();
      expect(i.foo()).toEqual('foo');
    });

    test('methods on mixin override superclass', () => {
      const M = BareMixin((s) => class extends s {
        foo() { return 'bar'; }
      });
      class S {
        foo() { return 'foo'; }
      }
      class C extends M(S) {}
      const i = new C();
      expect(i.foo()).toEqual('bar');
    });

    test('methods on mixin can call super', () => {
      const M = BareMixin((s) => class extends s {
        foo() { return super.foo(); }
      });
      class S {
        foo() { return 'superfoo'; }
      }
      class C extends M(S) {}
      const i = new C();
      expect(i.foo()).toEqual('superfoo');
    });

    test('methods on subclass override superclass', () => {
      const M = BareMixin((s) => class extends s {});
      class S {
        foo() { return 'superfoo'; }
      }
      class C extends M(S) {
        foo() { return 'subfoo'; }
      }
      const i = new C();

      expect(i.foo()).toEqual('subfoo');
    });

    test('methods on subclass override mixin', () => {
      const M = BareMixin((s) => class extends s {
        foo() { return 'mixinfoo'; }
      });
      class S {}
      class C extends M(S) {
        foo() { return 'subfoo'; }
      }
      const i = new C();

      expect(i.foo()).toEqual('subfoo');
    });

    test('methods on subclass can call super to superclass', () => {
      const M = BareMixin((s) => class extends s {});
      class S {
        foo() { return 'superfoo'; }
      }
      class C extends M(S) {
        foo() { return super.foo(); }
      }
      const i = new C();

      expect(i.foo()).toEqual('superfoo');
    });

  });

  describe('DeDupe', () => {

    test('applies the mixin the first time', () => {
      const M = DeDupe(BareMixin((superclass) => class extends superclass {}));
      class C extends M(Object) {}
      const i = new C();

      expect(hasMixin(i, M)).toBe(true);
    });

    test('does\'n apply the mixin the second time', () => {
      let applicationCount = 0;
      const M = DeDupe(BareMixin((superclass) => {
        applicationCount++;
        return class extends superclass {};
      }));
      class C extends M(M(Object)) {}
      const i = new C();

      expect(hasMixin(i, M)).toBe(true);
      expect(applicationCount).toEqual(1);
    });

  });

  describe('HasInstance', () => {

    let hasNativeHasInstance = false;

    beforeAll(() => {
      // Enable the @@hasInstance patch in mixwith.HasInstance
      if (!Symbol.hasInstance) {
        Symbol.hasInstance = Symbol('hasInstance');
      }

      class Check {
        static [Symbol.hasInstance](o) { return true; }
      }
      hasNativeHasInstance = 1 instanceof Check;
    });

    // test('subclasses implement mixins', () => {
    //   const M = HasInstance((s) => class extends s {});
    //   class C extends M(Object) {}
    //   const i = new C();

    //   if (hasNativeHasInstance) {
    //     assert.instanceOf(i, C);
    //   } else {
    //     assert.isTrue(C[Symbol.hasInstance](i));
    //   }
    // });

  });

  describe('mix().with()', () => {

    test('applies mixins in order', () => {
      const M1 = BareMixin((s) => class extends s {});
      const M2 = BareMixin((s) => class extends s {});
      class S {}
      class C extends mix(S).with(M1, M2) {}
      const i = new C();

      expect(hasMixin(i, M1)).toBe(true);
      expect(hasMixin(i, M2)).toBe(true);

      expect(isApplicationOf(i.__proto__.__proto__, M2)).toBe(true);
      expect(isApplicationOf(i.__proto__.__proto__.__proto__, M1)).toBe(true);
      expect(S.prototype).toEqual(i.__proto__.__proto__.__proto__.__proto__);
    });

    test('mix() can omit the superclass', () => {
      const M = BareMixin((s) => class extends s {
        static staticMixinMethod() {
          return 42;
        }

        foo() {
          return 'foo';
        }
      });
      class C extends mix().with(M) {
        static staticClassMethod() {
          return 7;
        }

        bar() {
          return 'bar';
        }
      }
      let i = new C();

      expect(hasMixin(i, M)).toBe(true);
      expect(isApplicationOf(i.__proto__.__proto__, M)).toBe(true);

      expect(i.foo()).toEqual('foo')
      expect(i.bar()).toEqual('bar')

      expect(C.staticMixinMethod()).toEqual(42)
      expect(C.staticClassMethod()).toEqual(7)

    });

  });

});
