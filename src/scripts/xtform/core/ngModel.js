import angular from 'angular'
import $log from '../../utils/Log'

angular.module('xtForm').directive('ngModel', function (xtFormConfig, $rootScope, $interpolate, $document) {
  'use strict';

  var UNTOUCHED_CLASS = 'ng-untouched',
    TOUCHED_CLASS = 'ng-touched';

  return {
    require: ['ngModel', '^?xtForm', '^?form'],
    link: function (scope, element, attrs, ctrls) {

      var defaultErrors = xtFormConfig.getErrorMessages(),
        ngModel = ctrls[0],
        xtForm = ctrls[1],
        form = ctrls[2],
        validationStrategyFn;

      /**
       * Active the directive
       */
      function activate() {
        validationStrategyFn = xtForm.getValidationStrategy();
        ngModel.$untouched = true;

        // add extensions to ngModel
        var labelEl = $document[0].querySelectorAll('label[for="' + attrs.id + '"]');
        angular.extend(ngModel, {
          $focused: false,
          $label: labelEl.length > 0 ? labelEl[0].innerText : '',
          $xtErrors: []
        });

        // set errors on the ngModel when $error changes
        scope.$watch(function () {
          return ngModel.$error;
        }, updateErrors, true);

        scope.$on('XtForm.ForceErrorUpdate', updateErrors);

        element
          .on('focus', function () {
            //ngModel.$focused = true;
            updateErrors();
            scope.$apply();
          })
          .on('blur', function () {
            //set touched right away so the updateErrors is picked up
            ngModel.$setTouched()
            //ngModel.$focused = false;
            updateErrors();
            scope.$apply();
          });
      }

      function getErrorMessageForKey(key) {
        // allows to add a msg-{error key} to override whats in
        var attrKey = 'msg' + key[0].toUpperCase() + key.substring(1);
        $log.debug("getErrorMessageForKey", {attrs, key, defaultErrorsKey: defaultErrors[key] })
        // use either the provided string as an interpolated attribute, or the default message
        return attrs[attrKey] ?
          $interpolate(attrs[attrKey])(attrs) :
          $interpolate(defaultErrors[key])(attrs);
      }

      /**
       * Sets the $xtErrors collection on validation change
       */
      function updateErrors() {
        ngModel.$xtErrors = [];

        angular.forEach(ngModel.$error, function (value, key) {
          let shouldVal = validationStrategyFn(form, ngModel)
          //console.log(`shouldVal:${shouldVal} , value:${value}`)
          var showErrors = value && shouldVal;

          if (showErrors) {
            var error = {
              key: key,
              message: getErrorMessageForKey(key)
            };

            // This is a bit of hack right now to ensure that data type validation errors are shown
            // in priority over the required message if both fail.
            // TODO will likely need to introduce priorities of error messages
            if (key === 'required') {
              ngModel.$xtErrors.push(error);
            } else {
              ngModel.$xtErrors.unshift(error);
            }
          }


        });

        $rootScope.$broadcast('XtForm.ErrorsUpdated', ngModel);
      }

      if (xtForm) {
        activate();
      }
    }
  };
});
