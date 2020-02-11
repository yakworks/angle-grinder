import angular from 'angular'
import '~/vendor'
import "angular-mocks"
import agMod from '~/angle-grinder'

describe('ngModel directive', function() {
  var element; var input; var ngModel; var $compile; var $el
  var $rootScope; var agFormCtrl
  var templates = {
    form: '<form ag-form>',
    unActivated: '<form><input ng-model="firstName"></form>',
    noLabel: '<input ng-model="firstName">',
    label: '<label for="test">Test</label><input id="test" ng-model="firstName">',
    labelControl:`
      <div class="form-group">
        <label class="control-label">FirstName</label>
        <div class="controls">
          <input name="firstName" type="text" placeholder="enter name, min length 3" ng-model="$ctrl.vm.name"
            class="form-control" required ng-minlength="3">
        </div>
      </div>
    `
  }

  function setup(template, validationStrategy) {
    // First add ag-form so that we can mock out the controller methods
    $el = $(templates.form)
    $('body').append($el)
    element = $compile($el)($rootScope)
    agFormCtrl = element.controller('agForm')

    // setup spy
    var spy = spyOn(agFormCtrl, 'getValidationStrategy')
    if (validationStrategy) {
      spy.andCallFake(validationStrategy)
    }

    // next add template to the form
    var templateEl = $(template)
    element.append(templateEl)
    $compile(templateEl)($rootScope)
    input = element.find('input')
    ngModel = input.controller('ngModel')
  }

  beforeEach(angular.mock.module(agMod))
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_
    $compile = _$compile_
  }))

  afterEach(function() {
    if ($el) {
      $el.remove()
    }
  })

  describe('activation', function() {
    it('should initialize errors to be an empty array', function() {
      setup(templates.label)
      expect(ngModel.$agErrors).toEqual([])
    })

    it('should read the validation strategy from the AgFormController', function() {
      setup(templates.label)
      expect(agFormCtrl.getValidationStrategy).toHaveBeenCalled()
    })

    it('should not activate the directive if the ng-model is not inside an ag-form', function() {
      element = $compile(templates.unActivated)($rootScope)
      ngModel = element.find('input').controller('ngModel')
      expect(ngModel.$agErrors).toBeUndefined()
    })
  })

  describe('updating errors', function() {
    beforeEach(function() {
      setup(templates.label)
    })

    it('should update errors on AgForm.ForceErrorUpdate event', function() {

    })

    it('should update errors on ngModel.$error change', function() {

    })

    it('should update errors on focus/blur of the input', function() {

    })

    it('should broadcast AgForm.ErrorsUpdated event after update', function() {

    })

    it('should only add errors which have passed the validation strategy test', function() {

    })
  })

  describe('creating the error messages', function() {
    it('should first use error messages described on the element as attributes', function() {

    })

    it('should default to the default error messages if no override found on the element', function() {

    })

    it('should interpolate the default message with values from the attributes collection', function() {

    })
  })

  describe('setting $label on ngModel', function() {
    it('should set $label on ngModel if label is found', function() {
      setup(templates.labelControl)
      expect(ngModel.$label).toBe('Test')
    })

    it('should set $label to "" if no label is found', function() {
      setup(templates.noLabel)
      expect(ngModel.$label).toBe('')
    })
  })

  describe('touched and focused functionality', function() {
    beforeEach(function() {
      setup(templates.noLabel)
    })

    it('should default $focused to false on activation', function() {
      expect(ngModel.$focused).toBe(false)
    })

    it('should set $focused when focused', function() {
      expect(ngModel.$focused).toBe(false)
      input.triggerHandler('focus')
      expect(ngModel.$focused).toBe(true)
    })

    it('should unset $focused when unfocused', function() {
      input.triggerHandler('focus')
      expect(ngModel.$focused).toBe(true)
      input.triggerHandler('blur')
      expect(ngModel.$focused).toBe(false)
    })
  })
})
