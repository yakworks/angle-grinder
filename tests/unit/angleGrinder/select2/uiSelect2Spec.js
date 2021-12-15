import uiselect2 from 'angle-grinder/src/ng/controls/ui-select2/ui.select2.js'
// import mainMod from 'angle-grinder/src/angle-grinder'

/**
 * Copied from https://github.com/angular-ui/ui-select2
 */
// a helper directive for injecting formatters and parsers
angular.module(uiselect2).directive('injectTransformers', [ function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    priority: -1,
    link: function (scope, element, attr, ngModel) {
      var local = scope.$eval(attr.injectTransformers);

      if (!angular.isObject(local) || !angular.isFunction(local.fromModel) || !angular.isFunction(local.fromElement)) {
        throw "The injectTransformers directive must be bound to an object with two functions (`fromModel` and `fromElement`)";
      }

      ngModel.$parsers.push(local.fromElement);
      ngModel.$formatters.push(local.fromModel);
    }
  };
}]);

// default store, should be overriden in production, here so testing works
angular.module(uiselect2).service('dataStoreApi', function() {})

/*global describe, beforeEach, module, inject, it, spyOn, expect, $ */
describe('uiSelect2', function() {
  'use strict';

  var scope, $compile, options, $timeout;
  var sandbox = sinon.createSandbox()

  // beforeEach(angular.mock.module(mainMod, function($provide) {
  //   $provide.value("serverValidationErrorsHandler", sinon.stub());
  // }));

  beforeEach(function () {
    sandbox.spy($.fn, 'select2')
    sandbox.spy($.fn, 'val');
  })
  afterEach(function() {
    sandbox.restore()
  })
  beforeEach(angular.mock.module('ui.select2'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _$window_, _$timeout_) {

    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $timeout = _$timeout_;
    scope.options = {
      query: function (query) {
        var data = {
          results: [{ id: 1, text: 'first' }]
        };
        query.callback(data);
      }
    };

    scope.transformers = {
      fromModel: function (modelValue) {
        if (!modelValue) {
          return modelValue;
        }

        if (angular.isArray(modelValue)) {
          return modelValue.map(function (val) {
            val.text += " - I've been formatted";
            return val;
          });
        }

        if (angular.isObject(modelValue)) {
          modelValue.text += " - I've been formatted";
          return modelValue;
        }

        return modelValue + " - I've been formatted";
      },
      fromElement: function (elementValue) {
        var suffix = " - I've been formatted";

        if (!elementValue) {
          return elementValue;
        }

        if (angular.isArray(elementValue)) {
          return elementValue.map(function (val) {
            if(val.text){
              val.text += val.text.slice(0, val.text.indexOf(" - I've been formatted"));
            }
            return val;
          });
        }

        if (angular.isObject(elementValue)) {
          elementValue.text = elementValue.text.slice(0, elementValue.text.indexOf(suffix));
          return elementValue;
        }

        if (elementValue) {
          return elementValue.slice(0, elementValue.indexOf(suffix));
        }

        return undefined;
      }
    };
  }));

  /**
   * Compile a template synchronously
   * @param  {String} template The string to compile
   * @return {Object}          A reference to the compiled template
   */
  function compile(template) {
    var element = $compile(template)(scope);
    scope.$apply();
    $timeout.flush();
    return element;
  }

  describe('with an <input> element', function () {

    describe('compiling this directive', function () {
      it('should throw an error if we have no model defined', function () {
        expect(function() {
          compile('<input ui-select2/>');
        }).to.throw();
      });
      it('should create proper DOM structure', function () {
        var element = compile('<input ui-select2="options" ng-model="foo"/>');
        expect(element.siblings().is('div.select2-container')).to.be.true
      });
      it('should not modify the model if there is no initial value', function(){
        //TODO
      });
    });

    xdescribe('when model is changed programmatically', function(){

      xdescribe('for single-select', function(){
        it('should call select2(data, ...) for objects', function(){
          var element = compile('<input ng-model="foo" ui-select2="options">');
          //sinon.spy($.fn, 'select2');
          scope.$apply('foo={ id: 1, text: "first" }');
          expect(element.select2).to.have.been.calledWith('data', { id: 1, text: "first" });
        });
        it('should call select2(val, ...) for strings', function(){
          var element = compile('<input ng-model="foo" ui-select2="options">');
          scope.$apply('foo="first"');
          expect(element.select2).to.have.been.calledWith('val', 'first');
        });
      });
      describe('for multi-select', function(){
        xit('should call select2(data, ...) for arrays', function(){
          var element = compile('<input ng-model="foo" multiple ui-select2="options">');
          //sinon.spy($.fn, 'select2');
          scope.$apply('foo=[{ id: 1, text: "first" },{ id: 2, text: "second" }]');
          expect(element.select2).to.have.been.calledWith('data', [{ id: 1, text: "first" },{ id: 2, text: "second" }]);
        });
        it('should call select2(data, []) for falsey values', function(){
          var element = compile('<input ng-model="foo" multiple ui-select2="options">');
          //sinon.spy($.fn, 'select2');
          scope.$apply('foo=[]');
          expect(element.select2).to.have.been.calledWith('data', []);
        });
       /* xit('should call select2(val, ...) for strings', function(){
          var element = compile('<input ng-model="foo" multiple ui-select2="options">');
          //sinon.spy($.fn, 'select2');
          scope.$apply('foo="first,second"');
          expect(element.select2).toHaveBeenCalledWith('val', 'first,second');
        });*/
      });
    });
    describe('consumers of ngModel should correctly use $viewValue', function() {

      xit('should use any formatters if present (select - single select)', function(){
        scope.foo = 'First';
        var element = compile('<select ui-select2 ng-model="foo" inject-transformers="transformers"><option>First - I\'ve been formatted</option><option>Second - I\'ve been formatted</option></select>');
        expect(element.select2('val')).to.be.equal('First - I\'ve been formatted');
        scope.$apply('foo = "Second"');
        expect(element.select2('val')).to.be.equal('Second - I\'ve been formatted');
      });

      // isMultiple && falsey
      xit('should use any formatters if present (input multi select - falsey value)', function() {
        // need special function to hit this case
        // old code checked modelValue... can't just pass undefined to model value because view value will be the same
        scope.transformers.fromModel = function(modelValue) {
          if (modelValue === "magic") {
            return undefined;
          }

          return modelValue;
        };

        var element = compile('<input ng-model="foo" multiple ui-select2="options" inject-transformers="transformers">');
        scope.$apply('foo="magic"');
        expect(element.select2).should.always.have.been.calledWith('data', []);
      });
      //FIXME spy not working
      // isMultiple && isArray
      xit('should use any formatters if present (input multi select)', function() {
        var element = compile('<input ng-model="foo" multiple ui-select2="options" inject-transformers="transformers">');
        scope.$apply('foo=[{ id: 1, text: "first" },{ id: 2, text: "second" }]');
        expect(element.select2).should.always.have.been.calledWith('data', [{ id: 1, text: "first - I've been formatted" },{ id: 2, text: "second - I've been formatted" }]);
      });
      // isMultiple...
      /*xit('should use any formatters if present (input multi select - non array)', function() {
        var element = compile('<input ng-model="foo" multiple ui-select2="options" inject-transformers="transformers">');
        scope.$apply('foo={ id: 1, text: "first" }');
        expect(element.select2).should.always.have.been.calledWith('val', { id: 1, text: "first - I've been formatted" });
      });*/

      // !isMultiple
      xit('should use any formatters if present (input - single select - object)', function() {
        var element = compile('<input ng-model="foo" ui-select2="options" inject-transformers="transformers">');

        scope.$apply('foo={ id: 1, text: "first" }');
        expect(element.select2).should.always.have.been.calledWith('data', { id: 1, text: "first - I've been formatted" });
      });
      xit('should use any formatters if present (input - single select - non object)', function() {
        var element = compile('<input ng-model="foo" ui-select2="options" inject-transformers="transformers">');

        scope.$apply('foo="first"');
        expect(element.select2).should.always.have.been.calledWith('val', "first - I've been formatted");
      });

      xit('should not set the default value using scope.$eval', function() {
        // testing directive instantiation - change order of test

        //sinon.spy($.fn, 'val');
        scope.$apply('foo=[{ id: 1, text: "first" },{ id: 2, text: "second" }]');

        var element = compile('<input ng-model="foo" multiple ui-select2="options" inject-transformers="transformers">');
        expect(element.val).not.should.always.have.been.calledWith([{ id: 1, text: "first" },{ id: 2, text: "second" }]);
      });
      //
      xit('should expect a default value to be set with a call to the render method', function() {
        // this should monitor the events after init, when the timeout callback executes
        var opts = angular.copy(scope.options);
        opts.multiple = true;

        scope.$apply('foo=[{ id: 1, text: "first" },{ id: 2, text: "second" }]');


        var element = compile('<input ng-model="foo" multiple ui-select2="options" inject-transformers="transformers">');

        // select 2 init
        expect(element.select2).should.always.have.been.calledWith(opts);

        // callback setting
        expect(element.select2).should.always.have.been.calledWith('data', [{ id: 1, text: "first - I've been formatted" },{ id: 2, text: "second - I've been formatted" }]);

        // retieve data
        expect(element.select2).should.always.have.been.calledWith('data');
      });

    });
    it('should set the model when the user selects an item', function(){
      var element = compile('<input ng-model="foo" multiple ui-select2="options">');
      // TODO: programmactically select an option
      // expect(scope.foo).to.be(/*  selected val  */) ;
    });

    //FIXME not sure why this is failing
    xit('updated the view when model changes with complex object', function(){
      let selectData = [
        {id: 1, name: 'Option A'},
        {id: 2, name: 'Option B'},
        {id: 3, name: 'Option C'}
      ]
      scope.uiSelect2MultiOpts = {
        //multiple:true,
        placeholder: 'select some foos',
        data: {
          results: selectData,
          text: 'name'
        }
      }
      scope.foo = [{'id': '1', 'name': 'Option A'}];
      //scope.options['multiple'] = true;
      var element = compile('<input ng-model="foo" multiple ui-select2="uiSelect2MultiOpts">');
      scope.$digest();

      scope.foo.push({'id': '2', 'name': 'Option B'});
      scope.$digest();

      //console.log("***************** element.select2('data')", element.select2('data'))
      expect(element.select2('data')).to.deep.equal(
        [{'id': '1', 'name': 'Option A'}, {'id': '2', 'name': 'Option B'}]);
    });

  });
});
