import angular from 'angular'
import _ from 'lodash'
import { convertSelect2Data } from './helpers'
require('Select2/select2.js')

/**
 * Copied from https://github.com/angular-ui/ui-select2 and modifed for es6 modules.
 * TODO still need to fix failing tests
 */
/**
 * Enhanced Select2 Dropmenus
 *
 * @AJAX Mode - When in this mode, your value will be an object (or array of objects) of the data used by Select2
 *     This change is so that you do not have to do an additional query yourself on top of Select2's own query
 * @params [options] {object} The configuration options passed to $.fn.select2(). Refer to the documentation
 */
export default 'ui.select2'

angular.module('ui.select2', [])
  .value('uiSelect2Config', {})
  .directive('uiSelect2', function(uiSelect2Config, $timeout) {
    var options = {}
    // I think uiSelect2Config is the defaults
    if (uiSelect2Config) {
      angular.extend(options, uiSelect2Config)
    }
    return {
      require: 'ngModel',
      priority: 1,
      compile: function(tElm, tAttrs) {
        var isSelect = tElm.is('select')
        var isMultiple = angular.isDefined(tAttrs.multiple)

        var watch
        var repeatOption
        var repeatAttr

        // Enable watching of the options dataset if in use
        if (isSelect) {
          repeatOption = tElm.find('optgroup[ng-repeat], optgroup[data-ng-repeat], option[ng-repeat], option[data-ng-repeat]')

          if (repeatOption.length) {
            repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat')
            watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop()
          }
        }

        // var elname = tElm.attr('name') // for logging
        const log = function(msg, val) {
          // console.log(`[${elname}] - ${msg}`, val)
        }

        return {
          pre: function(scope, elm, attrs, ngModelCtrl) {
            // instance-specific options
            var opts = angular.extend({}, options, scope.$eval(attrs.uiSelect2))
            // if ui-select2-data attribute is set then assign it
            const dataAttr = scope.$eval(attrs.uiSelect2Data)
            if (dataAttr) {
              opts.data = dataAttr
            }
            // setup defaults for data
            if (opts.data) {
              // if data is an array then tranform it down to be a property of results
              if (Array.isArray(opts.data)) {
                // convertSelect2Data makes ['red','green'] into [{id:'red',name'red}, etc...]
                const results = convertSelect2Data(opts.data)
                //console.log('results', results)
                opts.data = { results: results }
              }
              // if data.text is not set then deefault it to name (select2 defaults it to 'text')
              if (opts.data.text === undefined) {
                opts.data.text = 'name'
              }
            }
            // if(attrs.uiSelect2Data) opts.data = scope.$eval(attrs.uiSelect2Data)
            // if modelType is object then will use the elm.select2('data') and will store the selected
            // object(s) in the ng-model as objects instead of as just the ids
            // let useDataObject = false
            let dataVar = 'val'
            const idProp = opts.idProp ? opts.idProp : 'id'

            // uses elm.select2('val') when its a select and we want the id in the model not the object.
            // when its on and input and its set to multiple then we will use 'data' so it creates and array of obbjecgs for
            // selection and not array of ids
            if (opts.useDataObject === undefined && !isSelect && isMultiple) {
              opts.useDataObject = true
            }
            if (opts.useDataObject) {
              // useDataObject = true
              dataVar = 'data'
            }
            log(`isSelect: ${isSelect} , isMultiple: ${isMultiple}, dataVar: ${dataVar}`)

            /* Convert from Select2 view-model to Angular view-model. */
            var convertToAngularModel = function(selData) {
              var model
              if (opts.simple_tags) {
                model = []
                angular.forEach(selData, function(value, index) {
                  model.push(value.id)
                })
              } else {
                model = selData
              }
              return model
            }

            if (isSelect) {
              // Use <select multiple> instead
              delete opts.multiple
              delete opts.initSelection
            } else if (isMultiple) {
              opts.multiple = true
            }

            if (ngModelCtrl) {
              const renFunc = function() {
                log('elm.select2(dataVar, ngModelCtrl.$modelValue) ', ngModelCtrl.$modelValue)
                elm.select2(dataVar, ngModelCtrl.$modelValue)
              }

              ngModelCtrl.$render = renFunc

              // Watch the model for programmatic changes
              scope.$watch(tAttrs.ngModel, function(current, old) {
                if (_.isEqual(current, old)) return
                elm.select2(dataVar, current)
                // renFunc()
              }, true)

              // Watch the options dataset for changes
              if (watch) {
                scope.$watch(watch, function(newVal, oldVal, scope) {
                  // Delayed so that the options have time to be rendered
                  $timeout(function() {
                    // console.log("$timeout elm.select2('val', ngModelCtrl.$viewValue)", ngModelCtrl.$viewValue)
                    elm.select2(dataVar, ngModelCtrl.$viewValue)
                    // Refresh angular to remove the superfluous option
                    renFunc()
                    if (newVal && !oldVal && ngModelCtrl.$setPristine) {
                      ngModelCtrl.$setPristine(true)
                    }
                  })
                })
              }

              if (!isSelect) {
                // Set the view and model value and update the angular template manually for the ajax/multiple select2.
                elm.bind('change', function(e) {
                  e.stopImmediatePropagation()

                  if (scope.$$phase || scope.$root.$$phase) {
                    return
                  }

                  scope.$apply(function() {
                    const dmodel = convertToAngularModel(elm.select2(dataVar))
                    log(`!isSelect using elm.select2('data') scope.$apply ngModelCtrl.$setViewValue(${dmodel}`)
                    ngModelCtrl.$setViewValue(elm.select2(dataVar))
                    // ngModelCtrl.$modelValue = elm.select2(dataVar)
                  })
                })
              }
            }
            // console.log("opts for select2",opts)

            elm.bind('$destroy', function() {
              elm.select2('destroy')
            })

            attrs.$observe('disabled', function(value) {
              elm.select2('enable', !value)
            })

            attrs.$observe('readonly', function(value) {
              elm.select2('readonly', !!value)
            })

            // Initialize the plugin late so that the injected DOM does not disrupt the template compiler
            $timeout(function() {
              log(`Initialize -- isSelect:${isSelect} isMultiple:${isMultiple}`)
              // console.log("opts for select2",opts)
              elm.select2(opts)
              // important!
              ngModelCtrl.$render()

              log(`elm.select2(${dataVar}, ngModelCtrl.$modelValue)`, ngModelCtrl.$modelValue)
              // needs to come aftre render so it removes the items
              // if(setterProp){
              //   elm.select2('val', ngModelCtrl.$modelValue[idProp])
              // } else {
              //   elm.select2(dataVar, ngModelCtrl.$modelValue)
              // }
              if (ngModelCtrl.$modelValue) {
                if (opts.useDataObject) {
                  elm.select2('val', ngModelCtrl.$modelValue[idProp])
                } else {
                  elm.select2(dataVar, ngModelCtrl.$modelValue)
                }
              }
              // let val = setterProp ? ngModelCtrl.$modelValue[setterProp] : ngModelCtrl.$modelValue
              // elm.select2(dataVar, val)

              // Not sure if I should just check for !isSelect OR if I should check for 'tags' key
              // if (!opts.initSelection && !isSelect) {
              //   let amodel = convertToAngularModel(elm.select2('data'))
              //   log("not !opts.initSelection && !isSelect convertToAngularModel(elm.select2('data'))")
              //   var isPristine = ngModelCtrl.$pristine
              //   ngModelCtrl.$pristine = false
              //   log("calling ngModelCtrl.$setViewValue with ", amodel)
              //   ngModelCtrl.$setViewValue(amodel)
              //   if (isPristine) {
              //     ngModelCtrl.$setPristine()
              //   }
              //   elm.prev().toggleClass('ng-pristine', ngModelCtrl.$pristine)
              // }
            })
          },

          post: function(scope, elm, attrs, ngModelCtrl) {
            // Update valid and dirty statuses
            ngModelCtrl.$parsers.push(function(value) {
              var div = elm.prev()
              div
                .toggleClass('ng-invalid', !ngModelCtrl.$valid)
                .toggleClass('ng-valid', ngModelCtrl.$valid)
                .toggleClass('ng-invalid-required', !ngModelCtrl.$valid)
                .toggleClass('ng-valid-required', ngModelCtrl.$valid)
                .toggleClass('ng-dirty', ngModelCtrl.$dirty)
                .toggleClass('ng-pristine', ngModelCtrl.$pristine)
              return value
            })
          }
        }
      }
    }
  })
