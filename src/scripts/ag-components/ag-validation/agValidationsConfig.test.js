'use strict';

describe('agConfig provider', function () {

  var provider,
    agValidationsConfig;

  beforeEach(function () {
    angular.module('test.agForm', [])
      .config(function (agValidationsConfig) {
        provider = agValidationsConfig;
      });

    module('gValidations', 'test.agForm');
    inject(function (_agValidationsConfig_) {
      agValidationsConfig = _agValidationsConfig_;
    });
  });

  describe('validation strategy configuration', function () {

    it('should add a custom validation strategy', function () {
      var expected = jasmine.createSpy('customStrategy');
      provider.addValidationStrategy('customStrategy', expected);

      var actual = agValidationsConfig.getValidationStrategy('customStrategy');
      expect(actual).toBe(expected);
    });

    it('should retrieve a validation strategy by name', function () {
      var actual = agValidationsConfig.getValidationStrategy('dirty');
      expect(actual).toBe(provider.$validationStrategies.dirty);
    });

    it('should throw an error if strategy doesn\'t exist', function () {
      expect(function () {
        agValidationsConfig.getValidationStrategy('tester123')
      }).toThrow(new Error('Could not find validation strategy by name: tester123'));
    });

    it('should set and retrieve default validation strategy', function () {
      provider.setDefaultValidationStrategy('submitted');
      var strategy = agValidationsConfig.getDefaultValidationStrategy();
      expect(strategy).toBe(provider.$validationStrategies.submitted);
    });

    it('should throw an error if setting a default strategy that doesn\'t exist', function () {
      expect(function () {
        provider.setDefaultValidationStrategy('tester123')
      }).toThrow(new Error('Could not find validation strategy by name: tester123'));
    });

    it('should set the default strategy to "dirtyOrSubmitted"', function () {
      var actual = agValidationsConfig.getDefaultValidationStrategy();
      expect(actual).toBe(provider.$validationStrategies.dirtyOrSubmitted);
    });

  });

  describe('error message configuration', function () {

    it('should override default error messages', function () {
      provider.setErrorMessages({
        required: 'Hi',
        email: 'email'
      });

      var errors = agValidationsConfig.getErrorMessages();

      expect(errors.required).toBe('Hi');
      expect(errors.email).toBe('email');
    });

    it('should add custom error messages to the set of defaults', function () {
      provider.setErrorMessages({
        customError: 'custom'
      });

      var errors = agValidationsConfig.getErrorMessages();

      expect(errors.customError).toBe('custom');
    });

  });
});
