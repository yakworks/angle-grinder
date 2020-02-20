/* eslint-disable */
import agModule from '~/angle-grinder'

describe('inline validation directive', function() {
  var summary, $rootScope, element, $compile, $timeout

  var templatePartial = '<span class="tpl"></span>'
  var template1 = `
    <form ag-form>
      <input id="firstName" name="firstName" ng-model="firstName" required msg-required="Test message">
      <ag-validation-inline for="firstName"></ag-validation-inline>
    </form>`
  var template = `
    <form ag-form strategy="dirty">
      <input id="firstName" name="firstName" ng-model="firstName" required msg-required="Test message">
      <ag-validation-inline id="yo" for="firstName"></ag-validation-inline>
      <input id="lastName" name="lastName" ng-model="lastName" msg-something="Something">
      <div ag-validation-inline="lastName" class='findme'></div>
    </form>`

  beforeEach(angular.mock.module(agModule))

  beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_, $templateCache) {
    $compile = _$compile_
    $rootScope = _$rootScope_
    $timeout = _$timeout_
  }))

  function compileTemplate(template, $scope) {
    element = $(template)
    $('body').append(element)
    $scope = $scope || $rootScope
    element = $compile(element)($scope)
    $rootScope.$apply()
    $timeout.flush()
    return element
  }

  afterEach(function() {
    if (element) {
      element.remove()
    }
  })

  describe('activation', function() {
    it('sanity check should compile', function() {
      let scope = $rootScope.$new()
      scope.user = {firstName: "jim"}
      let el = compileTemplate(`
        <form ag-form>
          <input id="firstName" ng-model="user.firstName">
          <ag-validation-inline for="firstName"></ag-validation-inline>
        </form>`, scope)
      expect(element.find('div').hasClass('ag-validation-inline')).toBe(true)
      expect(element.find('input').val()).toBe("jim")
    })

    it('should ensure that an input element is specified', function() {
      expect(function() {
        var tmp = '<form ag-form><ag-validation-inline></ag-validation-inline></form>'
        compileTemplate(tmp)
      }).toThrow(new Error('Can not find input element to attach the validation directive'))
    })

    it('should ensure that the input element specified exists', function() {
      expect(function() {
        var tmp = '<form ag-form><ag-validation-inline for="el1"></ag-validation-inline></form>'
        compileTemplate(tmp)
      }).toThrow()
    })

    it('should be 2 setup with proper class', function() {
      compileTemplate(template)
      expect(element.find('.ag-validation-inline').length).toBe(2)
    })

    it('should create a unique id for the validation control if none specified', function() {
      compileTemplate(template)
      expect(element.find('.findme')[0].id).toBe('validation_0')
    })

  })

  describe('redrawing errors', function() {
    it('should listen for AgForm.ErrorsUpdated event and draw if ngModel matches', function() {
      compileTemplate(template)
      $rootScope.$broadcast('AgForm.ErrorsUpdated', element.find('#firstName').controller('ngModel'))

      expect(element.find('#yo').scope().errors).toBeDefined()
      expect(element.find('#validation_0').scope().errors).toBeUndefined()
    })

    it('should listen for AgForm.ErrorsUpdated event and draw if null ngModel sent', function() {
      compileTemplate(template)
      $rootScope.$broadcast('AgForm.ErrorsUpdated', null)

      expect(element.find('#yo').scope().errors).toBeDefined()
    })

    describe('error collection on scope', function() {
      var ngModel, validatorScope

      beforeEach(function() {
        compileTemplate(template)
        ngModel = element.find('#lastName').controller('ngModel')
        validatorScope = element.find('#validation_0').scope()
      })

      it('should set errors on the scope if invalid', function() {
        ngModel.$setViewValue('')
        ngModel.$setValidity('something', false)
        $rootScope.$apply()
        $rootScope.$broadcast('AgForm.ErrorsUpdated', null)
        expect(validatorScope.errors[0].key).toBe('something')
        expect(validatorScope.showErrors).toBe(true)
      })

      it('should not set errors if valid', function() {
        $rootScope.$broadcast('AgForm.ErrorsUpdated', null)

        expect(validatorScope.errors).toEqual([])
        expect(validatorScope.showErrors).toBe(false)
      })
    })

    describe('aria attributes', function() {
      var lastName, ngModel, validatorScope

      beforeEach(function() {
        compileTemplate(template)
        lastName = element.find('#lastName')
        ngModel = lastName.controller('ngModel')
        validatorScope = element.find('#validation_0').scope()
      })

      it('should set aria-invalid & describedBy when invalid', function() {
        ngModel.$setViewValue('')
        ngModel.$setValidity('something', false)
        $rootScope.$apply()
        $rootScope.$broadcast('AgForm.ErrorsUpdated', null)

        expect(lastName.attr('aria-invalid')).toBe('true')
        expect(lastName.attr('aria-describedBy')).toBe('validation_0')
      })

      it('should not set aria attributes when valid', function() {
        $rootScope.$broadcast('AgForm.ErrorsUpdated', null)

        expect(lastName.attr('aria-invalid')).toBeUndefined()
        expect(lastName.attr('aria-describedBy')).toBeUndefined()
      })
    })
  })
})
